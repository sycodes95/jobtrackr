

import Icon from '@mdi/react';

import TrackerTable from './trackerTable';
import * as Dialog from '@radix-ui/react-dialog';
import AddJob from './addJob';

import { mdiRadar, mdiPlusThick, mdiCircleSlice8 } from '@mdi/js';
import { useEffect, useState } from 'react';

function Tracker () {
  const [user_id, set_user_id] = useState(null)

  const [jobApps, setJobApps] = useState(null)

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

  const handleOverlayClick = (event) => {
    event.preventDefault();
  };
  return(
    <Dialog.Root>
    <div className="flex justify-center p-16 w-full">
      <div className="TRACKER-CONTAINER  h-full text-black max-w-screen-2xl flex flex-col items-center justify-center">

        <section className='TRACKER-BANNER h-24 w-96 bg-black bg-opacity-30 flex items-center p-2 mb-12'>
          <Icon className='text-red-800' path={mdiRadar} size={2} />
          <div className='text-4xl font-bold'>TRACK</div>
        </section>

        <section className='w-full flex justify-between items-center gap-x-2 p-2 bg-black bg-opacity-30'>

          <div className='h-12 w-fit'>
            <Dialog.Trigger className='h-full'>
            <button className='h-full w-48 text-xs bg-red-800 bg-opacity-50 hover:bg-opacity-70 transition-all
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
          <div className='w-full h-full bg-black bg-opacity-25'>
            <div className='h-full text-sm text-gray-400 flex justify-center items-center font-bold 
            w-fit ml-2'>
              FILTER
            </div>

          </div>
          <div className='h-12 w-fit flex items-end'>
            <input className='bg-black bg-opacity-25 text-white text-sm h-6 w-48
            ' type='text' placeholder='Search...'/>
          </div>
          
        </section>
        <section className='flex justify-end w-full p-2'>
          <div className='flex gap-x-4 COLOR-TIPS'>
            <span className='flex items-center text-white text-xs gap-x-1'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> AWAITING RESPONSE
            </span>
            <span className='flex items-center text-steel-blue text-xs gap-x-1'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> INTERVIEW STAGE
            </span>
            <span className='flex items-center text-yellow-500 text-xs gap-x-1'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> OFFER RECEIVED
            </span>
            <span className='flex items-center text-red-500 text-xs gap-x-1'>
              <Icon className='' path={mdiCircleSlice8} size={0.8}/> REJECTED
            </span>
          </div>
        </section>
        <section className='TABLE-CONTAINER w-full gap-x-2 p-2 bg-black bg-opacity-30'>
          <TrackerTable jobAppsContext={{jobApps, setJobApps}}/>
        </section>
       
      </div>
      
    </div>
    </Dialog.Root>
  )
}
export default Tracker;