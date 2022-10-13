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
import { Input, Menu } from '@mui/material';
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();
const numbersArrayYears = Array.from(Array(100).keys());
const numbersArrayMonths = Array.from(Array(12).keys())

// const dayMonthYear = ['Days', 'Months', 'Years']

const NewBet = () => {
  const initialFormState = {
    user_id: null,
    main_cause_id: null,
    sub_cause_id: null,
    timeframeYears: null,
    timeframeMonths: null,
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
    setNewBet({...newBet, [name]: value})
    if(name === 'main_cause_id' || name === 'sub_cause_id'){
      setNewBet({...newBet, [name]: value.id});
      if(name === 'main_cause_id'){
        setSubCauses(value.subs);
      }
    }
  }

  const createNewBet = () => {
    debugger
    axios.post(API_URL+'bets', newBet).then(resp=>{
      if(resp.data.status === 'created'){
        window.location = '/dashboard';
      }else{
        alert('something went wrong');
      }
    });
  }

  return(
    <div>
      <Typography variant='h4'>Make a New Bet!</Typography>
      <div className='newBet'>
        <InputLabel>Main Cause</InputLabel>
        <Select label='mainCause' name='main_cause_id' onChange={handleInputChange} sx={{width: '20%'}} defaultValue="">
          {currentCauses.map((cause) => 
            <MenuItem value={cause} key={cause.id}>{cause.title}</MenuItem>
          )}
        </Select>
        {newBet.main_cause_id != null && 
          <>
            <InputLabel>Sub Cause</InputLabel>
            <Select label='subCause' name='sub_cause_id' onChange={handleInputChange} sx={{width: '20%'}} defaultValue="">
              {subCauses.map((sub) =>
                <MenuItem value={sub} key={sub.id}>{sub.title}</MenuItem>
              )}
            </Select>
          </>
        }
        <InputLabel>Timeframe</InputLabel>
        <div className='timeframe_sect'>
          <TextField select label='Years' name='timeframeYears' sx={{width: '10%'}} onChange={handleInputChange}>
          {numbersArrayYears.map((num) =>
              <MenuItem value={num} key={num}>{num} {num === 1 ? 'year' : 'years'}</MenuItem>
            )}
          </TextField>
          <TextField select label='Months' name='timeframeMonths' sx={{width: '10%', margin: '0 0 0 5px'}} onChange={handleInputChange}>
          {numbersArrayMonths.map((num) =>
              <MenuItem value={num} key={num}>{num} {num === 1 ? 'month' : 'months'}</MenuItem>
            )}
          </TextField>
        </div>
        {/* <TextField 
          sx={{width: '20%'}} 
          size='medium' 
          type='text'
          name='timeframe'
          onChange={handleInputChange}
        /> */}
        <InputLabel>Amount</InputLabel>
        <TextField
          sx={{width: '20%'}} 
          size='medium' 
          type='text'
          name='amount'
          onChange={handleInputChange}
        />
        <br/>
        <Button 
          variant='contained'
          color='primary' 
          className='saveBet'
          onClick={createNewBet}>Save
        </Button>
        {/* <div className='timeframe'>
          <Typography varian='h5'>Timeframe</Typography>
          <InputLabel>Number of:</InputLabel>
          <Select label='timeframe' name='timeframe' defaultValue=''>
            {numbersArray.map((num) =>
              <MenuItem value={num} key={num}>{num}</MenuItem>
            )}
          </Select>
          <InputLabel>Days/Months/Years</InputLabel>
          <Select label='timeframe' name='timeframe' defaultValue=''>
            {dayMonthYear.map((dmy) =>
              <MenuItem value={dmy} key={dmy}>{dmy}</MenuItem>
            )}
          </Select>
        </div> */}
      </div>
    </div>
  )
}

export default NewBet;