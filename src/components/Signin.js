import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import linkedin from "../images/workvibe_new.jpeg"
import developer from "../images/new_dev.jpg"
import { signInWithPopup } from 'firebase/auth'
import { auth, database, googleProvider } from '../firebase/setup'
import { setDoc, doc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [designation, setDesignation] = useState("")

  // Add user data to Firestore
  const addUser = async () => {
    const userRef = doc(database, "Users", auth.currentUser?.uid)
    try {
      await setDoc(userRef, {
        username: username,
        email: auth.currentUser?.email,
        designation: designation,
        profile_image: auth.currentUser?.photoURL
      })
    } catch (err) {
      console.error(err)
    }
  }

  // SignIn with Google and save user data
  const signInwithGoogle = async () => {
    if (!username || !designation) {
      toast.warning("Please enter both username and designation!")
      return
    }

    try {
      await signInWithPopup(auth, googleProvider)
      addUser()
      navigate("/main")
    } catch (err) {
      console.error(err)
      toast.error("An error occurred during sign-in!")
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={6} sx={{ paddingLeft: "80px", paddingTop: "15px" }}>
          <ToastContainer autoClose={2000} position='top-right' />
          <img style={{ width: "130px" }} src={linkedin} />
          <h2 style={{ fontWeight: "100", fontSize: "60px", color: "#B26F28" }}>
            Connect with your peers with Workvibe
          </h2>
          <label style={{ color: "grey", fontSize: "10px" }}>Enter username</label>
          <br />
          <TextField
            onChange={(e) => setUsername(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
            variant='outlined'
            label="Username"
            sx={{ width: "400px", mt: "5px" }}
          />
          <br />
          <label style={{ color: "grey", fontSize: "10px" }}>Enter Designation</label>
          <br />
          <TextField
            onChange={(e) => setDesignation(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
            variant='outlined'
            label="Designation"
            sx={{ width: "400px", mt: "5px" }}
          />
          <Grid container justifyContent="center" sx={{ mt: "25px" }}>
            <Button
              onClick={signInwithGoogle}
              size='large'
              variant='contained'
              sx={{
                width: "400px",
                borderRadius: "50px",
                height: "50px"
              }}
            >
              Signin
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img style={{ width: "500px" }} src={developer} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Signin
