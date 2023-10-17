

import Icon from '@mdi/react';

import TrackerTable from './trackerTable';
import * as Dialog from '@radix-ui/react-dialog';
import AddJob from './addJob';

import { mdiRadar, mdiPlusThick, mdiCircleSlice8, mdiArrowLeftDropCircle, mdiArrowRightDropCircle } from '@mdi/js';
import { useEffect, useState } from 'react';

import AppFilter from './trackerFilter';
import TrackerFilter from './trackerFilter';
import useDebounce from "../hooks/useDebounce";

import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

import companyNameMockArray from '../mockData/companyNameMockArray';
import jobPositionsMockArray from '../mockData/jobPositionsMockArray';
import { mockComponent } from 'react-dom/test-utils';

import { mdiMagnify } from '@mdi/js';

function Tracker () {
  const navigate = useNavigate()

  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)

  const [search, setSearch] = useState(null)

  const debouncedSearch = useDebounce(search, 500)

  const [filters, setFilters] = useState(null)

  const [sortColumn, setSortColumn] = useState(null)

  const [sortOrder, setSortOrder] = useState(null)

  const [fetchLoading, setFetchLoading] = useState(false)

  const [jobAppsIsEmpty, setJobAppsIsEmpty] = useState(false)

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 50,
    totalCount: null,
    showingA: 1,
    showingB: 50
  })

  const [categories, setCategories] = useState([
    {category: 'APP DATE', column: 'job_app_date', sortOrder: 1},
    {category: 'FAV', column: 'company_favorite', sortOrder: 1},
    {category: 'COMPANY', column: 'company_name', sortOrder: 1},
    {category: 'COMPANY WEBSITE', column: 'company_website', sortOrder: 1},
    {category: 'APPLICATION METHOD', column: 'job_app_method', sortOrder: 1},
    {category: 'SOURCE WEBSITE', column: 'job_source_website', sortOrder: 1},
    {category: 'POSITION', column: 'job_position', sortOrder: 1},
    {category: 'FIT RATING', column: 'job_fit_rating', sortOrder: 1},
    {category: 'LOCATION', column: 'job_location', sortOrder: 1},
    {category: 'RESPONSE DATE', column: 'response_date', sortOrder: 1},
    {category: 'INTERVIEW DATE', column: 'interview_date', sortOrder: 1},
    {category: 'REJECTED', column: 'rejected', sortOrder: 1},
    {category: 'OFFER AMOUNT', column: 'offer_amount', sortOrder: 1},
  ])

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

  }, [])    
 
  const getJobApps = () => {
    setFetchLoading(true)
    let fetchQueries = `?user_id=${user_id}`

    debouncedSearch && (fetchQueries += `&search=${debouncedSearch}`)
    filters && (fetchQueries += `&filters=${JSON.stringify(filters)}`)
    paginate.page && (fetchQueries += `&page=${paginate.page}`)
    paginate.pageSize && (fetchQueries += `&pageSize=${paginate.pageSize}`)
    sortColumn && (fetchQueries += `&sortColumn=${sortColumn}`)
    sortOrder && (fetchQueries += `&sortOrder=${sortOrder}`)

    fetch(`${process.env.REACT_APP_API_HOST}/job-app-get${fetchQueries}`)
    .then(res => res.json())
    .then(data => {
      setFetchLoading(false)
      if(data.rows.length > 0){
        setJobAppsIsEmpty(false)
        setJobApps(data.rows)
        setPaginate({...paginate, totalCount: data.totalCount})
      } else {
        setJobApps(null)
      } 
      if(data.totalCount === 0){
        setJobAppsIsEmpty(true)
      }
      
    })
  } 

  const handleAddMockData = () => {
    
    const randomCompanyIndex = () => Math.floor(Math.random() * 500)
    let company_name = companyNameMockArray[randomCompanyIndex()]
    if(jobApps && jobApps.length > 0) {
      while(jobApps.some(app => app.company_name === company_name)){
        randomCompanyIndex()
        company_name = companyNameMockArray[randomCompanyIndex()];
      }
    }
    let company_website = `${company_name.replace(/[\s,'\.]+/g, '')}.com`
    
    const companyFavoriteOdds = Math.floor(Math.random() * 100)

    let company_favorite = companyFavoriteOdds > 75 ? true : false;

    const start = new Date('2023-01-01');
    const end = new Date('2023-04-01');
    const job_app_date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    const randomNumFrom5 = () => Math.floor(Math.random() * 5);
    const jobAppMethodChoices = ['Company Website', 'Job Board Website', 'Recruiter', 'Referral', 'Other']
    const job_app_method = jobAppMethodChoices[randomNumFrom5()]

    let jobSourceWebsiteChoices = ['indeed.com', 'linkedin.com', 'glassdoor.com', 'monster.com', 'careerbuilder.com']
    let job_source_website = null
    if(job_app_method === 'Job Board Website'){
      job_source_website = jobSourceWebsiteChoices[randomNumFrom5()]
    } 

    const randomJobPostion = () => Math.floor(Math.random() * 50);
    const job_position = jobPositionsMockArray[randomJobPostion()]

    const randomJobFitRating = () => Math.floor(Math.random() * 5) + 1;
    const job_fit_rating = randomJobFitRating()

    const randomJobLocation = () => Math.floor(Math.random() * 4);
    const jobLocationTypeChoices = ['On Site', 'Remote', 'Hybrid', 'Both']
    const job_location = jobLocationTypeChoices[randomJobLocation()]

    let response_date = null
    const randomDaysAdded = () => (Math.random() * 20)
    let responseOdds = Math.floor(Math.random() * 100);
    if(responseOdds > 50) {
      response_date = new Date(job_app_date.getTime())
      response_date.setDate(response_date.getDate() + randomDaysAdded())
    }

    let interview_date = null
    
    let interviewOdds = Math.floor(Math.random() * 100);
    if(interviewOdds > 70 && response_date) {
      interview_date = new Date(response_date.getTime())
      interview_date.setDate(interview_date.getDate() + randomDaysAdded())
    }

    let offer_amount = null
    const offerOdds = Math.floor(Math.random() * 100);
    const randomOfferAmount = () => Math.floor(Math.random() * (300_000 - 22_000 + 1) + 22_000);
    if(offerOdds > 70 && interview_date) {
      offer_amount = randomOfferAmount()
    }

    let rejected = null
    const rejectedChoices = ['From Response', 'After Interview']
    if(response_date && !interview_date) rejected = rejectedChoices[0]
    if(interview_date && !offer_amount) rejected = rejectedChoices[1]
    
    const contact_person_name = 'Mock Data Name'
    const contact_person_email = 'Mock Data Email'
    const contact_person_phone = '111-222-3333'
    const notes = 'Mock Data Notes'

    const mockData = {
      company_name: company_name,
      company_website: company_website,
      company_favorite: company_favorite,
      job_app_date: job_app_date,
      job_app_method: job_app_method,
      job_source_website: job_source_website,
      job_position: job_position,
      job_fit_rating: job_fit_rating,
      job_location: job_location,
      response_date: response_date,
      interview_date: interview_date, 
      offer_amount : offer_amount, 
      rejected: rejected, 
      contact_person_name: contact_person_name, 
      contact_person_email: contact_person_email, 
      contact_person_phone: contact_person_phone,
      notes: notes, 
      user_id: user_id
    }
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-post`, {
      method:'POST',
      body: JSON.stringify(mockData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      const job_app_id = data.job_app_id
      if(job_app_id){
        navigate(0)
      } 
      if(data.name === 'error'){
        if(data.code === '23505'){
          
        }
      }
    })

  }

  const handleOverlayClick = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) =>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    user_id && getJobApps()
  },[user_id])

  useEffect(()=>{
    setPaginate({
      page: 1,
      pageSize: 50,
      totalCount: null,
      showingA: 1,
      showingB: 50
    })
    user_id && getJobApps()
  },[filters, debouncedSearch])
  
  useEffect(()=>{
    user_id && getJobApps();
  },[paginate.page, sortColumn, sortOrder])

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    
  },[paginate.page])

  return(
    <Dialog.Root>
      <div className="flex justify-center w-full h-full p-8 TRACKER-CONTAINER">
        <div className="flex flex-col items-center justify-center h-full p-2 text-black TRACKER-SUB-CONTAINER max-w-screen-2xl">

          
          <section className='w-full mb-4 gap-x-2'>
            <TrackerFilter 
            jobAppsContext={{jobApps, setJobApps}} 
            user_id={user_id} 
            paginateContext={{paginate, setPaginate}}
            filtersContext={{filters, setFilters}}
            
            />
          </section>

          <section className='grid w-full mb-4 bg-opacity-25 TOOL-BAR gap-x-2 gap-y-2'>
            <div className='ADD-JOB-BUTTON-CONTAINER w-fit'>
              <Dialog.Trigger className='w-full h-full'>
              <div className='grid items-center w-48 h-full grid-cols-3 text-xs text-white transition-all bg-white border border-white rounded-lg ADD-JOB-BUTTON bg-opacity-10 hover:bg-opacity-25'>
              
                <div className='flex justify-center'> <Icon path={mdiPlusThick} size={1}/></div>
                <div>ADD JOB</div>
              </div>
              </Dialog.Trigger>
              <Dialog.Portal>
              
                <Dialog.Overlay className="DialogOverlay"/>
                <Dialog.Overlay/>
                <Dialog.Content className="DialogContent" onInteractOutside={handleOverlayClick}>
                  <AddJob user_id={user_id} />
                </Dialog.Content>
              
              </Dialog.Portal>
            </div>
            
            
            <div className='grid justify-center gap-x-4 COLOR-TIPS'>
              <span className='flex items-center text-xs text-white gap-x-1 whitespace-nowrap'>
                <Icon className='' path={mdiCircleSlice8} size={0.8}/> AWAITING RESPONSE
              </span>
              <span className='flex items-center text-xs text-steel-blue gap-x-1 whitespace-nowrap'>
                <Icon className='' path={mdiCircleSlice8} size={0.8}/> INTERVIEW STAGE
              </span>
              <span className='flex items-center text-xs text-yellow-500 gap-x-1 whitespace-nowrap'>
                <Icon className='' path={mdiCircleSlice8} size={0.8}/> OFFER RECEIVED
              </span>
              <span className='flex items-center text-xs text-red-500 gap-x-1 whitespace-nowrap'>
                <Icon className='' path={mdiCircleSlice8} size={0.8}/> REJECTED
              </span>
            </div>
            
            <div className='flex items-center w-full rounded-lg SEARCH-BAR'>
              <div className='flex items-center pl-2 pr-2 bg-black bg-opacity-50 rounded-lg SEARCH-BAR-CONTAINER '>
                <Icon className='text-white text-opacity-25' path={mdiMagnify} size={0.8} />
                <input className='w-48 h-8 p-1 text-sm text-white transition-all bg-black bg-opacity-0 SEARCH-BAR-INPUT' type='text' placeholder='Search Any...' onChange={handleSearchChange}/>
              </div>
              
            </div>
            
          </section>
          
          <section className='flex-grow w-full rounded-md TABLE-CONTAINER gap-x-2'>
            <TrackerTable 
            jobAppsContext={{jobApps, setJobApps}} 
            user_id={user_id} 
            paginateContext={{paginate, setPaginate}}
            filtersContext={{filters, setFilters}}
            searchTextContext={{search, setSearch}}
            sortColumnContext={{sortColumn, setSortColumn}}
            sortByContext={{sortOrder, setSortOrder}}
            categoriesContext={{categories, setCategories}}
            fetchLoadingContext={{fetchLoading, setFetchLoading}}
            jobAppsIsEmptyContext={{jobAppsIsEmpty, setJobAppsIsEmpty}}
            />
            <div className='flex justify-between w-full mt-2 select-none PaginateContainer'>
              <div className='flex items-center text-xs text-white'>
                {
                jobApps && jobApps.length > 0 
                ? <span>
                  Showing {paginate.showingA} to {paginate.showingB > paginate.totalCount
                  ? paginate.totalCount : paginate.showingB} of {paginate.totalCount}
                  </span>
                : <span>Showing 0 to 0 of 0</span>
                }
              </div>
              <ReactPaginate
                className='flex items-center p-1 text-sm font-bold text-gray-300 rounded-sm w-fit gap-x-2 '
                previousLabel={<Icon path={mdiArrowLeftDropCircle} size={1} />}
                nextLabel={<Icon path={mdiArrowRightDropCircle} size={1} />}
                breakLabel={'...'}
                pageCount={Math.ceil(paginate.totalCount / paginate.pageSize)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => {
                  setPaginate({ ...paginate, 
                    page: selected + 1, 
                    showingA: (selected * paginate.pageSize) + 1, 
                    showingB: (selected * paginate.pageSize) + paginate.pageSize > paginate.totalCount
                    ? paginate.totalCount
                    : (selected * paginate.pageSize) + paginate.pageSize, 
                  });
                }}
                containerClassName=''
                previousClassName={`hover:text-gray-500 hover:text-opacity-50 transition-all
                ${!jobApps && 'pointer-events-none text-gray-500 text-opacity-30'}
                ${paginate.page === 1 && 'pointer-events-none text-gray-500 text-opacity-30'}
                `}
                nextClassName={`
                hover:text-gray-500 hover:text-opacity-50 transition-all
                ${!jobApps && 'pointer-events-none text-gray-500 text-opacity-30'}
                ${(paginate.page * paginate.pageSize) >= paginate.totalCount && 'pointer-events-none text-gray-500 text-opacity-30'}
                `}
                activeClassName={`PaginatePageActive bg-white text-black bg-opacity-30 p-1 flex justify-center w-6 flex
                ${!jobApps && 'hidden'} pointer-events-none`}
                breakClassName='PaginateBreak p-1'
                pageClassName={`PaginatePage hover:bg-white hover:bg-opacity-10 w-6 h-6 text-center transition-all flex items-center ${!jobApps && 'hidden'}`}
                pageLinkClassName='flex-grow'
                forcePage={paginate.page - 1}
              />
            </div>
             
          </section>

          <section className='w-full'>
            
            <button className='p-1 text-xs text-white transition-all bg-green-800 border border-green-500 rounded-lg bg-opacity-10 w-44 hover:bg-opacity-25' onClick={handleAddMockData}>ADD MOCK DATA ROW</button>
            
            
          </section>

        </div>
        
      </div>
    </Dialog.Root>
  )
}
export default Tracker;