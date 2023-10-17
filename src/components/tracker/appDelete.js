import * as Dialog from '@radix-ui/react-dialog';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircle } from '@mdi/js';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';


function AppDelete (props) {
  const user_id = props.user_id
  const jobApp = props.jobApp;
  const job_app_id = jobApp.job_app_id

  const [isDeleted, setIsDeleted] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)

  const fetchDeleteJobApp = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-delete?user_id=${user_id}&job_app_id=${job_app_id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      
      setIsDeleted(true)
      setTimeout(() =>{
        window.location.href = '/tracker'
      },1000)
    })
  }
  return(
    <div className='flex flex-col w-64 gap-4 border rounded-lg shadow-md bg-gray border-slate-800'>
      <section className="relative flex justify-center h-8 pl-4 pr-4 text-sm font-bold text-center text-gray-700 bg-black bg-opacity-25 rounded-lg min-w-fit">
        <div className="flex items-center text-gray-700 min-w-fit">CONFIRM DELETE</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close className='w-8 h-full text-lg text-center transition-all duration-300 hover:text-red-500 '>
            X
          </Dialog.Close>
        </div>
      </section>
        
      <section className='flex flex-col flex-wrap justify-center w-full gap-8 p-4 text-sm text-gray-700 break-word overflow-ellipsis'>
        <p>This will item be deleted permanently, are you sure? </p>
        <div className='w-full mb-4 text-sm text-gray-700 break-word'>
          <p className='flex gap-2'>Company Name : <p className='text-blue-400'>{jobApp.company_name.toUpperCase()}</p></p>
        </div>
        <div className='grid w-full grid-cols-2 gap-2 text-center '>
          <button className='flex justify-center w-full p-2 text-red-500 transition-all bg-red-500 border border-red-800 rounded-lg bg-opacity-10 hover:text-red-800 hover:bg-red-800 hover:bg-opacity-40' onClick={fetchDeleteJobApp}>
            {isDeleted && <Icon path={mdiCheckboxMarkedCircle} size={0.8} />}
            {!isDeleted && 'Delete'}
            {fetchLoading && !isDeleted &&
            <Oval
            height="20"
            width="20"
            radius="9"
            color="#000000"
            secondaryColor="#808080"
            ariaLabel="loading"
            strokeWidth="8" 
            wrapperStyle={{}}
            visible={true}
            />
            }
            
          </button>
          <Dialog.Close className='flex justify-center w-full p-2 text-gray-700 transition-all bg-black bg-opacity-25 rounded-lg hover:text-gray-300'>
            Cancel
          </Dialog.Close>
          
        </div>
      </section>
    </div>
  )
}

export default AppDelete;
