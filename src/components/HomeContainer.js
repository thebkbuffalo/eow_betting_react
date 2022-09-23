import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
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
    <Card sx={{minWidth: 200, maxWidth: 350}} variant='outlined' className='betCard'>
      <List>
        <ListItem>Bet made by {bet.user_name}</ListItem>
        <ListItem>{bet.main_cause}</ListItem>
        <ListItem>{bet.sub_cause}</ListItem>
        <ListItem>${bet.amount}</ListItem>
        <ListItem>{bet.timeframe}</ListItem>
      </List>
    </Card>
  );

  return(
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <div id='home-container'>
        <div className='heading'>
          <Typography variant='h2'>Welcome to the End of the World!!!</Typography>
          <Typography variant='h5'>(Or atleast the fake betting for it)</Typography>
        </div>
        <div id='recent-bets'>
          <Grid container direction='row'>
            {displayBets}
          </Grid>
        </div>
      </div>
    </Box>
  )
}

export default Home;