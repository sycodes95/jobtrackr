

import Icon from '@mdi/react';

import TrackerTable from './trackerTable';
import * as Dialog from '@radix-ui/react-dialog';
import AddJob from './addJob';

import { mdiRadar, mdiPlusThick, mdiCircleSlice8 } from '@mdi/js';
import { useEffect, useState } from 'react';

import AppFilter from './trackerFilter';
import TrackerFilter from './trackerFilter';
import useDebounce from "../hooks/useDebounce";

function Tracker () {
  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)

  
  const [searchText, setSearchText] = useState(null)
  const debouncedSearch = useDebounce(searchText, 500)
  

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

  useEffect(()=>{
    user_id && getAllJobApps()
  },[user_id])

  const getAllJobApps = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-all-get?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      if(data.length > 0) setJobApps(data)
    })
  }

  const getSearchedJobApps = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-search-get?user_id=${user_id}&searchText=${debouncedSearch}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.length > 0) setJobApps(data)
    })
  }

  const handleOverlayClick = (event) => {
    event.preventDefault();
  };

  useEffect(()=>{
    if(debouncedSearch){
      getSearchedJobApps()
    }
    if(!debouncedSearch){
      getAllJobApps()
    }
  },[debouncedSearch])
  return(
    <Dialog.Root>
    <div className="flex justify-center p-8 w-full h-full ">
      <div className="TRACKER-CONTAINER  h-full text-black max-w-screen-2xl flex flex-col items-center justify-center">

        
        <section className='w-full gap-x-2 p-2 bg-black bg-opacity-25 mb-4'>
          <TrackerFilter jobAppsContext={{jobApps, setJobApps}} user_id={user_id}/>
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
              transition-all' type='text' placeholder='Search Any...' onChange={(e)=> setSearchText(e.target.value)}/>
            </div>
            
          </div>
          
        </section>

       
        
        <section className='TABLE-CONTAINER flex-grow w-full gap-x-2 p-2 bg-black bg-opacity-30'>
          <TrackerTable jobAppsContext={{jobApps, setJobApps}} user_id={user_id}/>
        </section>
       
      </div>
      
    </div>
    </Dialog.Root>
  )
}
export default Tracker;