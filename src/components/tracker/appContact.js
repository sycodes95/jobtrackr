import * as Dialog from '@radix-ui/react-dialog';

import Icon from '@mdi/react';
import { mdiPhone, mdiEmail, mdiAccountCircle } from '@mdi/js';



function AppContact (props) {
  const jobApp = props.jobApp
  return(
    <div className='flex flex-col w-64 border-2 border-black'>
      <section className="min-w-fit h-8 text-center text-sm font-bold bg-black bg-opacity-50  text-white
      flex justify-center relative pl-4 pr-4">
        <div className="min-w-fit flex items-center">CONTACT</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close>
            <button className='text-lg h-full pr-2 hover:text-white transition-all duration-300'>X</button>
          </Dialog.Close>
        </div>
      </section>
        
      <section className='p-2 w-full bg-striped text-white flex flex-col justify-center flex-wrap break-word overflow-ellipsis
      text-sm'>
        <div className='break-word p-1 w-full text-center text-yellow-600 text-xl mb-4 font-black-outline'>
          {jobApp.company_name.toUpperCase()}
        </div>
        <div className='p-1 bg-black bg-opacity-25'>
          <div className='break-word p-1 flex gap-x-2'>
            <Icon path={mdiAccountCircle} size={0.8} />
            {jobApp.contact_person_name ? `${jobApp.contact_person_name.toUpperCase()}` :  'N/A'}
          </div>
          <div className='break-word p-1 flex gap-x-2'>
            <Icon path={mdiEmail} size={0.8} />
            {jobApp.contact_person_email ? `${jobApp.contact_person_email.toUpperCase()}` : 'N/A'}
          </div>
          <div className='break-word p-1 flex gap-x-2'>
            <Icon path={mdiPhone} size={0.8} />
            {jobApp.contact_person_phone ? `${jobApp.contact_person_phone}` : 'N/A'}
          
          </div>
          {
          /*
          <div className='break-word p-1'>
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