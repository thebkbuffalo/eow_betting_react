import React, { useState, useEffect } from 'react';
import AuthServices from "../services/auth-service";

const Login = () => {
  const [user, setUser] = useState({email: '', password: ''})
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