import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import "../../style/login.scss";
// import LoingImgae from "../../assets/images/evolove_login_pic.png";
import eveloveLogo from "../../assets/images/evolove_logo.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Firebase from "../../config/firebase/firebase";
const auth = getAuth(Firebase);


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = () => {
    navigate("/Users");
  };

  const logInWithEmailAndPassword = async () => {
    // alert(email)
    if (email && password && email === 'amrmalik2@gmail.com') {
      try {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user)
            localStorage.setItem("session", JSON.stringify((userCredential.user)))
            navigate("/Users");
          })
      } catch (err) {
        alert(err.message);
      }
    }
    else {
      alert('Please provide valid credentials')
    }
  };
  return (
    <div className="background_image">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="right_column">
            <div className="login_text">

              {/* <img
                src={eveloveLogo}
                alt="My Emosi Logo"
                className="myEmosi_logo"
              /> */}
            </div>

            <FormControl sx={{ m: 3 }} fullWidth variant="standard">
              <TextField
                className="user_name"
                id="input-with-icon-textfield"
                label="Email"
                placeholder="Email Address"
                onChange={(event) => setEmail(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
              />
              <TextField
                className="user_name"
                style={{ color: "#ffff" }}
                id="input-with-icon-textfield"
                label="Password"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
              />
              <Button
                type="button"
                variant="contained"
                onClick={logInWithEmailAndPassword}
                style={{ background: "#0980B0 ", borderRadius: "50px", color: "black" }}
              >
                Login
              </Button>
            </FormControl>
          </div>
        </Grid>
        {/* <Grid item xs={0} md={6} className="display_left_column">
          <img className="node_image" src={LoingImgae} alt="Node Png Images" />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Login;
