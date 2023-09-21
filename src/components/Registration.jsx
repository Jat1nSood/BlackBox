import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/login.css'
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//Firebase Config
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase-config'; 
import UserDataService from '../services/user.js';

export default function Registration() {
  const navigate = useNavigate();


  //Input States
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState({error : false, msg : ''});


  //Handling Registration

  const handleRegistration = async (event) => {
    const auth = getAuth();

    const newUser = {
      role,
      email,
      password
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user.uid);

      await UserDataService.addUser(newUser);
      console.log(newUser)
      navigate('/dashboard')
      console.log("done");
      
    } catch (err) {
      setMessage({error : true, msg : "User Exist or invadid details"})
      console.log(err)

      
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
    {message.msg && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity={message.error ? 'error' : 'success'}>{message.msg}</Alert>
        </Stack>
      )}

      <div className="loginCard">
        <h1>Register Yourself</h1>

        <FormControl variant="outlined" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="role-select">Role</InputLabel>
        <Select
          value={role}
          onChange={(e)=> setRole(e.target.value)}
          label="Role"
          inputProps={{
            id: 'role-select',
          }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      </FormControl>
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
            Password ( more than 6 char)
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

        <button onClick={() => handleRegistration()} className="loginButton">
          Register
        </button>
        <Link to = '/'>Already a User? Click Here!</Link>
      </div>
    </div>
  );
}
