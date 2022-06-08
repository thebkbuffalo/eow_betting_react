import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthServices from "../services/auth-service";
const API_URL = "http://localhost:3000"

const Dashboard = () => {
  const user = AuthServices.getCurrentUser();

  debugger

  return(
    <div>
      <h1>Possibly Protected Dashboard</h1>

    </div>

  )
}

export default Dashboard;