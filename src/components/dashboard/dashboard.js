import { useEffect, useState } from "react"
import StatusPie from "./statusPie"


function Dashboard () {
  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)

  const getAllJobApps = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-all-get?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data){
        setJobApps(data)
      } 
      
    })
  }

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('jobtrackr_token'))
    
    if(token) {
      fetch(`${process.env.REACT_APP_API_HOST}/users/verify-token-get`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(data => {
          const user_id = data.user.user.rows[0].user_id
          set_user_id(user_id)
      })  
      .catch(error => console.error(error))
    }    

  },[])   
  
  useEffect(()=>{
    user_id && getAllJobApps()
  },[user_id])

  return (
    <div className="flex justify-center p-8 w-full h-full">
      <div className="TRACKER-CONTAINER  h-full text-black max-w-screen-2xl flex flex-wrap items-center 
    bg-black bg-opacity-25 ">
        
        <section className="">
          <div>hi</div>
          {
          jobApps &&
          <StatusPie jobApps={jobApps}/>
          }
          
        </section>
      </div>
      
    </div>
  )
}

export default Dashboard;