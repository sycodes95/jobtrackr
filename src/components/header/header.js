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
    <section className="w-full h-16 pl-2 pr-2 bg-black bg-opacity-50 shadow-lg HEADER-CONTAINER">
      <div className="flex items-center justify-between h-full ml-auto mr-auto text-white max-w-7xl">
        <div className="flex items-center h-full overflow-hidden HEADER-LOGO w-72 ">
          <img
            className="h-40 cursor-pointer"
            src={logo}
            alt=""
            onClick={() => (window.location.href = "/")}
          />
        </div>
        {loggedIn ? (
          <div className="relative flex items-center pr-8 overflow-visible text-sm font-normal LOGGED-IN-NAV gap-x-6">
            <div className="flex HEADER-QUICK-MENU gap-x-6">
              <Link
                className="transition-all border-b border-white border-opacity-0 hover:text-slate-300 hover:border-opacity-100"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="transition-all border-b border-white border-opacity-0 hover:text-slate-300 hover:border-opacity-100"
                to="/tracker"
              >
                Tracker
              </Link>
            </div>

            <button
              className="relative flex items-center transition-all border-b border-white border-opacity-0 hover:text-slate-300"
              to="/tracker"
              onClick={handleProfileClick}
            >
              <div className="flex">
                {" "}
                <Icon path={mdiAccountCircle} size={1} />
                <Icon path={mdiMenuDown} size={1} />
              </div>

              <div
                className="absolute right-0 z-50 hidden bg-black bg-opacity-75 border-4 border-black border-opacity-25 top-8 backdrop-blur-sm"
                ref={profileMenuRef}
              >
                <ul className="z-50 flex flex-col p-1 w-28 gap-y-1">
                  <li
                    className="flex items-center justify-start w-full h-8 pl-2 transition-all hover:bg-black hover:bg-opacity-40"
                    onClick={() => navigate("/dashboard")}
                  >
                    DASHBOARD
                  </li>

                  <li
                    className="flex items-center justify-start w-full h-8 pl-2 transition-all hover:bg-black hover:bg-opacity-40"
                    onClick={() => navigate("/tracker")}
                  >
                    TRACKER
                  </li>
                </ul>

                <ul className="z-50 flex flex-col p-1 border-t border-gray-800 w-28 gap-y-1">
                  {/*
                <li className='flex items-center justify-start w-full h-8 pl-2 transition-all hover:bg-black hover:bg-opacity-40' 
                  onClick={()=> navigate('/settings')}>

                  SETTINGS
                </li>
                */}

                  <li className="h-8 " onClick={handleProfileClose}>
                    <div
                      className="flex items-center justify-start w-full h-full pl-2 text-red-700 transition-all hover:bg-black hover:bg-opacity-40 hover:text-red-600 gap-x-1 "
                      onClick={handleLogout}
                    >
                      <div>Log out</div>
                      <div className="">
                        <Icon path={mdiLogoutVariant} size={1} />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </button>
            {profileMenuOpen && (
              <div
                className="fixed top-0 left-0 z-20 w-screen h-screen OVERLAY"
                onClick={handleProfileClose}
              ></div>
            )}
          </div>
        ) : (
          <div className="flex pr-8 text-sm font-normal NOT-LOGGED-IN-NAV gap-x-4">
            <Link
              className="transition-all border-b border-white border-opacity-0 hover:text-slate-300 hover:border-opacity-100"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="transition-all border-b border-white border-opacity-0 hover:text-slate-300 hover:border-opacity-100"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Header;