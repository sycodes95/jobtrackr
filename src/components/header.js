import '../styles/header.css';
import logo from '../logo/logo.png'
import { Link } from 'react-router-dom';


function Header () {

  return (
    <section className="HEADER-CONTAINER h-16 bg-dev-slate flex items-center justify-between  text-white">

      <div className='HEADER-LOGO h-full w-72  flex items-center overflow-hidden '>
        <img className='' src={logo}/>
      </div>
      <div className='flex gap-x-4 pr-8 text-sm'>
        <Link className='hover:text-slate-300 transition-colors' to='/login'>
          Login
        </Link>
        <Link className='hover:text-slate-300 transition-colors' to='/signup'>
          Signup
        </Link>
      </div>

    </section>
  )
}

export default Header;