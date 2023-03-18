import './styles/App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/header';
import Signup from './components/user/signup';
import Login from './components/user/login';
import Tracker from './components/tracker/tracker';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';

function App() {
  
  return (
    <BrowserRouter>
      <div className="APP-CONTAINER h-full m-0 flex flex-col">
        
        <Header/>
        
        <div className='h-full'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tracker" element={<Tracker/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
