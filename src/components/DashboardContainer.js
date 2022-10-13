import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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

  const displayBets = betsList.map((bet) =>
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
    <div>
      <Typography variant='h3'>Hello {user.first_name}</Typography>
      {isDataEmpty() ? (
        <Typography variant='p'>You haven't made any bets! <a href='/newbet'></a></Typography>
      ) : (
      <div id='recent-bets'>
        <Grid container direction='row'>
          {displayBets}
        </Grid>
      </div>
      )}
    </div>

  )
}

export default Dashboard;