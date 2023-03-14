import * as Dialog from '@radix-ui/react-dialog';

function AppContact (props) {
  const jobApp = props.jobApp
  return(
    <div className='flex flex-col w-64'>
      <section className="min-w-fit h-8 text-center text-sm font-bold bg-gray-400 bg-opacity-50  text-black
      flex justify-center relative pl-4 pr-4">
        <div className="min-w-fit flex items-center">CONTACT INFO</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close>
            <button className='text-lg h-full pr-2 hover:text-white transition-all duration-300'>X</button>
          </Dialog.Close>
        </div>
      </section>
        
      <section className='p-4 w-full bg-striped text-white flex flex-col justify-center flex-wrap break-word overflow-ellipsis
      text-sm'>
        <div className='break-word p-1  bg-slate-600 bg-opacity-30 w-full text-center mb-4 font-black-outline'>
          {jobApp.company_name}
        </div>
        <div className='p-1 bg-black bg-opacity-30'>
          <div className='break-word p-1'>{jobApp.contact_person_name ? `Name: ${jobApp.contact_person_name}` :  'Name: N/A'}</div>
          <div className='break-word p-1'>{jobApp.contact_person_email ? `Email: ${jobApp.contact_person_email}` : 'Email: N/A'}</div>
          <div className='break-word p-1'>{jobApp.contact_person_phone ? `Phone: ${jobApp.contact_person_phone}` : 'Phone: N/A'}</div>
        </div>
        
        
      </section>
    </div>
  )
}

export default AppContact;