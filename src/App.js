import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { Component, useState, useEffect } from 'react';
import React from 'react';
import Home from "./components/HomeContainer"
import Signup from "./components/SignupContainer"
import Login from "./components/LoginContainer"

const App = () => {
  const initialLoggedInState = {loggedIn: false, user: {}}
  const [user, setUser] = useState(initialLoggedInState)
  const updateUser = (user) => {
    console.log(user);
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

