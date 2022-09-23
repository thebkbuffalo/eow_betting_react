import React, { useState, useEffect } from 'react';
import AuthServices from "../services/auth-service";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import Button from '@mui/material/Button';

const Login = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    AuthServices.login(user).then(resp => {
      if(resp.statusText === "OK"){
        window.location = '/dashboard';
      }else{
        console.log(resp);
      }
    });
  }

  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  }

  return(
    <div>
      <Box sx={{width: '35%', bgcolor: '#bdc3e3', margin: 'auto'}} border='1px solid #969595'> 
        <div className='loginBoxInner'>
          <Typography variant='h2'>Login</Typography>
          <div className='loginInput'>
            <label>Email</label><br/>
            <TextField
              sx={{width: '60%', bgcolor: '#F0EAD6'}}
              size='small'
              type='text'
              name='email'
              onChange={handleInputChange}
            />
          </div>
          <div className='loginInput'>
            <label>Password</label><br/>
            <TextField
              sx={{width: '60%', bgcolor: '#F0EAD6'}}
              id='outlined-basic'
              size='small'
              type={showPassword ? "text" : "password"}
              name='password'
              onChange={handleInputChange}
            />
            <span onClick={togglePasswordShow} title='Show Password'><PreviewOutlinedIcon fontSize='large' className='showPWIcon'/></span>
          </div>
          <Button variant='contained' color='secondary' className='loginBtn' onClick={handleLogin}>Login</Button>
        </div>
      </Box>
    </div>
  )
}

export default Login;