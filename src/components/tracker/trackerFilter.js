import { useEffect, useRef, useState } from "react"
import Icon from '@mdi/react';
import { mdiFilterSettings, mdiArrowRightBoldOutline,mdiArrowRightBoldBoxOutline } from '@mdi/js';
import Rating from 'react-rating';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { mdiMenuDown } from '@mdi/js';



import moment from "moment";
import { Input } from "antd";
function TrackerFilter (props) {
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext

  const filtersContainerRef = useRef(null)
  const [showFilters, setShowFilters] = useState(false)

  const [appDateStart, setAppDateStart] = useState(null)
  const [appDateEnd, setAppDateEnd] = useState(null)
  const [responseDateStart, setResponseDateStart] = useState(null)
  const [responseDateEnd, setResponseDateEnd] = useState(null)
  const [interviewDateStart, setInterviewDateStart] = useState(null)
  const [interviewDateEnd, setInterviewDateEnd] = useState(null)
  const [offerAmount1, setOfferAmount1] = useState(null)
  const [offerAmount2, setOfferAmount2] = useState(null)
  const [favoriteIsChecked, setFavoriteIsChecked] = useState(null)
  const [jobFitRating1, setJobFitRating1] = useState(null);
  const [jobFitRating2, setJobFitRating2] = useState(null);


  const [filters, setFilters] = useState([
    
    {filter: 'APPLICATION DATE', column: 'job_app_date',  a: null, b:null},
    {filter: 'APPLICATION STATUS', column: null,  a: null},
    {filter: 'FAVORITE', column: 'company_favorite',  a: null},
    {filter: 'FIT RATING', column: 'job_fit_rating', a: null, b:null},
    {filter: 'RESPONSE DATE', column: 'response_date', a:null, b:null},
    {filter: 'INTERVIEW DATE', column: 'interview_date', a:null, b:null},
    {filter: 'OFFER AMOUNT', column: 'offer_amount', a: null, b:null},
  ])

  

  const applicationStatusOptions = [
    {value:'', column:null, a:null},
    {value:'AWAITING RESPONSE', column: ['response_date', 'interview_date', 'rejected'], a:['IS NULL','IS NULL','IS NULL']},
    {value:'INTERVIEW STAGE', column: ['interview_date', 'rejected', 'offer_amount'], a:['IS NOT NULL','IS NULL','IS NULL']},
    {value:'OFFER RECEIVED', column: ['offer_amount'], a:['IS NOT NULL']}, //RESPONSE, INTERVIEW, REJECTED, OFFER MUST BE NULL
    {value:'REJECTED', column: ['rejected'], a:['IS NOT NULL']},
  ]

  const handleFilterApply = () => {
    const newFilter = Array.from(filters)
    const appdateIndex = newFilter.findIndex(obj => obj.filter === 'APPLICATION DATE')
    const favoriteIndex = newFilter.findIndex(obj => obj.filter === 'FAVORITE')
    const fitratingIndex = newFilter.findIndex(obj => obj.filter === 'FIT RATING')
    const responsedateIndex = newFilter.findIndex(obj => obj.filter === 'RESPONSE DATE')
    const interviewdateIndex = newFilter.findIndex(obj => obj.filter === 'INTERVIEW DATE')
    const offeramountIndex = newFilter.findIndex(obj => obj.filter === 'OFFER AMOUNT')

    newFilter[appdateIndex].a = appDateStart
    newFilter[appdateIndex].b = appDateEnd

    newFilter[favoriteIndex].a = favoriteIsChecked

    newFilter[fitratingIndex].a = jobFitRating1
    newFilter[fitratingIndex].b = jobFitRating2

    newFilter[responsedateIndex].a = responseDateStart
    newFilter[responsedateIndex].b = responseDateEnd

    newFilter[interviewdateIndex].a = interviewDateStart
    newFilter[interviewdateIndex].b = interviewDateEnd

    newFilter[offeramountIndex].a = offerAmount1
    newFilter[offeramountIndex].b = offerAmount2

    setFilters(newFilter)
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-filter-get?user_id=${user_id}&filters=${JSON.stringify(newFilter)}`)
    .then(response => response.json())
    .then(data =>{
      if(data.length > 0){
        
        setJobApps(data)
      }
      console.log(data);
      
    })
    
  }
  /*
  const handleFilterApply = () => {
    const column = categories[index].column;
    const sortby = categories[index].sortby;
    const jobAppIds = jobApps.map(app => app.job_app_id)
    
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-sort-category-get?user_id=${user_id}&column=${column}&sortby=${sortby}&jobAppIds=${JSON.stringify(jobAppIds)}`)
    .then(response => response.json())
    .then(data =>{
      if(data.length > 0){
        let cat = Array.from(categories)
        cat[index].sortby === 0 ? cat[index].sortby = 1 : cat[index].sortby = 0;
        setCategories(cat)
        setJobApps(data)
      }
      console.log(data);
      
    })
    
  } 
  */
  const handleAppStatus = (e) => {
    const value = e.target.value;
    const statusIndex = applicationStatusOptions.findIndex(obj => obj.value === value)
    const column = applicationStatusOptions[statusIndex].column
    const a = applicationStatusOptions[statusIndex].a
    console.log(value);

    const newFilters = Array.from(filters)
    console.log(newFilters);
    const filtersIndex = newFilters.findIndex(obj => obj.filter === 'APPLICATION STATUS')
    
    console.log(filtersIndex);
    newFilters[filtersIndex].column = column
    newFilters[filtersIndex].a = a

    setFilters(newFilters)
  }

  useEffect(()=>{
    console.log(filters);
  },[filters])

  const handleShowHideFilters = () =>{ 
    setShowFilters(!showFilters)
  }

  useEffect(()=> {
    const filtersContainer = filtersContainerRef.current;
    showFilters ? filtersContainer.classList.remove('max-640px-hidden') : filtersContainer.classList.add('max-640px-hidden')
  },[showFilters])

  const handleApplicationDate = (range) =>{
    console.log(range);
   
  }
  const handleJobFitClear = () => {
    setJobFitRating1(null)
    setJobFitRating2(null)
  }
  const handleOffer1 = (e) => {
    const value = parseInt(e.target.value)
    console.log(parseInt(e.target.value));
    setOfferAmount1(value)
  }

  const handleOffer2 = (e) => {
    const value = parseInt(e.target.value)
    console.log(parseInt(e.target.value));
    setOfferAmount2(value)
  }

  useEffect(()=>{
    console.log(favoriteIsChecked
    );
  },[favoriteIsChecked])

  useEffect(()=>{
    console.log(appDateStart);
  },[appDateStart])

  useEffect(()=>{
    console.log(appDateEnd);
  },[appDateEnd])

  useEffect(()=>{
    console.log(offerAmount2);
    console.log(typeof offerAmount2);
  },[offerAmount2])


  

  
  return(
    <div className="flex max-640px-flex-column-w-full gap-x-4 gap-y-4 h-fit w-full ">
      <section className="FILTER-LOGO text-white flex">
        <div className="p-2 bg-striped bg-opacity-25 flex flex-col flex-1 justify-center  items-center gap-y-2">
          <Icon path={mdiFilterSettings} size={1.5} />
          <span className="text-xs font-bold">FILTERS</span>
        </div>
        <div></div>
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
        <div></div>
      </section>

      


      <div className="max-640px-hidden flex flex-wrap gap-x-4 gap-y-4 justify-between transition-all" ref={filtersContainerRef}>

        <section className="FILTER-SECTION-DATES h-fit min-w-fit flex-grow max-640px-flex-column-w-full flex items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">APP DATE</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 flex-grow text-white ' selected={appDateStart} onChange={(date) => setAppDateStart(date)} />
          </div>
          
          <div className="text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 flex-grow text-white ' selected={appDateEnd} onChange={(date) => setAppDateEnd(date)} />
          </div>
          
        </section>


        <section className="text-gray-300 h-fit p-1 bg-black bg-opacity-25 flex flex-grow gap-x-2 max-640px-flex-column-w-full">
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">APP STATUS</div>
          <div className="bg-black bg-opacity-25 flex flex-grow items-center h-6 max-640px-flex-column-w-full">
            <select className="bg-black bg-opacity-0 text-xs focus:outline-none h-6 max-640px-flex-column-w-full flex flex-grow items-center" onChange={handleAppStatus}>
              {
              applicationStatusOptions.map(status =>(
                <option className="bg-jet ">{status.value}</option>
              ))
              }
            </select>
            
            
          </div>
          
        </section>

        <section className="h-fit min-w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2">
          <div className=" bg-red-800 bg-opacity-25 w-fit h-6 text-white text-xs text-center p-1 min-w-fit max-640px-row">FAVORITE COMPANY</div>
          <div className=" text-xs h-6 flex flex-grow justify-center items-center pr-1 max-640px-flex-column-w-full w-full">
            <input className='bg-black bg-opacity-0 text-xs focus:outline-none h-6 flex items-center black-check' name='company_favorite' 
            type='checkbox' placeholder='...' checked={favoriteIsChecked} onChange={(e) => setFavoriteIsChecked(e.target.checked)}/>
          </div>
          
        </section>

        <section className="h-fit flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2 max-640px-flex-column-w-full">
          <div className=" bg-red-800 bg-opacity-25 h-6 text-white text-xs text-center p-1 w-fit max-640px-flex-column-w-full">FIT RATING</div>
          <div className="flex flex-grow gap-x-4">

          
            <div className="w-fit flex-grow text-md flex justify-center">
              <Rating
              className=' text-gray-400 flex justify-between'
              initialRating={jobFitRating1}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value)=>setJobFitRating1(value)}
              />
            </div>
            <div className="text-white">-</div>
            <div className="w-fit text-md flex-grow flex justify-center">

            
              <Rating
              className=' text-gray-400 flex justify-between'
              initialRating={jobFitRating2}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value)=>setJobFitRating2(value)}
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
            selected={responseDateStart} onChange={(date) => setResponseDateStart(date)} />
          </div>
          
          <div className=" text-center  text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white flex-grow' 
            selected={responseDateEnd} onChange={(date) => setResponseDateEnd(date)} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1
         bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">INTERVIEW DATE</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
             selected={interviewDateStart} onChange={(date) => setInterviewDateStart(date)} />
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
             selected={interviewDateEnd} onChange={(date) => setInterviewDateEnd(date)} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-640px-flex-column-w-full flex flex-grow items-center p-1
         bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-640px-flex-column-w-full h-6 text-white text-xs text-center p-1">OFFER AMOUNT</div>
          
          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs">
            <input className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white '
             type='number' value={offerAmount1} onChange={handleOffer1}/>
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-640px-flex-column-w-full flex items-center h-6 text-xs ">
            <input className='bg-black bg-opacity-25 w-full max-640px-flex-column-w-full h-6 text-white'
             type='number' value={offerAmount2} onChange={handleOffer2} />
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
            text-white font-bold p-1 hover:bg-opacity-50 transition-all items-center'>
              CLEAR
            </button>
          </div>
          
        </section>
    </div>
  )
}

export default TrackerFilter