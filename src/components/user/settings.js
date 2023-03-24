
import Icon from '@mdi/react';
import { mdiHammerWrench } from '@mdi/js';


function Settings () {
  return (
    <div className="flex justify-center p-8 w-full h-full">
      <div className="h-full w-full max-w-7xl text-red-800 flex  gap-x-2 gap-y-2 items-center 
     p-2 bg-black bg-opacity-25 flex-grow justify-between">
        <Icon path={mdiHammerWrench} size={1} />
        <span>UNDER CONSTRUCTION</span>
        <Icon path={mdiHammerWrench} size={1} />

      </div>
       
    </div>
  )
}

export default Settings;