import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Icon from '@mdi/react';
import { mdiEmailFastOutline, mdiHelpCircle } from '@mdi/js';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function OfferRatio (props) {
  const jobApps = props.jobApps

  const [responseRatio, setResponseRatio] = useState(0)

  const getRatio = () => {
    const totalApps = jobApps.length
    const respondedApps = jobApps.filter(app => app.response_date).length
    const ratio = Math.round((respondedApps / totalApps) * 100)
    setResponseRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center gap-x-2 bg-striped flex-grow">
      <div className="text-white text-sm flex flex-grow justify-between items-center gap-x-2 bg-black bg-opacity-25 p-2 
      w-full">
        <Icon path={mdiEmailFastOutline} size={0.8} />
        <span className="">APP TO RESPONSE RATIO</span>
        <a className='my-anchor-element flex justify-center items-center text-white' 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Ratio of applications that received a response to all applications.">
          <Icon className='hover:cursor-pointer hover:text-slate-300  transition-all' path={mdiHelpCircle} size={0.7} />
        </a>
        <Tooltip anchorSelect=".my-anchor-element" />
      </div>
      <div className="w-28 h-28 flex items-center p-2">
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

export default OfferRatio;