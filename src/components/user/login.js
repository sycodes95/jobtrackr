import { useState, useEffect } from "react";


function Login () {
  const [loggedIn, setLoggedIn] = useState(null)

  const [loginError, setLoginError] = useState(null)

  const [isDemoAccount, setIsDemoAccount] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

 

  const verifyToken = () => {
    const token = localStorage.getItem('jobtrackr_token')
    token && setLoggedIn(true)
  }

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleLogIn = (e) =>{
    e && e.preventDefault()

    const host = process.env.REACT_APP_API_HOST
    fetch(`${host}/users/log-in-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      const token = data.token;
      if(token) {
        localStorage.setItem('jobtrackr_token', JSON.stringify(token))
        window.location.href = '/tracker'
      } else {
        setLoginError('Incorrect email or password')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  const handleDemoLogIn = (e) => {
    e && e.preventDefault()
    setFormData({
      email: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PW,
    })
    setIsDemoAccount(true)
  }
  useEffect(()=> {
    verifyToken()
  },[])
  useEffect(()=> {
    
    formData.email && formData.password && isDemoAccount && handleLogIn()
  },[formData.email, formData.password, isDemoAccount])
  useEffect(()=>{
    if(loggedIn) window.location.href = '/tracker'
  },[loggedIn])
  
  return(
    <div className="flex flex-col items-center flex-1 h-full pt-16 pb-16 LOG-IN-CONTAINER ">
      
      <form className="flex flex-col items-center p-4 pb-8 text-sm text-black rounded-md LOG-IN-FORM gap-y-2 bg-gray-2">
        <div className="w-48 h-48 bg-earth">
        </div>
        <div className="flex items-center justify-center w-full h-12 text-2xl text-white rounded-sm ">AUTHORIZATION</div>
        
        
        <label className="text-white font-black-outline">Email</label>
        <input className="w-full h-10 p-1 text-xl text-white bg-black bg-opacity-25 border border-black rounded-sm caret-white" name="email" type="email" value={formData.email} onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{loginError}</div>

        <label className="text-white font-black-outline">Password</label>
        <input className="w-full h-10 p-1 text-xl text-white bg-black bg-opacity-25 border border-black rounded-sm caret-white" 
        name="password" type="password" value={formData.password} onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <button className="w-full h-10 text-xl text-white transition-colors bg-yellow-500 bg-opacity-50 rounded-sm hover:bg-opacity-25 font-black-outline"
         onClick={handleLogIn}>LOG IN</button>
        <button className="w-full h-6 mt-4 text-xs text-white transition-colors bg-red-800 bg-opacity-50 rounded-sm hover:bg-opacity-25 font-black-outline"
         onClick={handleDemoLogIn}>USE DEMO ACCOUNT</button>
      </form>
    </div>
  )
}

export default Login;