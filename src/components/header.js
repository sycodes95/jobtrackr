import '../styles/header.css';
import logo from '../logo/logo.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiLogoutVariant } from '@mdi/js';




function Header () {
  const [loggedIn, setLoggedIn] = useState(null)

  const handleLogout = () =>{
    const host = process.env.REACT_APP_API_HOST
    fetch(`${host}/users/log-out-get`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data)=>{
      console.log(data);
      if(!data.error) {
        localStorage.removeItem('jobtrackr_token')
        window.location.href='/login'
      }
    })
  }
  
  const verifyToken = () => {
    const token = localStorage.getItem('jobtrackr_token')
    token && setLoggedIn(true)
  }

  useEffect(()=> {
    verifyToken()
  },[])
  return (
    <section className="HEADER-CONTAINER bg-dev-slate h-16 w-full pl-2 pr-2">
      <div className='h-full max-w-7xl flex justify-between items-center text-white ml-auto mr-auto'>
        <div className='HEADER-LOGO h-full w-72 flex items-center overflow-hidden '>
          <img className='' src={logo}/>
        </div>
        {
        loggedIn ?
        <div className='LOGGED-IN-NAV flex items-center gap-x-6 pr-8 text-sm font-normal'>

          {
          /*
          <Link className='hover:text-slate-300 border-b border-white  border-opacity-0 hover:border-opacity-100 transition-all' to='/'>
            Dashboard
          </Link>
          */
          }
          
          <Link className='hover:text-slate-300 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' to='/tracker'>
            Tracker
          </Link>
          <button className='hover:text-red-600 text-red-700 flex items-center gap-x-1 transition-all' 
          onClick={handleLogout}>
            <div>Log out</div>
            <div className=''><Icon className='h-6 w-6' path={mdiLogoutVariant} /></div>
          </button>
        </div>
        :
        <div className='NOT-LOGGED-IN-NAV flex gap-x-4 pr-8 text-sm font-normal'>
          <Link className='hover:text-slate-300 border-b border-white  border-opacity-0 hover:border-opacity-100 transition-all' to='/login'>
            Login
          </Link>
          <Link className='hover:text-slate-300 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' to='/signup'>
            Signup
          </Link>
        </div>
        

        }
      </div>

    </section>
  )
}

export default Header;