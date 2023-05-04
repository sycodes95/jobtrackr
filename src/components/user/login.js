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
    <div className="LOG-IN-CONTAINER h-full flex flex-1 flex-col items-center pt-16 pb-16 ">
      
      <form className="LOG-IN-FORM   flex flex-col gap-y-2 items-center p-4 rounded-md
      text-black text-sm bg-light-brown pb-8">
        <div className="h-48 w-48 bg-earth">
        </div>
        <div className="h-12 w-full rounded-sm flex justify-center items-center text-white text-2xl ">AUTHORIZATION</div>
        
        
        <label className="text-white font-black-outline">Email</label>
        <input className=" w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="email" type="email" value={formData.email} onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{loginError}</div>

        <label className="text-white font-black-outline">Password</label>
        <input className="w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" 
        name="password" type="password" value={formData.password} onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <button className="w-full h-10  text-white text-xl bg-yellow-500 bg-opacity-50 
        hover:bg-opacity-25 transition-colors font-black-outline rounded-sm"
         onClick={handleLogIn}>LOG IN</button>
        <button className="w-full h-6 mt-4 text-white bg-red-800 bg-opacity-50 
        hover:bg-opacity-25 transition-colors font-black-outline text-xs rounded-sm"
         onClick={handleDemoLogIn}>USE DEMO ACCOUNT</button>
      </form>
    </div>
  )
}

export default Login;