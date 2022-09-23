import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes, Navigate, useParams} from 'react-router-dom';

import './customStyle.scss';
// import { Component, useState, useEffect } from 'react';
import Home from "./components/HomeContainer"
import Signup from "./components/SignupContainer"
import Login from "./components/LoginContainer"
import Dashboard from "./components/DashboardContainer"
import User from "./components/UserContainer"
import NewBet from "./components/NewBetContainer"
// import { render } from '@testing-library/react';
import AuthServices from "./services/auth-service";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme'
import { Typography } from '@mui/material';


const App = () => {

    return(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NavBar></NavBar>
          <Fragment>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              }/>
              <Route exact path="/newbet" element={
                <PrivateRoute>
                  <NewBet/>
                </PrivateRoute>
              }/>
              <Route exact path="/user/:id" element={
                <ProtectedRoute>
                  <User/>
                </ProtectedRoute>
              }/>
            </Routes>
          </Fragment>
        </ThemeProvider>
      </BrowserRouter>
    )

}

function NavBar(){
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
  const url = window.location.href;
  const onLoginPage = url.includes('login');
  const user = AuthServices.getCurrentUser();

  if(!loggedIn){
    if(!onLoginPage){
      return(
        <AppBar component='nav' sx={{display: 'inline-block'}}><a href='/login'>Login</a></AppBar>
      )
    }else{
      return(
        <AppBar component='nav' sx={{display: 'inline-block'}}><a href='/'>Home</a></AppBar>
      )
    }
  }else{
    return(
      <AppBar component='nav' sx={{display: 'inline-block'}}>
        <Typography variant='h5'>
          <a className='logoutLink' onClick={handleLogout}>Logout</a> <span> | </span>
          <a href='/'>Home</a> <span> | </span>
          <a href='/dashboard'>Dashboard</a> <span> | </span>
          <a href={'/newbet'}>New Bet</a>
          <span className='navUserWelcome'>Hello {user.first_name}</span>
        </Typography>
      </AppBar>
    )
  }
}

const handleLogout = (e) => {
  e.preventDefault();
  AuthServices.logout();
  window.location = "/"
}

function PrivateRoute({children}){
  var user = localStorage.getItem('user');
  var isLoggedIn = localStorage.getItem('isLoggedIn');
  if(user && isLoggedIn){
    return children
  }else{
    return <Navigate to="/login/"/>
  }
}

function ProtectedRoute({children}){
  var token = localStorage.getItem('token');
  var user = JSON.parse(localStorage.getItem('user'));
  var params = useParams();
  var userId = params['id']
  if(token && userId === user.id.toString()){
    var correctId = true;
  }else{
    var correctId = false;
  }
  return correctId ? children : <Navigate to="/dashboard"/>
}

export default App;

