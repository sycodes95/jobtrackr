
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Icon from '@mdi/react';
import { mdiEmailFastOutline, mdiHelpCircle } from '@mdi/js';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function InterviewRatio (props) {
  const jobApps = props.jobApps

  const [interviewRatio, setInterviewRatio] = useState(0)

  const getRatio = () => {
    if(jobApps.length === 0) return setInterviewRatio(0)
    const respondedApps = jobApps.filter(app => app.response_date).length
    const interviewedApps = jobApps.filter(app => app.interview_date).length
    const ratio = Math.round((interviewedApps / respondedApps) * 100)
    setInterviewRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center gap-x-2 bg-striped flex-grow">
      <div className="text-white text-sm flex justify-between items-center gap-x-2 bg-black bg-opacity-25 p-2
      w-full">
        <Icon path={mdiEmailFastOutline} size={0.8} />
        <span className="">RES TO INTERVIEW RATIO</span>
        <a className='my-anchor-element flex justify-center items-center text-white' 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Percentage of interviews compared to total amount of responses">
          <Icon className='hover:cursor-pointer hover:text-slate-300  transition-all' path={mdiHelpCircle} size={0.7} />
        </a>
        <Tooltip anchorSelect=".my-anchor-element" />
      </div>
      <div className="w-28 h-28 flex items-center p-2">
        <CircularProgressbar
        value={interviewRatio}
        text={`${interviewRatio}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "rgba(0,0,0,0.4)",
          textColor: "#fff",
          pathColor: "rgba(0,125,255,0.4)",
          trailColor: "transparent"
        })}
        />
      </div>
    </div>
  )

}

export default InterviewRatio;