import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:3000"

const Signup = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const initialFormState = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  }

  const [user, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post(API_URL+'/users', {user}).then(resp=>{
      if(resp.data.id && resp.data.email === user.email){
        window.location('/login');
      }
    }).catch((error)=>(console.log(error)));
  }

  return(
    <div>
      <h1>Sign Up</h1>
      <div className='signUpForm'>
        <label>First Name</label>
        <input 
          type='text'
          name='first_name'
          onChange={handleInputChange}
        />
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={handleInputChange}
        />
        <label>Username</label>
        <input
          type='text'
          name='username'
          onChange={handleInputChange}
        />
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
        <label>Password Confirmation</label>
        <input
          type='text'
          name='passwordConfirmation'
        />
        <br/>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  )

}

export default Signup;