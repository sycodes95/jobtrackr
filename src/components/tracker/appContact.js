import * as Dialog from '@radix-ui/react-dialog';

import Icon from '@mdi/react';
import { mdiPhone, mdiEmail, mdiAccountCircle } from '@mdi/js';



function AppContact (props) {
  const jobApp = props.jobApp
  return(
    <div className='flex flex-col w-64 rounded-lg bg-gray'>
      <section className="relative flex justify-center h-8 pl-4 pr-4 text-sm font-bold text-center text-white bg-black bg-opacity-25 rounded-lg min-w-fit">
        <div className="flex items-center min-w-fit">CONTACT</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close>
            <button className='h-full pr-2 text-lg transition-all duration-300 hover:text-white'>X</button>
          </Dialog.Close>
        </div>
      </section>
        
      <section className='flex flex-col flex-wrap justify-center w-full p-2 text-sm text-white rounded-lg break-word overflow-ellipsis'>
        <div className='w-full p-1 mb-4 text-xl text-center text-white break-word font-black-outline'>
          {jobApp.company_name.toUpperCase()}
        </div>
        <div className='p-1 bg-black bg-opacity-25 rounded-lg'>
          <div className='flex p-1 break-word gap-x-2'>
            <Icon path={mdiAccountCircle} size={0.8} />
            {jobApp.contact_person_name ? `${jobApp.contact_person_name.toUpperCase()}` :  'N/A'}
          </div>
          <div className='flex p-1 break-word gap-x-2'>
            <Icon path={mdiEmail} size={0.8} />
            {jobApp.contact_person_email ? `${jobApp.contact_person_email.toUpperCase()}` : 'N/A'}
          </div>
          <div className='flex p-1 break-word gap-x-2'>
            <Icon path={mdiPhone} size={0.8} />
            {jobApp.contact_person_phone ? `${jobApp.contact_person_phone}` : 'N/A'}
          
          </div>
          {
          /*
          <div className='p-1 break-word'>
          {jobApp.contact_person_phone ? `Phone: ${jobApp.contact_person_phone}` : 'Phone: N/A'}
          <Icon path={mdiPhone} size={1} />
          </div>
          */
          }
          
        </div>
        
        
      </section>
    </div>
  )
}

export default AppContact;