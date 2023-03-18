

import Icon from '@mdi/react';

import TrackerTable from './trackerTable';
import * as Dialog from '@radix-ui/react-dialog';
import AddJob from './addJob';

import { mdiRadar, mdiPlusThick, mdiCircleSlice8, mdiArrowLeftDropCircle, mdiArrowRightDropCircle } from '@mdi/js';
import { useEffect, useState } from 'react';

import AppFilter from './trackerFilter';
import TrackerFilter from './trackerFilter';
import useDebounce from "../hooks/useDebounce";
import Pagination from '../pagination/pagination';
import ReactPaginate from 'react-paginate';




function Tracker () {
  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)

  const [search, setSearch] = useState(null)

  const debouncedSearch = useDebounce(search, 500)

  const [filters, setFilters] = useState(null)

  const [sortColumn, setSortColumn] = useState(null)

  const [sortOrder, setSortOrder] = useState(null)

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 1,
    totalCount: null
  })

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('jobtrackr_token'))
    
    if(token) {
      fetch('http://localhost:5000/users/verify-token-get', {
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
      console.log(data);
      if(data.rows.length > 0){
        setJobApps(data.rows)
        setPaginate({...paginate, totalCount: data.totalCount})
      } else {
        setJobApps([])
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
    getJobApps()
  },[debouncedSearch])
  useEffect(()=>{
    
    getJobApps()
    
  },[filters])
  useEffect(()=>{
    getJobApps()
  },[paginate.page])
  

  return(
    <Dialog.Root>
    <div className="flex justify-center p-8 w-full h-full ">
      <div className="TRACKER-CONTAINER  h-full text-black max-w-screen-2xl flex flex-col items-center justify-center">

        
        <section className='w-full gap-x-2 p-2 bg-black bg-opacity-25 mb-4'>
          <TrackerFilter 
          jobAppsContext={{jobApps, setJobApps}} 
          user_id={user_id} 
          paginateContext={{paginate, setPaginate}}
          filtersContext={{filters, setFilters}}
          
          />
        </section>

        <section className='TOOL-BAR w-full grid gap-x-2 bg-opacity-25 gap-y-2 mb-4'>
          <div className='ADD-JOB-BUTTON-CONTAINER h-12 p-2 bg-black bg-opacity-25 w-fit'>
            <Dialog.Trigger className='h-full w-full'>
            <button className='ADD-JOB-BUTTON h-full w-48 text-xs bg-red-800 bg-opacity-50 hover:bg-opacity-70 transition-all
            grid grid-cols-3 items-center text-white'>
             
              <div className='flex justify-center'> <Icon path={mdiPlusThick} size={1}/></div>
              <div>ADD JOB</div>
            </button>
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
            <span className='flex items-center text-white text-xs gap-x-1 whitespace-nowrap'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> AWAITING RESPONSE
            </span>
            <span className='flex items-center text-steel-blue text-xs gap-x-1 whitespace-nowrap'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> INTERVIEW STAGE
            </span>
            <span className='flex items-center text-yellow-500 text-xs gap-x-1 whitespace-nowrap'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> OFFER RECEIVED
            </span>
            <span className='flex items-center text-red-500 text-xs gap-x-1 whitespace-nowrap'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> REJECTED
            </span>
          </div>
          
          <div className='SEARCH-BAR h-12 w-full flex items-center'>
            <div className='SEARCH-BAR-CONTAINER p-2 bg-black bg-opacity-25 '>
              <input className='SEARCH-BAR-INPUT bg-black bg-opacity-25  text-white text-sm h-8 w-48 p-1
              transition-all' type='text' placeholder='Search Any...' onChange={handleSearchChange}/>
            </div>
            
          </div>
          
        </section>

       
        
        <section className='TABLE-CONTAINER flex-grow w-full gap-x-2 p-2 bg-black bg-opacity-30'>
          <TrackerTable 
          jobAppsContext={{jobApps, setJobApps}} 
          user_id={user_id} 
          paginateContext={{paginate, setPaginate}}
          filtersContext={{filters, setFilters}}
          searchTextContext={{search, setSearch}}
          sortColumnContext={{sortColumn, setSortColumn}}
          sortByContext={{sortOrder, setSortOrder}}
          />
          <div className='PaginateContainer w-full flex justify-end mt-2 select-none'>
            <ReactPaginate
              className='bg-striped w-fit text-gray-300 flex items-center gap-x-2 text-sm font-bold p-1'
              previousLabel={<Icon path={mdiArrowLeftDropCircle} size={1} />}
              nextLabel={<Icon path={mdiArrowRightDropCircle} size={1} />}
              breakLabel={'...'}
              pageCount={Math.ceil(paginate.totalCount / paginate.pageSize)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={({ selected }) => {
                setPaginate({ ...paginate, page: selected + 1 });
              }}
              containerClassName=''
              previousClassName='hover:text-red-800 hover:text-opacity-50 transition-all'
              nextClassName='hover:text-red-800 hover:text-opacity-50 transition-all'
              activeClassName='PaginatePageActive bg-red-800 bg-opacity-30 p-1 flex justify-center rounded-full'
              breakClassName='PaginateBreak p-1'
              pageClassName='PaginatePage p-1'
              forcePage={paginate.page - 1}
            />
          </div>
          
        </section>

      </div>
      
    </div>
    </Dialog.Root>
  )
}
export default Tracker;