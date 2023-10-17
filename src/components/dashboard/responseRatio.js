import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Icon from '@mdi/react';
import { mdiEmailFastOutline, mdiHelpCircle } from '@mdi/js';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


function ResponseRatio (props) {
  const jobApps = props.jobApps

  const [responseRatio, setResponseRatio] = useState(0)

  const getRatio = () => {
    if(jobApps.length === 0) return setResponseRatio(0)
    const totalApps = jobApps.length
    const respondedApps = jobApps.filter(app => app.response_date).length
    const ratio = Math.round((respondedApps / totalApps) * 100)
    setResponseRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center flex-grow border rounded-lg shadow-md border-slate-800 gap-x-2">
      <div className="flex items-center justify-center flex-grow w-full p-2 text-sm text-gray-700 bg-black bg-opacity-25 rounded-lg gap-x-2">
        
        <span className="text-gray-700 text-opacity-50">APPLICATION TO RESPONSE RATIO</span>
        {
        /*
        <a className='flex items-center justify-center text-gray-700 my-anchor-element' 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Ratio of applications that received a response to all applications.">
          <Icon className='transition-all hover:cursor-pointer hover:text-slate-300' path={mdiHelpCircle} size={0.7} />
        </a>
        <Tooltip anchorSelect=".my-anchor-element" />
        */
        }
        
      </div>
      <div className="flex items-center p-2 w-28 h-28">
        <CircularProgressbar
        value={responseRatio}
        text={`${responseRatio}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "rgba(0,0,0,0.4)",
          textColor: "#fff",
          pathColor: "rgba(255,255,255,0.4)",
          trailColor: "transparent"
        })}
        />
      </div>
    </div>
  )
}

export default ResponseRatio;