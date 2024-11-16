import { Button, Grid, TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import linked from "../images/workvibe_new.jpeg";
import lens from "../images/lens.png";
import home from "../images/home.png";
import message from "../images/message.png";
import network from "../images/network.png";
import profile from "../images/profile.png";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';

function Navbar({ userData }) {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logout = async () => {
    try {
      await signOut(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const userProfileImage = userData._document?.data?.value.mapValue.fields.profile_image.stringValue || profile;
  const userName = userData._document?.data?.value.mapValue.fields.username.stringValue || "User";

  return (
    <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D6D6" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Logo and Search */}
        <Grid item xs={5} container alignItems="center">
          <img
            style={{ width: "125px", marginRight: "15px", filter: "brightness(1.2)", objectFit: "contain" }}
            src={linked}
            alt="WorkVibe Logo"
          />
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <img style={{ width: "25px" }} src={lens} alt="Search Icon" />
          </IconButton>
          {showSearch && (
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search..."
              variant="outlined"
              size="small"
              style={{ marginLeft: "10px", width: "200px" }}
            />
          )}
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={6} container justifyContent="center" alignItems="center" spacing={3}>
          <IconButton onClick={() => navigate('/main')} style={{ margin: "0 20px" }}>
            <img style={{ width: "25px" }} src={home} alt="Home" />
          </IconButton>
          <IconButton onClick={() => navigate('/network')} style={{ margin: "0 20px" }}>
            <img style={{ width: "25px" }} src={network} alt="Network" />
          </IconButton>
          {/* <Link to="/Network" state={{ currentUserProImg: userProfileImage, currentUserName: userName }}>
            <img style={{ width: "25px", margin: "0 20px" }} src={network} alt="Network" />
          </Link> */}
          <Link to="/messages" state={{ currentUserProImg: userProfileImage, currentUserName: userName }}>
            <img style={{ width: "25px", margin: "0 20px" }} src={message} alt="Messages" />
          </Link>
          <img style={{ width: "25px", borderRadius: "50%", margin: "0 20px" }} src={userProfileImage} alt="Profile" />
        </Grid>

        {/* Logout Button */}
        <Grid item xs={1} style={{ textAlign: "right" }}>
          <Button onClick={logout} variant="contained" size="small" sx={{ color: "black", backgroundColor: "white", padding: "5px 10px" }}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
