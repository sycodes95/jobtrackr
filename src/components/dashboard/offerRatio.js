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
    if(jobApps.length === 0) return setResponseRatio(0)
    const interviewedApps = jobApps.filter(app => app.interview_date).length
    const offeredApps = jobApps.filter(app => app.offer_amount).length
    const ratio = Math.round((offeredApps / interviewedApps) * 100)
    if(!ratio) return setResponseRatio(0)
    setResponseRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center gap-x-2 border border-black border-opacity-25 flex-grow">
      <div className="text-white text-sm flex flex-grow justify-center items-center gap-x-2 bg-black bg-opacity-25 p-2 
      w-full">
        <span className="text-white text-opacity-50">INTERVIEW TO OFFER RATIO</span>
        
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
          pathColor: "rgba(255,255,0,0.4)",
          trailColor: "transparent"
        })}
        />
      </div>
    </div>
  )
}

export default OfferRatio;