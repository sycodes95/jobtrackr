import React, { useEffect, useRef, useState, useMemo, forwardRef } from "react"

import Icon from '@mdi/react';
import { mdiFilterSettings} from '@mdi/js';

import Rating from 'react-rating';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function TrackerFilter (props) {
  const navigate = useNavigate()

  const {filters, setFilters} = props.filtersContext

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
    setFilters(filters)
  }

  const handleFilterClear = () =>{
    navigate(0)
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
    <div className="flex w-full p-2 rounded-lg shadow-md max-640px-flex-column-w-full gap-x-4 gap-y-4 h-fit">
      <section className="flex text-gray-700 FILTER-LOGO">
        <div className="flex flex-col items-center justify-center flex-1 p-2 bg-black bg-opacity-25 rounded-lg gap-y-2">
          <Icon path={mdiFilterSettings} size={1.5} />
          <span className="text-xs font-bold">FILTERS</span>
        </div>
        
      </section>

      <section className="hidden p-2 text-gray-700 bg-black bg-opacity-25 rounded-lg FILTER-LOGO-SMALL ">
        <div className="flex flex-col items-center justify-center flex-1 p-2 gap-y-2 hover:cursor-pointer">
          <Icon path={mdiFilterSettings} size={2} />
          <span className="text-sm font-bold">FILTERS</span>
          
        </div>
        <button className="flex items-center justify-center w-full h-6 transition-all rounded-lg bg-steel-blue bg-opacity-30 hover:bg-opacity-40"
        onClick={handleShowHideFilters}>
          
          <div className="text-xs"> SHOW FILTERS / HIDE </div>
          
        </button>
        
      </section>

      <div className="flex flex-wrap justify-between transition-all max-640px-hidden gap-x-4 gap-y-4" ref={filtersContainerRef}>

        <section className="flex items-center flex-grow p-1 bg-black rounded-lg FILTER-SECTION-DATES h-fit min-w-fit max-640px-flex-column-w-full bg-opacity-40 gap-x-2 gap-y-2">
          
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg min-w-fit max-640px-flex-column-w-full">APP DATE</div>
          
          <div className="flex items-center flex-grow w-full h-6 text-xs max-640px-flex-column-w-full">
            <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25 rounded-lg" 
            type="date" value={appDate.a} onChange={(e) => setAppDate({...appDate, a: e.target.value })}/>
          </div>
          
          <div className="h-6 text-center text-gray-700">-</div>

          <div className="flex items-center flex-grow w-full h-6 text-xs max-640px-flex-column-w-full">
          <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25 rounded-lg" 
            type="date" value={appDate.b} onChange={(e) => setAppDate({...appDate, b: e.target.value })}/>
          </div>
          
        </section>

        <section id="filter-app-status" className="flex flex-grow p-1 text-gray-300 bg-black rounded-lg h-fit bg-opacity-40 gap-x-2 max-640px-flex-column-w-full">
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg min-w-fit max-640px-flex-column-w-full">APP STATUS</div>
          <div className="flex items-center flex-grow h-6 bg-black bg-opacity-25 rounded-lg max-640px-flex-column-w-full">
            <select className="flex items-center flex-grow h-6 text-xs bg-black bg-opacity-0 rounded-lg focus:outline-none max-640px-flex-column-w-full" onChange={handleAppStatus}>
              {
              applicationStatusOptions.map((status, index) =>(
                <option key={index} className="bg-jet ">{status.value}</option>
              ))
              }
            </select>
            
          </div>
          
        </section>

        <section className="flex items-center flex-grow p-1 bg-black rounded-lg h-fit min-w-fit max-640px-flex-column-w-full bg-opacity-40 gap-x-2">
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg w-fit min-w-fit max-640px-row">
            FAVORITE COMPANY
          </div>
          <div className="flex items-center justify-center flex-grow w-full h-6 pr-1 text-xs max-640px-flex-column-w-full">
            <input className='flex items-center h-6 text-xs bg-black bg-opacity-0 focus:outline-none' name='company_favorite' 
            type='checkbox' placeholder='...' checked={favorite.a} 
            onChange={(e) => setFavorite({...favorite, a: e.target.checked})}/>
          </div>
          
        </section>

        <section className="flex items-center flex-grow p-1 bg-black rounded-lg h-fit gap-x-2 gap-y-2 max-640px-flex-column-w-full bg-opacity-40">
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg w-fit max-640px-flex-column-w-full">
            FIT RATING
          </div>
          <div className="flex flex-grow gap-x-4">

          
            <div className="flex justify-center flex-grow w-fit text-md">
              <Rating
              className='flex justify-between text-gray-400 '
              initialRating={jobFitRating.a}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value)=>setJobFitRating({...jobFitRating, a: value})}
              />
            </div>
            <div className="text-gray-700">-</div>
            <div className="flex justify-center flex-grow w-fit text-md">

            
              <Rating
              className='flex justify-between text-gray-400 '
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
            <button className="h-6 p-1 text-xs text-center text-gray-700 transition-all bg-opacity-50 rounded-lg bg-steel-blue w-fit max-640px-flex-column-w-full-row hover:bg-opacity-70" onClick={handleJobFitClear}>
              CLEAR
            </button>
          </div>
        </section>
        
        <section className="flex items-center flex-grow p-1 bg-black rounded-lg FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full bg-opacity-40 gap-x-2 gap-y-2">
          
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg min-w-fit max-640px-flex-column-w-full">
            RESPONSE DATE
          </div>
          
          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full ">
            
            <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25" 
            type="date" value={responseDate.a} onChange={(e) => setAppDate({...responseDate, a: e.target.value })}/>
          </div>
          
          <div className="h-6 text-center text-gray-700 ">-</div>

          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full">
            
            <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25" 
            type="date" value={responseDate.b} onChange={(e) => setAppDate({...responseDate, b: e.target.value })}/>
          </div>
          
        </section>

        <section className="flex items-center flex-grow p-1 bg-black rounded-lg FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full bg-opacity-40 gap-x-2 gap-y-2">
          
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg min-w-fit max-640px-flex-column-w-full">INTERVIEW DATE</div>
          
          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full">
            
            <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25 rounded-lg" 
            type="date" value={interviewDate.a} onChange={(e) => setAppDate({...interviewDate, a: e.target.value })}/>
          </div>
          
          <div className="h-6 text-center text-gray-700 ">-</div>

          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full ">
            
            <input className="w-full p-1 text-gray-700 bg-black bg-opacity-25 rounded-lg" 
            type="date" value={interviewDate.b} onChange={(e) => setAppDate({...interviewDate, b: e.target.value })}/>
          </div>
          
        </section>

        <section className="flex items-center flex-grow p-1 bg-black rounded-lg FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full bg-opacity-40 gap-x-2 gap-y-2">
          
          <div className="h-6 p-1 text-xs text-center text-gray-700 bg-white rounded-lg min-w-fit max-640px-flex-column-w-full">OFFER AMOUNT</div>
          
          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full">
            <input className='w-full h-6 text-gray-700 bg-black bg-opacity-25 rounded-lg max-640px-flex-column-w-full'
             name='offer_amount_a' type='number' onChange={(e)=>setOfferAmount({...offerAmount, a: parseInt(e.target.value)})}/>
          </div>
          
          <div className="h-6 text-center text-gray-700 ">-</div>

          <div className="flex items-center w-full h-6 text-xs max-640px-flex-column-w-full ">
            <input className='w-full h-6 text-gray-700 bg-black bg-opacity-25 rounded-lg max-640px-flex-column-w-full'
             name='offer_amount_b' type='number' onChange={(e)=>setOfferAmount({...offerAmount, b: parseInt(e.target.value)})} />
          </div>
          
        </section>

      </div>
      <section className="flex flex-col bg-black bg-opacity-25 rounded-lg">

          <div className="flex w-full h-full p-1 text-xs max-640px-flex-column-w-full">
            <button className='items-center h-full p-1 font-bold text-gray-700 transition-all bg-green-700 bg-opacity-25 rounded-lg max-640px-flex-column-w-full w-fit hover:bg-opacity-50' onClick={handleFilterApply}>
              APPLY
            </button>
          </div>

          <div className="flex w-full h-full p-1 text-xs max-640px-flex-column-w-full">
            <button className='items-center h-full p-1 font-bold text-gray-700 transition-all bg-gray-300 bg-opacity-25 rounded-lg max-640px-flex-column-w-full hover:bg-opacity-50' onClick={handleFilterClear}>
              CLEAR
            </button>
          </div>
          
        </section>
    </div>
  )
}

export default TrackerFilter