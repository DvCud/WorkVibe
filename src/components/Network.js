import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase/setup';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Avatar, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Network() {
    const location = useLocation();

    // Initialize state as an empty array
    const [user, setUser] = useState([]);

    // Fetch request data from Firestore
    const showrequest = async () => {
        if (!auth.currentUser) return; // Ensure the user is logged in
        const requestRef = doc(database, "Users", `${auth.currentUser.uid}`);
        const requestInRef = collection(requestRef, "RequestIn");

        try {
            const data = await getDocs(requestInRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUser(filteredData);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        showrequest();
        // Remove `user` from dependency to prevent infinite loop
    }, []);

    return (
        <div style={{ padding: "20px", backgroundColor: "#F6F7F3", height: "100vh" }}>
            {user.filter((eachUser) => eachUser.status === "connected").map((eachUser) => (
                <Paper key={eachUser.id} style={{ margin: "10px 0", padding: "10px" }}>
                    <List>
                        <ListItem>
                            <Avatar src={eachUser.profile_image || '/default-avatar.png'} />
                            <ListItemText
                                primary={eachUser.username || 'Unknown User'}
                                secondary={eachUser.designation || 'No Designation'}
                            />
                            <Link
                                to="/message"
                                state={{
                                    currentUserName: location.state?.currentUserName || 'Guest',
                                    currentProImg: location.state?.currentUserProImg || '/default-avatar.png',
                                    username: eachUser.username,
                                    id: eachUser.id,
                                    profile_image: eachUser.profile_image,
                                }}
                            >
                                <Button variant="outlined">Message</Button>
                            </Link>
                        </ListItem>
                    </List>
                </Paper>
            ))}
        </div>
    );
}

export default Network;
