import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();

const NewBet = () => {
  const initialFormState = {
    user_id: null,
    main_cause_id: null,
    sub_cause_id: null,
    timeframe: '',
    amount: null
  }
  const user = AuthServices.getCurrentUser();
  const [currentCauses, setCurrentCauses] = useState([]);
  const [subCauses, setSubCauses] = useState([]);
  const [newBet, setNewBet] = useState(initialFormState);

  useEffect(() => {
    setNewBet({...newBet, ['user_id']: user.id});
    axios.get(API_URL+'bets/all_causes_for_dropdown').then(resp=>{
      let causes = resp.data.causes;
      setCurrentCauses(causes);
    });
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setNewBet({...newBet, [name]: value.id});
    setSubCauses(value.subs);
  }

  // const getSubCauses = () => {
  //   let causeId = newBet.main_cause_id;
  //   let mainCause = currentCauses.find(cause => cause.id === causeId);
  //   debugger
  //   console.log(mainCause)
  // }

  return(
    <div>
      <Typography variant='h4'>Make a New Bet!</Typography>
      <div className='newBet'>
        <InputLabel>Main Cause</InputLabel>
        <Select label='mainCause' name='main_cause_id' onChange={handleInputChange} defaultValue="">
          {currentCauses.map((cause) => 
            <MenuItem value={cause} key={cause.id}>{cause.title}</MenuItem>
          )}
        </Select>
        {newBet.main_cause_id != null && 
          <>
            <InputLabel>Sub Cause</InputLabel>
            <Select label='subCause' name='sub_cause_id' defaultValue="">
              {subCauses.map((sub) =>
                <MenuItem value={sub} key={sub.id}>{sub.title}</MenuItem>
              )}
            </Select>
          </>
        }
      </div>
    </div>
  )
}

export default NewBet;