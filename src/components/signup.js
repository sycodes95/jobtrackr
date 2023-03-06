import { useState } from "react";

function Signup () {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }
  return(
    <div className="SIGN-IN-CONTAINER">
      
      <form method="POST">
        <label>First Name</label>  
        <input name="first_name" type="text" value={formData.first_name} onChange={handleInputChange}/>
        <label>Last Name</label>
        <label>Email</label>
        <label>Password</label>
        <label>Confirm Password</label>
      </form>
    </div>
  )
}

export default Signup;