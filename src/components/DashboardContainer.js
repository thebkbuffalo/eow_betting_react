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
    console.log(user.id);
    var userId = user.id;
    axios.get(API_URL+"dashboard?user_id="+userId).then(resp => {
      setBetsList(resp.data.bets);
    });
  }, []);

  const displayBetsList = betsList.map((bet) => 
    <ul key={bet.id}>
      <li>{bet.main_cause_id}</li>
      <li>{bet.timeframe}</li>
    </ul>
  );

  return(
    <div>
      <h1>Possibly Protected Dashboard</h1>
      {displayBetsList}
    </div>

  )
}

export default Dashboard;