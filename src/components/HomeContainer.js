import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthServices from "../services/auth-service";
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();

const Home = () => {

  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get(API_URL+"home").then(resp => {
      setBets(resp.data.bets);
    });
  }, []);

  const displayBets = bets.map((bet) =>
    <ul key={bet.bet_id}>
      <li>Bet made by {bet.user_name}</li>
      <li>{bet.main_cause}</li>
      <li>{bet.sub_cause}</li>
      <li>${bet.amount}</li>
      <li>{bet.timeframe}</li>
    </ul>
  );

  return(
    <div id='home-container'>
      <div className='heading'>
        <h1>Welcome to the End of the World!!!</h1>
        <p>Or atleast the fake betting for it</p>
      </div>
      <div id='recent-bets'>
        {displayBets}
      </div>
    </div>
  )
}

export default Home;