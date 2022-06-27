import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
import authHeader from "../services/auth-header";
// const API_URL = "http://127.0.0.1:3000"
const API_URL = "https://damp-caverns-74991.herokuapp.com/"

const Dashboard = () => {
  const user = AuthServices.getCurrentUser();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios.get(API_URL+"/users", {withCredentials: true}).then(resp => {
      setUsersList(resp.data);
    });
  }, []);

  const displayUsersList = usersList.map((user) => 
    <ul key={user.id}>
      <li key={user.last_name}>{user.first_name} {user.last_name}</li>
      <li key={user.username}>{user.username}</li>
      <li key={user.email}>{user.email}</li>
    </ul>
  );

  return(
    <div>
      <h1>Possibly Protected Dashboard</h1>
      {displayUsersList}
    </div>

  )
}

export default Dashboard;