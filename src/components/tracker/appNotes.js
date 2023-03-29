import * as Dialog from '@radix-ui/react-dialog';

function AppNotes (props) {
  const jobApp = props.jobApp
  return(
    <div className='flex flex-col w-64'>
      <section className="min-w-fit h-8 text-center text-sm font-bold bg-slate-800 bg-opacity-25  text-slate-500
      flex justify-center relative pl-4 pr-4">
        <div className="min-w-fit flex items-center">NOTES</div>
        <div className="absolute right-0 flex items-center h-full">
          <Dialog.Close>
            <button className='text-lg h-full pr-2 hover:text-white transition-all duration-300'>X</button>
          </Dialog.Close>
        </div>
      </section>
        
      <section className='p-2 w-full font-black-outline bg-black bg-opacity-25 text-white flex flex-col justify-center flex-wrap
      items-center break-word overflow-ellipsis text-sm'>
        <div className='break-word p-1 w-full text-center text-white text-xl mb-4 font-black-outline'>
          {jobApp.company_name.toUpperCase()}
        </div>
        <div className='break-word bg-black bg-opacity-30 p-2 w-full text-center'>{jobApp.notes ? jobApp.notes : 'N/A'}</div>
      </section>
    </div>
  )
}

export default AppNotes;