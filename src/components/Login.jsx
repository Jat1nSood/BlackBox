import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Authentication functions

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({error : false, msg : ''});


  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handling login
  const handleLogin = async () => {
    const auth = getAuth(); 

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

     
      navigate('/dashboard'); 
    } catch (error) {
      setMessage({error : true, msg : "Invalid Details"})
    }
  };

  return (
    <div className="login">
       {message.msg && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity={message.error ? 'error' : 'success'}>{message.msg}</Alert>
        </Stack>
      )}
      <div className="loginCard">
        <h1>Welcome Back</h1>

        <TextField
          sx={{ m: 1, width: "25ch" }}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-normal-text-input"
          label="Email"
          type="text"
          variant="outlined"
          margin="normal"
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <button onClick={handleLogin} className="loginButton">
          Login
        </button>
        <Link to="/signup">New User? Click Here!</Link>
      </div>
    </div>
  );
}
