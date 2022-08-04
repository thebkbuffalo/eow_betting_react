import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
import { TextField } from '@mui/material';
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();

const NewBet = () => {
  const user = AuthServices.getCurrentUser();
  const [mainCauses, setMainCauses] = useState([]);
  const [newBet, setNewBet] = useState([]);

  useEffect(() => {
    axios.get(API_URL+'bets/all_causes_for_dropdown').then(resp=>{
      console.log(resp);
      let main_causes = resp.data.main_causes;
      let sub_causes = resp.data.sub_causes;
      
    });
  }, []);

  return(
    <div>
      <h1>Make a New Bet!</h1>
      <div className='newBet'>

      </div>
    </div>
  )
}

export default NewBet;