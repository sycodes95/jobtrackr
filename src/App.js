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
import Page404 from './components/404/Page404';

function App() {
  
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen m-0 bg-white APP-CONTAINER">
        <div>
          <Header/>
        </div>
        
        <div className='relative flex-grow h-full'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/tracker" element={<Tracker/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
          <Footer/>
        
      </div>
      

      
    </BrowserRouter>
  );
}

export default App;
