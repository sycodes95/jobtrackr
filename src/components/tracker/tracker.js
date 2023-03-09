

import Icon from '@mdi/react';
import { mdiRadar, mdiPlusThick } from '@mdi/js';






function Tracker () {
  const categories = [
    'FAVORITE', 'COMPANY', 'DETAILS', 'RESPONSE', 'INTERVIEW', 'OFFER', 'CONTACT',
    'NOTES'

  ]


  return(
    <div className="flex justify-center p-16 w-full">
      <div className="h-ful w-full text-black max-w-5xl gap-y-12 flex flex-col items-center justify-center">

        <section className='TRACKER-BANNER h-24 w-96 bg-black bg-opacity-30 flex items-center p-2'>
          <Icon className='text-red-800' path={mdiRadar} size={2} />
          <div className='text-4xl font-bold'>TRACK</div>
        </section>

        <section className='w-full flex justify-between items-center gap-x-2 p-2 bg-black bg-opacity-30'>

          <div className='h-12 w-fit'>
            <button className='h-full w-48 text-xs bg-steel-blue bg-opacity-25 hover:bg-opacity-50 transition-all
            grid grid-cols-3 items-center text-black'>
             
              <div className='flex justify-center'> <Icon path={mdiPlusThick} size={1}/></div>
              <div>ADD JOB</div>
            </button>
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

        <section className='w-full flex justify-between items-center gap-x-2 p-2 bg-black bg-opacity-30 overflow-x-auto'>
          <div className='grid grid-flow-col overflow-x-auto'>
            <div className='text-xs text-gray-300 p-2 border-r-2 border-red-800 border-opacity-30'>EDIT</div>
            {
            categories.map((cat, index) => (
            <div className='text-xs text-gray-300 p-2 border-r-2 border-dotted border-red-800 border-opacity-30'>{cat}</div>
            ))
            }
          </div>
        </section>
       
      </div>
      
    </div>
  )
}
export default Tracker;