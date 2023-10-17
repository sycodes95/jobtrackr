import { useEffect, useRef, useState } from "react"
import InterviewRatio from "./interviewRatio"
import OfferRatio from "./offerRatio"
import OverallStats from "./overallStats"
import ResponseRatio from "./responseRatio"
import StatusPie from "./statusPie"
import "react-datepicker/dist/react-datepicker.css";
import { subWeeks, subMonths, subYears, format } from "date-fns"
import OfferAmount from "./offerAmount"
import RejectionRatio from "./rejectionRatio"
import JobFitBarChart from "./jobFitBarChart"
import AppMethodLine from "./appMethodLine"
import AppLocationLine from "./appLocationLine"
import RejectionStageBar from "./rejectionStage"
import { useNavigate } from "react-router-dom"

function Dashboard () {
  const navigate = useNavigate()

  const sortAllRef = useRef(null)
  const sortWeekRef = useRef(null)
  const sortMonthRef = useRef(null)
  const sortYearRef = useRef(null)
  const sortCustomRangeRef = useRef(null)
  
  const [customDateRange, setCustomDateRange] = useState({
    start: null,
    end: null
  })

  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)
  
  const getAllJobApps = (date_start, date_end) => {
    let formatStart;
    let formatEnd;
    let query = `/job-app-all-get?user_id=${user_id}`
    
    if(date_start){
      formatStart = format(new Date(date_start), 'yyyy-MM-dd HH:mm')
      query += `&date_start=${formatStart}`
    }
    if(date_end){
      formatEnd = format(new Date(date_end), 'yyyy-MM-dd HH:mm')
      query += `&date_end=${formatEnd}`
    }
    
    fetch(`${process.env.REACT_APP_API_HOST}${query}`)
    .then(res => res.json())
    .then(data => {
      if(data.length > 0){
        setJobApps(data)
      } else if(data.length === 0) {
        setJobApps([])
      }
    })
    
  }

  const handleDateSort = (e) => {
    const sortDateArray = [sortAllRef, sortWeekRef, sortMonthRef, sortYearRef, sortCustomRangeRef]

    sortDateArray.forEach(date => date.current.classList.add('border-opacity-0'))

    e.target.classList.remove('border-opacity-0')

    const {name} = e.target
    
    if(name === 'ALL') return getAllJobApps()

    let date_end = new Date()
    let date_start;
    if(name === 'LAST WEEK'){
      date_start = subWeeks(date_end, 1)
    } else if (name === 'LAST MONTH') {
      date_start = subMonths(date_end, 1)
    } else if (name === 'LAST YEAR'){
      date_start = subYears(date_end, 1)
    }
    
    getAllJobApps(date_start, date_end)
    
  }

  const handleCustomDateSort = () => {
    const sortDateArray = [sortAllRef, sortWeekRef, sortMonthRef, sortYearRef, sortCustomRangeRef]
    sortDateArray.forEach(date => date.current.classList.add('border-opacity-0'))
    
    if(customDateRange.start || customDateRange.end) {
      getAllJobApps(customDateRange.start, customDateRange.end )
    } 
  }

  const handleCustomDateClear = () => {
    sortCustomRangeRef.current.classList.add('border-opacity-0')
    sortAllRef.current.classList.remove('border-opacity-0')
    setCustomDateRange({start: null, end:null})
    getAllJobApps()
  }

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('jobtrackr_token'))
    if(!token) return navigate('/login')
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
    
    <div className="flex justify-center w-full h-full p-8 DASHBOARD-CONTAINER">
      {
      user_id &&
      <div className="flex flex-col items-center w-full h-full max-w-5xl p-2 text-gray-700 gap-x-2 gap-y-2">
        <section className="flex justify-between w-full h-full col-start-1 DASHBOARD-DATE-SORT border-opacity-30 col-span-full gap-x-2 ">

          
          <div className="flex justify-between gap-4 p-2 text-xs text-gray-700 bg-black bg-opacity-25 border rounded-lg shadow-md border-slate-800">
            <button className="p-1 transition-all border-b border-white"
            name="ALL" onClick={handleDateSort} ref={sortAllRef}>
              ALL
            </button>
            <button className="transition-all border-b border-white border-opacity-0 whitespace-nowrap" 
            name="LAST WEEK" onClick={handleDateSort} ref={sortWeekRef}>
              LAST WEEK
            </button>
            <button className="transition-all border-b border-white border-opacity-0 whitespace-nowrap" 
            name="LAST MONTH" onClick={handleDateSort} ref={sortMonthRef}>
              LAST MONTH
            </button>
            <button className="transition-all border-b border-white border-opacity-0 whitespace-nowrap" 
            name="LAST YEAR" onClick={handleDateSort} ref={sortYearRef}>
              LAST YEAR
            </button>
          </div>

          <div className="flex items-center w-full p-2 text-xs text-gray-700 bg-black bg-opacity-25 border rounded-lg shadow-md border-slate-800 gap-x-2">
            <div className="border-b border-white border-opacity-0 whitespace-nowrap" 
            ref={sortCustomRangeRef}>
              CUSTOM RANGE
            </div>
            <div className="w-full">
            <input className="w-full p-1 bg-black bg-opacity-25" 
            type="date" value={customDateRange.start} onChange={(e) => setCustomDateRange({...customDateRange, start: e.target.value})}/>
            
            </div>
            <div>
              -
            </div>
            <div className="w-full">
            <input className="w-full p-1 bg-black bg-opacity-25" 
            type="date" value={customDateRange.end} onChange={(e) => setCustomDateRange({...customDateRange, end: e.target.value})}/>
            </div>
            <div className="flex gap-x-2">
              <button onClick={handleCustomDateSort}>APPLY</button>
              <button onClick={handleCustomDateClear}>CLEAR</button>
            </div>
          </div>

        </section>


        <section className="flex flex-wrap w-full h-full col-start-1 col-span-full gap-x-2">

          <div className="flex flex-wrap w-full gap-x-2">
            <OverallStats jobApps={jobApps}/>
          </div>

        </section>

        <section className="flex flex-wrap w-full h-full col-start-1 col-span-full gap-x-2">

          <div className="flex flex-wrap w-full gap-x-2">
            <OfferAmount jobApps={jobApps}/>
          </div>

        </section>

        <section className="flex flex-wrap w-full h-full col-start-1 col-span-full gap-x-2">

          <div className="grid w-full grid-cols-4 gap-2 DASHBOARD-RATIOS">
            <ResponseRatio jobApps={jobApps}/>
            <InterviewRatio jobApps={jobApps}/>
            <OfferRatio jobApps={jobApps}/>
            <RejectionRatio jobApps={jobApps}/>
          </div>
          
        </section>

        <section className="flex flex-col w-full h-full col-start-1 col-span-full">

          <div className="grid w-full gap-2 NIVO-GRID">
            <StatusPie jobApps={jobApps}/>
            <JobFitBarChart jobApps={jobApps}/>
            
          </div>
          
        </section>

        <section className="flex flex-col w-full h-full col-start-1 col-span-full">

          <div className="grid w-full gap-2 NIVO-GRID">
            <AppMethodLine jobApps={jobApps}/>
            <AppLocationLine jobApps={jobApps}/>
          </div>
          
        </section>

        <section className="flex flex-col w-full h-full col-start-1 col-span-full">

          <div className="grid w-full gap-2 NIVO-GRID">
            <RejectionStageBar jobApps={jobApps}/>
          </div>
          
        </section>
      </div>
      }
    </div>
    
  )
}

export default Dashboard;