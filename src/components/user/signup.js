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
    <div className="SIGN-UP-CONTAINER h-fit flex flex-1 flex-col items-center">
      
      <form className="SIGN-UP-FORM mt-8 flex flex-col gap-y-2 items-center p-4 rounded-md
      text-black text-sm bg-black bg-opacity-25 " >
        <div className="h-48 w-48 bg-earth">
        </div>
        <div className="h-12 w-full rounded-sm  flex justify-center items-center text-white text-2xl ">REGISTRATION</div>
        <div className="flex flex-col flex-wrap">
          <span className="w-full text-center text-xs text-yellow-500 ">PLEASE COMPLETE THE FORM BELOW TO CREATE A NEW JOB TRACKR ACCOUNT.</span>
        </div>
        
        
        <label className="text-white font-black-outline">Email*</label>
        <input className=" w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="email" type="email" value={formData.email} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{emailError}</div>

        <label className="text-white font-black-outline">Password*</label>
        <input className="w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="password" type="password" value={formData.password} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600">{passwordError}</div>

        <label className="text-white font-black-outline">Confirm Password*</label>
        <input className="w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="confirm_password" type="password" value={formData.confirm_password} required onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <button className="w-full h-10  text-white text-xl bg-yellow-500 bg-opacity-25 hover:bg-yellow-700 hover:bg-opacity-25 transition-colors font-black-outline grid grid-cols-3" onClick={handleSignUp}>
          <div className="col-start-2 flex justify-center items-center h-full">SIGN UP</div>
          <div className="col-start-3 flex justify-center items-center">
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