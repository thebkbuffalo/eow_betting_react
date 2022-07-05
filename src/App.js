import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes, Navigate, useParams, NavLink} from 'react-router-dom';
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
  // const [loggedIn, setLoggedIn] = useState('');
  // useEffect(() => {
  //   loggedIn = localStorage.getItem('isLoggedIn');
  // }, [])
  return(
    <BrowserRouter>

        <NavBar></NavBar>
        {/* {isLoggedIn ? <NavLink to='/logout'>Logout</NavLink> : <NavLink to="/login">Login</NavLink>} */}

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
  var loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
  var url = window.location.href;
  var onLoginPage = url.includes('login');
  if(!loggedIn && !onLoginPage){
    return(
      <h5>
        <NavLink to='/login'>Login</NavLink>
      </h5>
    )
  }else{
    return(
      <h5>
        <span onClick={handleLogout}>Logout</span> | 
        <NavLink to='/dashboard'>Dashboard</NavLink> | 
        <NavLink to='/'>Home</NavLink>
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

