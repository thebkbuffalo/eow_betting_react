import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();

const NewBet = () => {
  const user = AuthServices.getCurrentUser();
  const [mainCauses, setMainCauses] = useState([]);
  const [subCauses, setSubCauses] = useState([]);
  const [newBet, setNewBet] = useState([]);

  useEffect(() => {
    axios.get(API_URL+'bets/all_causes_for_dropdown').then(resp=>{
      console.log(resp);
      let main_causes = resp.data.main_causes;
      let sub_causes = resp.data.sub_causes;
      setMainCauses(main_causes);
      setSubCauses(sub_causes);
    });
  }, []);

  return(
    <div>
      <Typography variant='h4'>Make a New Bet!</Typography>
      <div className='newBet'>

      </div>
    </div>
  )
}

export default NewBet;