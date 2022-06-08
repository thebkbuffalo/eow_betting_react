import React, { useEffect, useState } from 'react';
import axios from "axios";
import authHeader from '../services/auth-header';
import AuthService from "../services/auth-service";
const API_URL = 'http://localhost:3000'

const User = () => {
  const [user, setUser] = useState({});
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if(currentUser){
      var id = currentUser.id;
      axios.get(API_URL+'/users/'+id, {headers: authHeader()}).then(resp=>{
        setUser(resp.data);
      });
    }
  }, []);

  return(
    <div>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </div>
  )
}

export default User