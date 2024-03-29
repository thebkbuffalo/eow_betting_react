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
import Modal from '@mui/material/Modal';
import { Input, Menu } from '@mui/material';
axios.defaults.withCredentials = true;
const API_URL = AuthServices.getBaseUrl();
const numbersArrayYears = Array.from(Array(100).keys());
const numbersArrayMonths = Array.from(Array(12).keys());

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  padding: '15px',
  boxShadow: 24
};

const NewBet = () => {
  const initialNewBetFormState = {
    user_id: null,
    main_cause_id: null,
    sub_cause_id: null,
    timeframe_years: 0,
    timeframe_months: 0,
    amount: null
  }
  const initialCauseFormState = {
    mainCauseId: null,
    mainCauseTitle: '',
    mainCauseDescription: '',
    subCauseTitle: '',
    subCauseDescription: ''
  }


  const user = AuthServices.getCurrentUser();
  const [currentCauses, setCurrentCauses] = useState([]);
  const [subCauses, setSubCauses] = useState([]);
  const [newBet, setNewBet] = useState(initialNewBetFormState);
  const [newCause, setNewCause] = useState(initialCauseFormState);
  const [selectedCauseName, setSelectedCauseName] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBetsData();
  }, []);

  const getBetsData = () => {
    setNewBet({...newBet, ['user_id']: user.id});
    axios.get(API_URL+'bets/all_causes_for_dropdown').then(resp=>{
      let causes = resp.data.causes;
      setCurrentCauses(causes);
    });
  }

  const handleNewBetInputChange = (event) => {
    const {name, value} = event.target;
    setNewBet({...newBet, [name]: value});
    if(name === 'main_cause_id' || name === 'sub_cause_id'){
      setNewBet({...newBet, [name]: value.id});
      if(name === 'main_cause_id'){
        setSubCauses(value.subs);
        setSelectedCauseName(value.title);
        setNewCause({...newCause, ['mainCauseId']: value.id});
      }
    }
  }

  const handleNewCauseChange = (event) => {
    const {name, value} = event.target;
    setNewCause({...newCause, [name]: value});
  }

  const createNewBet = () => {
    axios.post(API_URL+'bets', newBet).then(resp=>{
      if(resp.data.status === 'created'){
        window.location = '/dashboard';
      }else{
        alert('something went wrong');
      }
    });
  }

  const createNewCause = () => {
    axios.post(API_URL+'causes', newCause).then(resp=>{
      console.log(resp);
      handleClose();
      getBetsData();
    })
  }

  const isMainCauseSelected = () => {
    if(selectedCauseName === ''){
      return true;
    }else{
      return false;
    }
  }

  return(
    <div>
      <Typography variant='h4'>Make a New Bet!</Typography>
      <div className='newBet'>
        <InputLabel>Main Cause</InputLabel>
        <Select label='mainCause' name='main_cause_id' onChange={handleNewBetInputChange} sx={{width: '20%'}} defaultValue="">
          {currentCauses.map((cause) => 
            <MenuItem value={cause} key={cause.id}>{cause.title}</MenuItem>
          )}
        </Select>
        {newBet.main_cause_id != null && subCauses.length != 0 &&
          <>
            <InputLabel>Sub Cause</InputLabel>
            <Select label='subCause' name='sub_cause_id' onChange={handleNewBetInputChange} sx={{width: '20%'}} defaultValue="">
              {subCauses.map((sub) =>
                <MenuItem value={sub} key={sub.id}>{sub.title}</MenuItem>
              )}
            </Select>
          </>
        }
        <InputLabel>Timeframe</InputLabel>
        <div className='timeframe_sect'>
          <TextField select label='Years' name='timeframe_years' sx={{width: '10%'}} onChange={handleNewBetInputChange}>
          {numbersArrayYears.map((num) =>
              <MenuItem value={num} key={num}>{num} {num === 1 ? 'year' : 'years'}</MenuItem>
            )}
          </TextField>
          <TextField select label='Months' name='timeframe_months' sx={{width: '10%', margin: '0 0 0 5px'}} onChange={handleNewBetInputChange}>
          {numbersArrayMonths.map((num) =>
              <MenuItem value={num} key={num}>{num} {num === 1 ? 'month' : 'months'}</MenuItem>
            )}
          </TextField>
        </div>
        <InputLabel>Amount</InputLabel>
        <TextField
          sx={{width: '20%'}} 
          size='medium' 
          type='text'
          name='amount'
          onChange={handleNewBetInputChange}
        />
        <br/>
        <Button 
          variant='contained'
          color='primary' 
          className='saveBet'
          onClick={createNewBet}>
            Save
        </Button>
      </div>
      <div className='newCausesTxt'>
        <Typography variant='h5'>Not seeing a cause or subcause you think will win? Worry not! You can always edit add subcauses to an existing cause or add an entirely new cause!</Typography>
        <Button 
          variant='contained'
          color='secondary' 
          className='newCause'
          onClick={handleOpen}>
            Add/Edit Cause
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {isMainCauseSelected() ? (
            <div className='newCauseAndSubcause'>
              <Typography variant='h4'>New Main Cause (necessary)</Typography>
              <InputLabel>Title</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='mainCauseTitle'
                onChange={handleNewCauseChange}
              />
              <InputLabel>Description</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='mainCauseDescription'
                onChange={handleNewCauseChange}
              />
              <Typography variant='h4'>Sub Cause (not necessary but recommended)</Typography>
              <InputLabel>Title</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='subCauseTitle'
                onChange={handleNewCauseChange}
              />
              <InputLabel>Description</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='subCauseDescription'
                onChange={handleNewCauseChange}
              /><br/>
            </div>
          ) : (
            <div className='newSubCause'>
              <Typography variant='h5'>Add a new subcause to {selectedCauseName}</Typography>
              <InputLabel>Title</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='subCauseTitle'
                onChange={handleNewCauseChange}
              />
              <InputLabel>Description</InputLabel>
              <TextField
                sx={{width: '35%'}}
                size='medium'
                type='text'
                name='subCauseDescription'
                onChange={handleNewCauseChange}
              /><br/>
            </div>
          )
        }
          <Button 
          variant='contained' 
          color='primary' 
          sx={{margin: '10px 0 0 0'}}
          onClick={createNewCause}
          >Save</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default NewBet;