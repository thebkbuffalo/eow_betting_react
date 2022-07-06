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
    });
  }, []);

  const isDataEmpty = () => {
    if(typeof(betsList) === 'string'){
      return true;
    }else{
      return false;
    }
  }

  return(
    <div>
      <h1>Possibly Protected Dashboard</h1>
      {isDataEmpty() ? (
        <p>{betsList}</p>
      ) : (
        <span>
          {betsList.map((bet, index) =>
            <ul key={index}>
              <li>{bet.main_cause}</li>
              <li>{bet.sub_cause}</li>
            </ul>
          )}
        </span>
      )}
    </div>

  )
}

export default Dashboard;