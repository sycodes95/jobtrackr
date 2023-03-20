import { useEffect, useState } from "react"
import InterviewRatio from "./interviewRatio"
import OfferRatio from "./offerRatio"
import OverallStats from "./overallStats"
import ResponseRatio from "./responseRatio"
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
      <div className="TRACKER-CONTAINER  h-full text-black max-w-screen-2xl grid grid-cols-4 gap-x-2 gap-y-2 items-center 
    bg-black bg-opacity-25 p-2">
        <section className="bg-black bg-opacity-25 col-span-full flex flex-wrap gap-x-2 w-full h-full col-start-1">

          <div className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
            OVERALL
          </div>
          <div className="p-2 flex flex-wrap w-full gap-x-2">
            <OverallStats jobApps={jobApps}/>
          </div>


        </section>

        <section className="bg-black bg-opacity-25 col-span-full flex flex-wrap gap-x-2 w-full h-full col-start-1">

          <div className="p-2 flex flex-wrap w-full gap-2">
            
            <ResponseRatio jobApps={jobApps}/>
            <InterviewRatio jobApps={jobApps}/>
            <OfferRatio jobApps={jobApps}/>
          </div>
          
          
        </section>
        
        <section className="bg-striped-alt flex flex-col w-full h-full col-start-1">
          <div className="h-12 flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
            JOB APP STATUS PIE
          </div>
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