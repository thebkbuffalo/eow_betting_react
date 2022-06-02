import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:3000"

const Login = () => {

  const [user, setUser] = useState({email: '', password: ''})

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(API_URL+'/auth/login', {email: user.email, password: user.password}).then(resp=>{
      if(resp.data.token){
        localStorage.setItem('token', resp.data.token);
      }
    });
  }
  return(
    <div>
      <h1>Login</h1>
      <div className='login'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type='text'
          name='password'
          onChange={handleInputChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login;