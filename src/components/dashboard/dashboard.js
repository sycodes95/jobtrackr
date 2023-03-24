import { useEffect, useRef, useState } from "react"
import InterviewRatio from "./interviewRatio"
import OfferRatio from "./offerRatio"
import OverallStats from "./overallStats"
import ResponseRatio from "./responseRatio"
import StatusPie from "./statusPie"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subWeeks, subMonths, subYears, format } from "date-fns"
import OfferAmount from "./offerAmount"
import RejectionRatio from "./rejectionRatio"
import JobFitBarChart from "./jobFitBarChart"
import AppMethodLine from "./appMethodLine"
import AppLocationLine from "./appLocationLine"
import RejectionStage from "./rejectionStage"
import RejectionStageBar from "./rejectionStage"

function Dashboard () {
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
      console.log(data);
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
    console.log(date_end);
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
    console.log(sortCustomRangeRef.current);
    
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
    <div className="DASHBOARD-CONTAINER flex justify-center p-8 w-full h-full">
      <div className="h-full w-full max-w-7xl text-black flex flex-col gap-x-2 gap-y-2 items-center 
     p-2">
        <section className="DASHBOARD-DATE-SORT  bg-black bg-opacity-25 col-span-full 
        flex justify-between gap-x-2 w-full h-full col-start-1 ">

          
          <div className="flex gap-x-4 bg-black bg-opacity-25 p-2 text-white text-xs justify-between">
            <button className="border-b border-white p-1 transition-all"
            name="ALL" onClick={handleDateSort} ref={sortAllRef}>
              ALL
            </button>
            <button className="border-b border-white border-opacity-0 whitespace-nowrap transition-all" 
            name="LAST WEEK" onClick={handleDateSort} ref={sortWeekRef}>
              LAST WEEK
            </button>
            <button className="border-b border-white border-opacity-0 whitespace-nowrap transition-all" 
            name="LAST MONTH" onClick={handleDateSort} ref={sortMonthRef}>
              LAST MONTH
            </button>
            <button className="border-b border-white border-opacity-0 whitespace-nowrap transition-all" 
            name="LAST YEAR" onClick={handleDateSort} ref={sortYearRef}>
              LAST YEAR
            </button>
          </div>

          <div className="flex gap-x-2 items-center bg-black bg-opacity-25 p-2 text-white text-xs w-full">
            <div className="whitespace-nowrap border-b border-white border-opacity-0" 
            ref={sortCustomRangeRef}>
              CUSTOM RANGE
            </div>
            <div className="w-full">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
            selected={customDateRange.start} placeholderText="MM/DD/YYYY" 
            onChange={(date) => setCustomDateRange({...customDateRange, start:date})}/>
            </div>
            <div>
              -
            </div>
            <div className="w-full">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
            selected={customDateRange.end} placeholderText="MM/DD/YYYY" 
            onChange={(date) => setCustomDateRange({...customDateRange, end:date})}/>
            </div>
            <div className="flex gap-x-2">
              <button onClick={handleCustomDateSort}>APPLY</button>
              <button onClick={handleCustomDateClear}>CLEAR</button>
            </div>
          </div>

        </section>


        <section className="bg-black bg-opacity-25 col-span-full flex flex-wrap gap-x-2 w-full h-full col-start-1">

          <div className="p-2 flex flex-wrap w-full gap-x-2">
            <OverallStats jobApps={jobApps}/>
          </div>

        </section>

        <section className="bg-black bg-opacity-25 col-span-full flex flex-wrap gap-x-2 w-full h-full col-start-1">

          <div className="p-2 flex flex-wrap w-full gap-x-2">
            <OfferAmount jobApps={jobApps}/>
          </div>

        </section>

        <section className="bg-black bg-opacity-25 col-span-full flex flex-wrap gap-x-2 w-full h-full col-start-1">

          <div className="DASHBOARD-RATIOS p-2 grid grid-cols-4 w-full gap-2">
            <ResponseRatio jobApps={jobApps}/>
            <InterviewRatio jobApps={jobApps}/>
            <OfferRatio jobApps={jobApps}/>
            <RejectionRatio jobApps={jobApps}/>
          </div>
          
        </section>

        <section className="bg-black bg-opacity-25 flex flex-col w-full h-full col-start-1 col-span-full">

          <div className=" p-2 grid NIVO-GRID w-full gap-2">
            <StatusPie jobApps={jobApps}/>
            <JobFitBarChart jobApps={jobApps}/>
            
          </div>
          
        </section>

        <section className="bg-black bg-opacity-25 flex flex-col w-full h-full col-start-1 col-span-full">

          <div className=" p-2 grid NIVO-GRID w-full gap-2">
            <AppMethodLine jobApps={jobApps}/>
            <AppLocationLine jobApps={jobApps}/>
          </div>
          
        </section>

        <section className="bg-black bg-opacity-25 flex flex-col w-full h-full col-start-1 col-span-full">

          <div className=" p-2 grid NIVO-GRID w-full gap-2">
            <RejectionStageBar jobApps={jobApps}/>
          </div>
          
        </section>
      </div>
       
    </div>
  )
}

export default Dashboard;