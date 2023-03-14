import { useEffect, useRef, useState, useMemo } from "react"

import Icon from '@mdi/react';
import { mdiFilterSettings} from '@mdi/js';

import Rating from 'react-rating';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TrackerFilter (props) {
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext

  const filtersContainerRef = useRef(null)
  const [showFilters, setShowFilters] = useState(false)

  const [appStatus, setAppStatus] = useState({
    filter: 'APPLICATION STATUS',
    column: null,
    a:null
  })
  const [appDate, setAppDate] = useState({
    filter: 'APPLICATION DATE',
    column: 'job_app_date',
    a:null, b:null 
  })
  const [favorite, setFavorite] = useState({
    filter: 'FAVORITE',
    column: 'company_favorite',
    a:null 
  })
  const [jobFitRating, setJobFitRating] = useState({
    filter: 'FIT RATING',
    column: 'job_fit_rating',
    a:null, b:null 
  });
  const [responseDate, setResponseDate] = useState({
    filter: 'RESPONSE DATE',
    column: 'response_date',
    a:null, b:null 
  })
  const [interviewDate, setInterviewDate] = useState({
    filter: 'INTERVIEW DATE',
    column: 'interview_date',
    a:null, b:null 
  })
  const [offerAmount, setOfferAmount] = useState({
    filter: 'OFFER AMOUNT', 
    column: 'offer_amount', 
    a:null, b:null 
  })

  const applicationStatusOptions = useMemo(() => [
    {value:'', column:null, a:null},
    {value:'AWAITING RESPONSE', column: ['response_date', 'interview_date', 'rejected'], a:['IS NULL','IS NULL','IS NULL']},
    {value:'INTERVIEW STAGE', column: ['interview_date', 'rejected', 'offer_amount'], a:['IS NOT NULL','IS NULL','IS NULL']},
    {value:'OFFER RECEIVED', column: ['offer_amount'], a:['IS NOT NULL']}, 
    {value:'REJECTED', column: ['rejected'], a:['IS NOT NULL']},
  ],[])

  const handleAppStatus = (e) => {
    const value = e.target.value;
    const statusIndex = applicationStatusOptions.findIndex(obj => obj.value === value)
    const column = applicationStatusOptions[statusIndex].column
    const a = applicationStatusOptions[statusIndex].a
    setAppStatus({...appStatus, column: column, a: a})
  }
  
  const handleFilterApply = () => {
    const filters = [appStatus, appDate, favorite, jobFitRating, responseDate, interviewDate, offerAmount,]
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-filter-get?user_id=${user_id}&filters=${JSON.stringify(filters)}`)
    .then(response => response.json())
    .then(data =>{
      if(data.length > 0){
        setJobApps(data)
      }
    })
  }

  const handleFilterClear = () =>{
    window.location.reload();
  }
 
  const handleShowHideFilters = () =>{ 
    setShowFilters(!showFilters)
  }

  const handleJobFitClear = () => {
    setJobFitRating({a:null, b:null})
  }

  useEffect(()=> {
    const filtersContainer = filtersContainerRef.current;
    showFilters ? filtersContainer.classList.remove('max-640px-hidden') : filtersContainer.classList.add('max-640px-hidden')
  },[showFilters])
  
  return(
    <div className="flex max-640px-flex-column-w-full gap-x-4 gap-y-4 h-fit w-full ">
      <section className="FILTER-LOGO text-white flex">
        <div className="p-2 bg-striped bg-opacity-25 flex flex-col flex-1 justify-center  items-center gap-y-2">
          <Icon path={mdiFilterSettings} size={1.5} />
          <span className="text-xs font-bold">FILTERS</span>
        </div>
        
      </section>

      <section className="FILTER-LOGO-SMALL hidden text-white ">
        <div className="p-2 bg-striped bg-opacity-25 flex flex-col flex-1 justify-center  items-center gap-y-2 hover:cursor-pointer">
          <Icon path={mdiFilterSettings} size={2} />
          <span className="text-sm font-bold">FILTERS</span>
          
        </div>
        <button className="flex items-center justify-center w-full bg-steel-blue bg-opacity-30 hover:bg-opacity-40 transition-all"
        onClick={handleShowHideFilters}>
          
          <div className="text-xs"> SHOW FILTERS / HIDE </div>
          
        </button>
        
      </section>

      <div className="max-640px-hidden flex flex-wrap gap-x-4 gap-y-4 justify-between transition-all" ref={filtersContainerRef}>

        <section className="FILTER-SECTION-DATES h-fit min-w-fit flex-grow max-640px-flex-column-w-full flex items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">APP DATE</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 flex-grow text-white '
             selected={appDate.a} onChange={(date) => setAppDate({...appDate, a:date })} />
          </div>
          
          <div className="text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 flex-grow text-white '
             selected={appDate.b} onChange={(date) => setAppDate({...appDate, b:date })} />
          </div>
          
        </section>

        <section className="text-gray-300 h-fit p-1 bg-black bg-opacity-25 flex flex-grow gap-x-2 max-640px-flex-column-w-full">
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">APP STATUS</div>
          <div className="bg-black bg-opacity-25 flex flex-grow items-center h-6 max-640px-flex-column-w-full">
            <select className="bg-black bg-opacity-0 text-xs focus:outline-none h-6 max-640px-flex-column-w-full flex flex-grow items-center" onChange={handleAppStatus}>
              {
              applicationStatusOptions.map((status, index) =>(
                <option key={index} className="bg-jet ">{status.value}</option>
              ))
              }
            </select>
            
          </div>
          
        </section>

        <section className="h-fit min-w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2">
          <div className=" bg-red-800 bg-opacity-25 w-fit h-6 text-white text-xs text-center p-1 min-w-fit max-640px-row">FAVORITE COMPANY</div>
          <div className=" text-xs h-6 flex flex-grow justify-center items-center pr-1 max-640px-flex-column-w-full w-full">
            <input className='bg-black bg-opacity-0 text-xs focus:outline-none h-6 flex items-center black-check' name='company_favorite' 
            type='checkbox' placeholder='...' checked={favorite.a} onChange={(e) => setFavorite(e.target.checked)}/>
          </div>
          
        </section>

        <section className="h-fit flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2 max-640px-flex-column-w-full">
          <div className=" bg-red-800 bg-opacity-25 h-6 text-white text-xs text-center p-1 w-fit max-640px-flex-column-w-full">FIT RATING</div>
          <div className="flex flex-grow gap-x-4">

          
            <div className="w-fit flex-grow text-md flex justify-center">
              <Rating
              className=' text-gray-400 flex justify-between'
              initialRating={jobFitRating.a}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value)=>setJobFitRating({...jobFitRating, a: value})}
              />
            </div>
            <div className="text-white">-</div>
            <div className="w-fit text-md flex-grow flex justify-center">

            
              <Rating
              className=' text-gray-400 flex justify-between'
              initialRating={jobFitRating.b}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value)=>setJobFitRating({...jobFitRating, b: value})}
            />
            </div>
          </div>
          <div className="flex items-center max-640px-flex-column-w-full">
            <button className="bg-steel-blue bg-opacity-50 h-6 text-white text-xs text-center p-1 w-fit max-640px-flex-column-w-full-row hover:bg-opacity-70
             transition-all" onClick={handleJobFitClear}>
              CLEAR
            </button>
          </div>
        </section>
        
        <section className="FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1 
        bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1 ">
            RESPONSE DATE
          </div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white flex-grow' 
            selected={responseDate.a} onChange={(date) => setResponseDate({...responseDate, a:date })} />
          </div>
          
          <div className=" text-center  text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white flex-grow' 
            selected={responseDate.b} onChange={(date) => setResponseDate({...responseDate, b:date })} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1
         bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">INTERVIEW DATE</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs">
            
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
            selected={interviewDate.a} onChange={(date) => setInterviewDate({...interviewDate, a:date })}/>
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
            selected={interviewDate.b} onChange={(date) => setInterviewDate({...interviewDate, b:date })} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1
         bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">OFFER AMOUNT</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs">
            <input className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
             name='offer_amount_a' type='number' onChange={(e)=>setOfferAmount({...offerAmount, a: parseInt(e.target.value)})}/>
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <input className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white'
             name='offer_amount_b' type='number' onChange={(e)=>setOfferAmount({...offerAmount, b: parseInt(e.target.value)})} />
          </div>
          
        </section>

      </div>
      <section className="flex flex-col bg-striped">

          <div className=" max-640px-flex-column-w-full flex h-full w-full text-xs p-1">
            <button className='bg-green-700 bg-opacity-25 max-640px-flex-column-w-full h-full w-fit  
            text-white font-bold p-1 hover:bg-opacity-50 transition-all items-center' onClick={handleFilterApply}>
              APPLY
            </button>
          </div>

          <div className="  max-640px-flex-column-w-full flex h-full w-full text-xs p-1">
            <button className='bg-gray-300 bg-opacity-25 max-640px-flex-column-w-full h-full 
            text-white font-bold p-1 hover:bg-opacity-50 transition-all items-center' onClick={handleFilterClear}>
              CLEAR
            </button>
          </div>
          
        </section>
    </div>
  )
}

export default TrackerFilter