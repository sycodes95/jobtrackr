import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Icon from '@mdi/react';
import { mdiEmailFastOutline, mdiHelpCircle } from '@mdi/js';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


function RejectionRatio (props) {

  const jobApps = props.jobApps

  const [rejectionRatio, setRejectionRatio] = useState(0)

  const getRatio = () => {
    if(jobApps.length === 0) return setRejectionRatio(0)
    const interviewedApps = jobApps.filter(app => app.interview_date).length
    const rejectedApps = jobApps.filter(app => app.rejected && app.interview_date).length
    const ratio = Math.round((rejectedApps / interviewedApps) * 100)
    if(!ratio) return setRejectionRatio(0)
    setRejectionRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center gap-x-2 bg-striped flex-grow">
      <div className="text-white text-sm flex flex-grow justify-center items-center gap-x-2 bg-black bg-opacity-25 p-2 
      w-full">
        <span className="">INTERVIEW TO REJECTION RATIO</span>
        
      </div>
      <div className="w-28 h-28 flex items-center p-2">
        <CircularProgressbar
        value={rejectionRatio}
        text={`${rejectionRatio}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "rgba(0,0,0,0.4)",
          textColor: "#fff",
          pathColor: "rgba(255,0,0,0.4)",
          trailColor: "transparent"
        })}
        />
      </div>
    </div>
  )
}

export default RejectionRatio;