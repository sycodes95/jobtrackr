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

  return(
    <div className="LOG-IN-CONTAINER h-full  flex flex-col  items-center ">
      <div className="h-80 w-80 bg-earth">
      </div>
      <div className="text-2xl">LOG IN</div>
      <form className="mt-8 w-80 flex flex-col items-center p-4rounded-sm shadow-2xl
      text-black text-sm" method="POST">
        
        <label>Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleInputChange}/>
        <label>Password</label>
      </form>
    </div>
  )
}

export default Login;