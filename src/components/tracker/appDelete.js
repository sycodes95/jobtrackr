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
    <div className='flex flex-col w-64 '>
      <section className="min-w-fit h-8 text-center text-sm font-bold bg-red-800   text-white
      flex justify-center relative pl-4 pr-4">
        <div className="min-w-fit flex items-center text-white">CONFIRM DELETE</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close className='text-lg h-full w-8 hover:text-red-500 transition-all duration-300 text-center '>
            X
          </Dialog.Close>
        </div>
      </section>
        
      <section className='p-2 w-full font-black-outline bg-black text-white flex flex-col justify-center flex-wrap
      items-center break-word overflow-ellipsis text-sm'>
        <div className='break-word p-1 w-full text-center text-white text-xl mb-4 font-black-outline'>
          {jobApp.company_name.toUpperCase()}
        </div>
        <div className='break-word bg-black bg-opacity-30 w-full text-center grid grid-cols-2'>
          <button className='w-full text-white hover:text-red-800  border border-red-800 hover:bg-red-800 
          hover:bg-opacity-25 p-2
          transition-all flex justify-center' onClick={fetchDeleteJobApp}>
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
          <Dialog.Close className='w-full text-gray-600 hover:text-gray-300  p-2
          transition-all flex justify-center'>
            Cancel
          </Dialog.Close>
          
        </div>
      </section>
    </div>
  )
}

export default AppDelete;
