import './styles/App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Signup from './components/user/signup';
import Login from './components/user/login';
import Tracker from './components/tracker/tracker';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    token && setUserLoggedIn(true)
    
  }, [])

  useEffect(()=>{
    if(userLoggedIn) window.location.href = '/tracker'
  },[userLoggedIn])

  
  return (
    <BrowserRouter>
      <div className="APP-CONTAINER h-screen m-0 flex flex-col w-full">
        <Header/>
        <Routes>
          {
          userLoggedIn && <Route path="/" element={<Login/>}/>
          }
          
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tracker" element={<Tracker/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
