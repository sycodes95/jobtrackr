import { useEffect, useState } from "react";

import { Dna } from "react-loader-spinner";

function Signup () {
  const [loggedIn, setLoggedIn] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [signupSuccess, setSignupSucess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: ""
  })

  useEffect(()=> {
    verifyToken()
  },[])

  useEffect(()=>{
    if(loggedIn) window.location.href = '/'
  },[loggedIn])

  const verifyToken = () => {
    const token = localStorage.getItem('jobtrackr_token')
    token && setLoggedIn(true)
  }

  

  const handleInputChange = (e) => {
    //DESTRUCTURE EVENT TARGET
    const { name, value } = e.target;
    //UPDATE FORM DATA STATE
    setFormData({...formData, [name]: value})
  }

  useEffect(()=>{
    //CHECK PASSWORD LENGTH AND EMAIL FORMAT
    const password = formData.password
    password.length <= 5 && password.length > 0
    ? setPasswordError('too short (6 characters minimum)') 
    : setPasswordError(null)

    const email = formData.email
    !re.test(email) && email.length > 0
    ? setEmailError('Invalid email format')
    : setEmailError(null)
  },[formData])

 
  const handleSignUp = (e) =>{
    e.preventDefault()
    if (!re.test(formData.email) ) return setEmailError('Invalid email format')
    if (formData.password.length <= 5) return setPasswordError('too short (6 characters minimum)') 
    setIsLoading(true)
    const host = process.env.REACT_APP_API_HOST
    fetch(`${host}/users/sign-up-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      
      const user = data.user;
      const errors = data.errors;
      setIsLoading(false)
      if(data && user){
        
        setSignupSucess('Sign Up Success!')
        setTimeout(()=>{
          window.location.href = "/login"
        },1500)
        
      } 

      if(data && errors) {
        errors.code === '23505' && setEmailError('Email Already Exists')

        errors.forEach(err => {
          err.value === '122' && setPasswordError('Passwords don\'t match')
        })
        
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  return(
    <div className="flex flex-col items-center h-full grow">
      
      <form className="flex flex-col items-center p-4 mt-8 text-sm text-gray-700 bg-black bg-opacity-25 border rounded-md shadow-md SIGN-UP-FORM gap-y-2 border-slate-800" >
        <div className="w-48 h-48 bg-earth">
        </div>
        <div className="flex items-center justify-center w-full h-12 text-2xl text-gray-700 rounded-sm ">REGISTRATION</div>
        <div className="flex flex-col flex-wrap">
          <span className="w-full text-xs text-center text-yellow-500 ">PLEASE COMPLETE THE FORM BELOW TO CREATE A NEW JOB TRACKR ACCOUNT.</span>
        </div>
        
        
        <label className="text-gray-700 font-black-outline">Email*</label>
        <input className="w-full h-10 p-1 text-xl text-gray-700 bg-black bg-opacity-25 border border-gray-300 rounded-sm caret-white" name="email" type="email" value={formData.email} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{emailError}</div>

        <label className="text-gray-700 font-black-outline">Password*</label>
        <input className="w-full h-10 p-1 text-xl text-gray-700 bg-black bg-opacity-25 border border-gray-300 rounded-sm caret-white" name="password" type="password" value={formData.password} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{passwordError}</div>

        <label className="text-gray-700 font-black-outline">Confirm Password*</label>
        <input className="w-full h-10 p-1 text-xl text-gray-700 bg-black bg-opacity-25 border border-gray-300 rounded-sm caret-white" name="confirm_password" type="password" value={formData.confirm_password} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <button className="grid w-full h-10 grid-cols-3 text-xl text-gray-700 transition-colors bg-yellow-500 bg-opacity-25 hover:bg-yellow-700 hover:bg-opacity-25 font-black-outline" onClick={handleSignUp}>
          <div className="flex items-center justify-center h-full col-start-2">SIGN UP</div>
          <div className="flex items-center justify-center col-start-3">
            {
            isLoading &&
            <Dna
            visible={true}
            height="40"
            width="40"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />
            }
            
          </div>
          
        </button>

        <div className="flex items-center h-8 text-green-300">{signupSuccess}</div>
       
      </form>
    </div>
  )
}

export default Signup;