import '../styles/header.css';
import logo from '../logo/logo.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


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
        localStorage.removeItem('token')
        window.location.href='/login'
      }
    })
  }


  const verifyToken = () => {
    const token = localStorage.getItem('token')
    token && setLoggedIn(true)
  }

  useEffect(()=> {
    verifyToken()
  },[])
  return (
    <section className="HEADER-CONTAINER bg-dev-slate h-16 flex items-center justify-between  text-white pl-24 pr-24">

      <div className='HEADER-LOGO h-full w-72  flex items-center overflow-hidden'>
        <img className='' src={logo}/>
      </div>
      {
      loggedIn ?
      <div className='flex gap-x-4 pr-8 text-sm'>
        <Link className='hover:text-slate-300 border-b border-white  border-opacity-0 hover:border-opacity-100 transition-all' to='/'>
          Dashboard
        </Link>
        <Link className='hover:text-slate-300 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' to='/jobs'>
          Jobs
        </Link>
        <button className='hover:text-red-600 text-red-700 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' onClick={handleLogout}>
          Log out
        </button>
      </div>
      :
      <div className='flex gap-x-4 pr-8 text-sm'>
        <Link className='hover:text-slate-300 border-b border-white  border-opacity-0 hover:border-opacity-100 transition-all' to='/login'>
          Login
        </Link>
        <Link className='hover:text-slate-300 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' to='/signup'>
          Signup
        </Link>
      </div>
      

      }
      

    </section>
  )
}

export default Header;