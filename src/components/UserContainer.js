import React, { useEffect, useState } from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import AuthService from "../services/auth-service";


const User = () => {
  const [user, setUser] = useState({});
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if(currentUser){
      axios.get()
    }
  }, []);

  return(
    <div><h1>balls</h1></div>
  )
}

export default User