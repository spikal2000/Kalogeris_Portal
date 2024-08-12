import React, { useContext } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import UploadFile from './UploadFilesComponents/UploadFile';
import UploadFileSelection from './UploadFilesComponents/UploadFileSelection';
import HomePage from './HomePage';
import AddUser from './admin/AddUser';
import Login from './Login';
import GeneralChart from './ChartsComponents/generalchart';
import Supervisor from './admin/Supervisor';
import GeneralOrders from './Orders/generalOrders';
import Dashboard from './Dashboard';
import PowerBI from "./ChartsComponents/powerBiCharts"

// import React, { useState, useEffect, useContext } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import ForbiddenPage from './Security/Forbidden';





function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/generalorders"  element={<GeneralOrders />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/powerbi" element={<PowerBI />} />
          <Route path="/supervisor"  element={<Supervisor />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/generalchart"  element={<GeneralChart />} />
          <Route path="/uploadFile/:branch/:code" element={<UploadFile />} />
          <Route path="/uploadFileSelection" element={<UploadFileSelection />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}
  

export default App;
