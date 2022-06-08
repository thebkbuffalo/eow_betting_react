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

const App = () => {
  return(
    <BrowserRouter>
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

function PrivateRoute({children}){
  var token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login"/>
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

