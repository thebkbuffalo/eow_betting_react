import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { Component, useState, useEffect } from 'react';
import Home from "./components/HomeContainer"
import Signup from "./components/SignupContainer"
import Login from "./components/LoginContainer"
import Dashboard from "./components/DashboardContainer"
import User from "./components/UserContainer"
import { render } from '@testing-library/react';
import AuthServices from "./services/auth-service";

const App = () => {

  return(
    <BrowserRouter>

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
          <Route exact path="/user/:id" element={
            <ProtectedRoute>
              <User/>
            </ProtectedRoute>
          }/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

function NavBar(){
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
  const url = window.location.href;
  const onLoginPage = url.includes('login');

  if(!loggedIn){
    if(!onLoginPage){
      return(
        <h5><a href='/login'>Login</a></h5>
      )
    }else{
      return(
        <h5><a href='/'>Home</a></h5>
      )
    }
  }else{
    return(
      <h5>
        <span onClick={handleLogout}>Logout</span> | 
        <a href='/dashboard'>Dashboard</a> | 
        <a href='/'>Home</a>
      </h5>
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

