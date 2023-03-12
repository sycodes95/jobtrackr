import { useEffect, useState } from "react"
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
    {filter: 'APPLICATION STATUS', column: null,  a: null},
    {filter: 'APPLICATION DATE', column: 'job_app_date',  a: null, b:null},
    {filter: 'FAVORITE', column: 'company_favorite',  a: null},
    {filter: 'FIT RATING', column: 'job_fit_rating', a: null},
    {filter: 'RESPONSE DATE', column: 'response_date', a:null, b:null},
    {filter: 'INTERVIEW DATE', column: 'interview_date', a:null, b:null},
    {filter: 'OFFER AMOUNT', column: 'offer_amount', a: null, b:null},
  ])

  const applicationStatusOptions = [
    null,
    'AWAITING RESPONSE', //RESPONSE, INTERVIEW, REJECTED, OFFER MUST BE NULL
    'INTERVIEW STAGE', // INTERVIEW NOT NULL, REJECTED NULL, OFFER NULL
    'OFFER RECEIVED',//OFFER NOT NULL
    'REJECTED' //REJECTED NOT NULL
  ]

  const applicationDateOptions = [
    'LAST WEEK',
    'LAST MONTH', 
    'LAST 3 MONTHS', 
    'LAST 6 MONTHS',
    'LAST YEAR' 
  ]

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
    <div className="flex max-545px gap-x-4 gap-y-4 h-fit w-full ">
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
        >
          
          <div className="text-xs"> SHOW FILTERS / HIDE </div>
          
        </button>
        <div></div>
      </section>

      


      <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between">

        <section className="FILTER-SECTION-DATES h-fit min-w-fit flex-grow max-545px flex items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-545px h-6 text-white text-xs text-center p-1">APP DATE</div>
          
          <div className="w-full max-545px flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 flex-grow text-white ' selected={appDateStart} onChange={(date) => setAppDateStart(date)} />
          </div>
          
          <div className="text-center text-white h-6">-</div>

          <div className="w-full max-545px flex items-center h-6 text-xs flex-grow">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 flex-grow text-white ' selected={appDateEnd} onChange={(date) => setAppDateEnd(date)} />
          </div>
          
        </section>


        <section className="text-gray-300 h-fit p-1 bg-black bg-opacity-25 flex flex-grow gap-x-2 max-545px">
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-545px h-6 text-white text-xs text-center p-1">APP STATUS</div>
          <div className="bg-black bg-opacity-25 flex flex-grow items-center h-6 max-545px">
            <select className="bg-black bg-opacity-0 text-xs focus:outline-none h-6 max-545px flex flex-grow items-center">
              {
              applicationStatusOptions.map(status =>(
                <option className="bg-jet ">{status}</option>
              ))
              }
            </select>
            
            
          </div>
          
        </section>

        <section className="h-fit min-w-fit max-545px flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2">
          <div className=" bg-red-800 bg-opacity-25 w-fit h-6 text-white text-xs text-center p-1 min-w-fit max-545px-row">FAVORITE COMPANY</div>
          <div className=" text-xs h-6 flex flex-grow justify-center items-center pr-1 max-545px w-full">
            <input className='bg-black bg-opacity-0 text-xs focus:outline-none h-6 flex items-center black-check' name='company_favorite' 
            type='checkbox' placeholder='...' checked={favoriteIsChecked} onChange={(e) => setFavoriteIsChecked(e.target.checked)}/>
          </div>
          
        </section>

        <section className="h-fit flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2 max-545px">
          <div className=" bg-red-800 bg-opacity-25 h-6 text-white text-xs text-center p-1 w-fit max-545px">FIT RATING</div>
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
          <div className="flex items-center max-545px">
            <button className="bg-steel-blue bg-opacity-50 h-6 text-white text-xs text-center p-1 w-fit max-545px-row hover:bg-opacity-70
             transition-all" onClick={handleJobFitClear}>
              CLEAR
            </button>
          </div>
        </section>
        
        <section className="FILTER-SECTION-DATES h-fit w-fit max-545px flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-545px h-6 text-white text-xs text-center p-1 ">RESPONSE DATE</div>
          
          <div className="w-full max-545px flex items-center h-6 text-xs">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 text-white flex-grow' selected={responseDateStart} onChange={(date) => setResponseDateStart(date)} />
          </div>
          
          <div className=" text-center  text-white h-6">-</div>

          <div className="w-full max-545px flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 text-white flex-grow' selected={responseDateEnd} onChange={(date) => setResponseDateStart(date)} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-545px flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-545px h-6 text-white text-xs text-center p-1">INTERVIEW DATE</div>
          
          <div className="w-full max-545px flex items-center h-6 text-xs">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 text-white ' selected={responseDateStart} onChange={(date) => setResponseDateStart(date)} />
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-545px flex items-center h-6 text-xs ">
            <DatePicker className='bg-black bg-opacity-25 w-full max-545px h-6 text-white ' selected={responseDateEnd} onChange={(date) => setResponseDateStart(date)} />
          </div>
          
        </section>

        <section className="FILTER-SECTION-DATES h-fit w-fit max-545px flex flex-grow items-center p-1 bg-black bg-opacity-25 gap-x-2 gap-y-2">
          
          <div className=" bg-red-800 bg-opacity-25 min-w-fit max-545px h-6 text-white text-xs text-center p-1">OFFER AMOUNT</div>
          
          <div className="w-full max-545px flex items-center h-6 text-xs">
            <input className='bg-black bg-opacity-25 w-full max-545px h-6 text-white ' type='number' value={offerAmount1} onChange={handleOffer1}/>
          </div>
          
          <div className=" text-center text-white h-6">-</div>

          <div className="w-full max-545px flex items-center h-6 text-xs ">
            <input className='bg-black bg-opacity-25 w-full max-545px h-6 text-white' type='number' value={offerAmount2} onChange={handleOffer2} />
          </div>
          
        </section>

        
      </div>
    </div>
  )
}

export default TrackerFilter