
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
  //testing
  const getRatio = () => {
    if(jobApps.length === 0) return setInterviewRatio(0)

    const respondedApps = jobApps.filter(app => app.response_date).length
    const interviewedApps = jobApps.filter(app => app.interview_date).length
    const ratio = Math.round((interviewedApps / respondedApps) * 100)
    if(!ratio) return setInterviewRatio(0)
    setInterviewRatio(ratio)
  }

  useEffect(()=>{
    jobApps && getRatio()
  },[jobApps])
  return(
    <div className="flex flex-col items-center flex-grow rounded-lg shadow-md gap-x-2 ">
      <div className="flex items-center justify-center w-full p-2 text-sm text-white bg-black bg-opacity-25 rounded-lg gap-x-2">
        <span className="text-white text-opacity-50">RESPONSE TO INTERVIEW RATIO</span>
        
      </div>
      <div className="flex items-center p-2 w-28 h-28">
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