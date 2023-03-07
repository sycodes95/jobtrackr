import './styles/App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    token && setUserLoggedIn(true)
    
  }, [])

  
  return (
    <BrowserRouter>
      <div className="APP-CONTAINER h-screen m-0 flex flex-col min-w-fit">
          <Header/>
          <Routes>
            {
            !userLoggedIn &&
            <Route path="/" element={<Login/>}/>
            }
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
