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
        <ListItem><span className='cardTitle'>Bet made by {bet.user_name}</span></ListItem>
        <ListItem>{bet.main_cause}</ListItem>
        {/* <ListItem><span className='counts_line'>main cause count: {bet.main_cause_usage_count}</span></ListItem> */}
        <ListItem>{bet.sub_cause}</ListItem>
        {/* <ListItem><span className='counts_line'>sub cause count: {bet.sub_cause_usage_count}</span></ListItem> */}
        <ListItem>${bet.amount}</ListItem>
        <ListItem>{bet.timeframe}</ListItem>
        <ListItem>Occuring in:</ListItem>
        <ListItem>{bet.timeframe_years} years and {bet.timeframe_months} months</ListItem>
      </List>
    </Card>
  );

  return(
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <div id='home-container'>
        <div className='heading'>
          <Typography variant='h2'>Welcome to the End of the World!!!</Typography>
        </div>
        <div className='betsInfoBreakdown'>
          <Typography variant='h4'>Bets Breakdown</Typography>
          
        </div>
        <div id='recent-bets'>
          <Typography variant='h4'>Most Recent Bets</Typography>
          <Grid container direction='row'>
            {displayBets}
          </Grid>
        </div>
      </div>
    </Box>
  )
}

export default Home;