import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
// import authHeader from "../services/auth-header";
axios.defaults.withCredentials = true;

const API_URL = AuthServices.getBaseUrl();

const Dashboard = () => {
  const user = AuthServices.getCurrentUser();
  const [betsList, setBetsList] = useState([]);

  useEffect(() => {
    var userId = user.id;
    axios.get(API_URL+"dashboard?user_id="+userId).then(resp => {
      var bets = resp.data.bets
      setBetsList(bets);
      // debugger
    });
  }, []);

  // const displayBetsList = betsList.map((bet) =>
  //   <ul key={bet.id}>
  //     <li>{bet.main_cause_id}</li>
  //     <li>{bet.timeframe}</li>
  //   </ul>
  // );

  function fuckReact(() => {
    return(
      <h1>I FUCKING HATE REACT</h1>
    )
  });

  const handleLogout = (e) => {
    e.preventDefault();
    AuthServices.logout();
    window.location = '/login'
  }

  return(
    <div>
      <button id='logout' onClick={handleLogout}>Log Out</button>
      <h1>Possibly Protected Dashboard</h1>
      {/* <h1>{betsList}</h1> */}

    </div>

  )
}

export default Dashboard;