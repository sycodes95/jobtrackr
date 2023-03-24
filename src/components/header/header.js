import '../../styles/header.css';
import logo from '../../logo/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiLogoutVariant, mdiAccountCircle, mdiMenuDown } from '@mdi/js';

function Header () {
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(null)

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const profileMenuRef = useRef(null)

  const handleLogout = () =>{
    setProfileMenuOpen(false)
    const host = process.env.REACT_APP_API_HOST
    fetch(`${host}/users/log-out-get`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data)=>{
      
      if(!data.error) {
        localStorage.removeItem('jobtrackr_token')
        window.location.href='/login'
      }
    })
  }

  const handleProfileClick = () => {
    setProfileMenuOpen((open) => !open)
  }
  const handleProfileClose = () => {
    setProfileMenuOpen(false)
  }

  const verifyToken = () => {
    const token = localStorage.getItem('jobtrackr_token')
    token && setLoggedIn(true)
  }
  useEffect(()=> {
    
    if(profileMenuOpen && profileMenuRef.current){
      profileMenuRef.current.classList.remove('hidden')
    } 
    if(!profileMenuOpen && profileMenuRef.current){
      profileMenuRef.current.classList.add('hidden')
    } 
  },[profileMenuOpen])
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
        <div className='LOGGED-IN-NAV flex items-center gap-x-6 pr-8 text-sm font-normal relative overflow-visible'>
          <div className='HEADER-QUICK-MENU flex gap-x-6'>
          <Link className='hover:text-slate-300 border-b border-white  border-opacity-0 hover:border-opacity-100 transition-all' to='/dashboard'>
            Dashboard
          </Link>
          
          <Link className='hover:text-slate-300 border-b border-white border-opacity-0 hover:border-opacity-100 transition-all' to='/tracker'>
            Tracker
          </Link>
          </div>

         
          <button className='hover:text-slate-300 border-b border-white border-opacity-0  transition-all
          flex items-center relative'
           to='/tracker' onClick={handleProfileClick}>
            <div className='flex'> <Icon path={mdiAccountCircle} size={1} /><Icon path={mdiMenuDown} size={1} /></div>
            
            <div className='absolute top-8 right-0  z-50 bg-dev-slate-dark hidden border-4 border-black border-opacity-25' ref={profileMenuRef}>

              <ul className='w-28 flex flex-col gap-y-1 z-50 p-1' >
                <li className='pl-2 hover:bg-black hover:bg-opacity-40
                  transition-all flex justify-start items-center w-full h-8' onClick={()=> navigate('/dashboard')}>

                  DASHBOARD
                </li>

                <li className='pl-2 hover:bg-black hover:bg-opacity-40
                  transition-all flex justify-start items-center w-full h-8' 
                  onClick={()=> navigate('/tracker')}>

                  TRACKER
                </li>

              </ul>

              <ul className='w-28 flex flex-col gap-y-1 z-50 border-t border-gray-800 p-1' >
                {
                /*
                <li className='pl-2 hover:bg-black hover:bg-opacity-40
                  transition-all flex justify-start items-center w-full h-8' 
                  onClick={()=> navigate('/settings')}>

                  SETTINGS
                </li>
                */
                }

                <li className=' h-8' onClick={handleProfileClose}>
                  <button className='pl-2 hover:bg-black hover:bg-opacity-40 hover:text-red-600 text-red-700 w-full h-full flex justify-start items-center gap-x-1 transition-all
                  ' onClick={handleLogout}>
                  
                    <div>Log out</div>
                    <div className=''><Icon path={mdiLogoutVariant} size={1}/></div>
                  </button>
                </li>

              </ul>

            </div>

          </button>  
          {
          profileMenuOpen && 
          <div className='OVERLAY top-0 left-0 fixed h-screen w-screen z-20' onClick={handleProfileClose}></div>
          }
          
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