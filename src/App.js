import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { Component, useState, useEffect } from 'react';
import Home from "./components/HomeContainer"
import Signup from "./components/SignupContainer"
import Login from "./components/LoginContainer"
import Dashboard from "./components/DashboardContainer"

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
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

function PrivateRoute({children}){
  var token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login"/>
}

export default App;

