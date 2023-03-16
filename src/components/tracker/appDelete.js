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
      console.log(data);
      setIsDeleted(true)
      setTimeout(() =>{
        window.location.href = '/tracker'
      },1000)
    })
  }
  return(
    <div className='flex flex-col w-64 border-2 border-black'>
      <section className="min-w-fit h-8 text-center text-sm font-bold bg-black bg-opacity-50  text-white
      flex justify-center relative pl-4 pr-4">
        <div className="min-w-fit flex items-center">CONFIRM DELETE</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close className='text-lg h-full w-8 hover:text-white transition-all duration-300 text-center '>
              X
          </Dialog.Close>
        </div>
      </section>
        
      <section className='p-2 w-full font-black-outline bg-striped text-white flex flex-col justify-center flex-wrap
      items-center break-word overflow-ellipsis text-sm'>
        <div className='break-word p-1 w-full text-center text-yellow-600 text-xl mb-4 font-black-outline'>
          {jobApp.company_name.toUpperCase()}
        </div>
        <div className='break-word bg-black bg-opacity-30 w-full text-center grid grid-cols-2'>
          <button className='w-full text-red-700 hover:text-red-400 bg-red-600 bg-opacity-5 p-2
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
          <Dialog.Close className='w-full text-gray-600 hover:text-gray-300 bg-white bg-opacity-5 p-2
          transition-all flex justify-center'>
            Cancel
          </Dialog.Close>
          
        </div>
      </section>
    </div>
  )
}

export default AppDelete;
