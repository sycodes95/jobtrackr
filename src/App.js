import './styles/App.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Signup from './components/user/signup';
import Login from './components/user/login';
import Tracker from './components/tracker/tracker';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Settings from './components/user/settings';
import Footer from './components/footer/footer';

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
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/tracker" element={<Tracker/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>

          </Routes>
        </div>
        
      </div>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
