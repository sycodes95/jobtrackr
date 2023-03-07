import { useState } from "react";


function Login () {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleLogIn = () =>{

  }
  return(
    <div className="LOG-IN-CONTAINER h-fit flex flex-1 flex-col items-center pb-16 ">
      
      <form className="LOG-IN-FORM mt-8  flex flex-col gap-y-2 items-center p-4 rounded-md
      text-black text-sm bg-black bg-opacity-25 pb-8" onSubmit={handleLogIn}>
        <div className="h-48 w-48 bg-earth">
        </div>
        <div className="h-12 w-full rounded-sm flex justify-center items-center text-white text-2xl ">AUTHORIZATION</div>
        
        
        <label className="text-white font-black-outline">Email</label>
        <input className=" w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="email" type="email" value={formData.email} onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <label className="text-white font-black-outline">Password</label>
        <input className="w-full h-10 rounded-sm p-1 border border-black bg-black bg-opacity-25 text-white caret-white text-xl" name="password" type="password" value={formData.password} onChange={handleInputChange}/>
        <div className="h-4 text-red-600"></div>

        <button className="w-full h-10  text-white text-xl bg-green-800 bg-opacity-25 hover:bg-green-700 hover:bg-opacity-25 transition-colors font-black-outline" type="submit">LOG IN</button>
        <button className="w-full h-6 mt-4 text-white bg-red-800 bg-opacity-25 hover:bg-red-700 hover:bg-opacity-25 transition-colors font-black-outline text-xs" type="submit">USE DEMO ACCOUNT</button>
      </form>
    </div>
  )
}

export default Login;