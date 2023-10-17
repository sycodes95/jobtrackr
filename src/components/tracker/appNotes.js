import * as Dialog from '@radix-ui/react-dialog';

function AppNotes (props) {
  const jobApp = props.jobApp
  return(
    <div className='flex flex-col w-64 rounded-lg bg-gray'>
      <section className="relative flex justify-center h-8 pl-4 pr-4 text-sm font-bold text-center text-gray-700 bg-black bg-opacity-25 rounded-lg min-w-fit">
        <div className="flex items-center min-w-fit">NOTES</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close>
            <button className='h-full pr-2 text-lg transition-all duration-300 hover:text-gray-700'>X</button>
          </Dialog.Close>
        </div>
      </section>
        
      <section className='flex flex-col flex-wrap items-center justify-center w-full p-2 text-sm text-gray-700 break-word overflow-ellipsis'>
        <div className='w-full p-1 mb-4 text-gray-700 break-word font-black-outline'>
          <p className='text-md'> Company Name: {jobApp.company_name.toUpperCase()}</p>
        </div>
        <div className='w-full p-2 text-center border border-gray-300 break-word'>{jobApp.notes ? jobApp.notes : 'N/A'}</div>
      </section>
    </div>
  )
}

export default AppNotes;