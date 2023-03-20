import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Icon from '@mdi/react';
import { mdiEmailFastOutline, mdiHelpCircle, mdiSkullOutline, mdiAccountVoice, mdiCurrencyUsd } from '@mdi/js';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


function OverallStats (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState({
    all: 0,
    responses: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
  })

  const getData = () => {
    const all = jobApps.length
    const responses = jobApps.filter(app => app.response_date).length
    const interviews = jobApps.filter(app => app.interview_date).length
    const offers = jobApps.filter(app => app.offer_amount).length
    const rejections = jobApps.filter(app => app.rejected).length
    
    setData({
      ...data,
      all: all,
      responses: responses,
      interviews: interviews,
      offers: offers,
      rejections: rejections
    })
  }

  useEffect(()=>{
    jobApps && getData()
  },[jobApps])
  return(
    <div className="OVERALL-STATS flex  items-center gap-x-2 gap-y-2 bg-striped flex-grow ">
      <div className="text-gray-300 flex flex-grow items-center justify-between  gap-x-2 bg-black bg-opacity-25 p-2 
      w-full text-md font-bold">
        <div className="">
          TOTAL APPS
        </div>
        <div>
          {data.all}
        </div>
      </div>

      <div className="text-gray-500 flex flex-grow items-center justify-between  gap-x-2 bg-black bg-opacity-25 p-2 
      w-full text-md font-bold">
        
        
        <div className="flex items-center gap-x-2">
          <Icon path={mdiEmailFastOutline} size={0.8} />
          RESPONSES
        </div>
        <div>
          {data.responses}
        </div>
      </div>

      <div className="text-steel-blue flex flex-grow items-center justify-between  gap-x-2 bg-black bg-opacity-25 p-2 
      w-full text-md font-bold">
        <div className="flex items-center gap-x-2">
          <Icon path={mdiAccountVoice} size={0.8} />
          INTERVIEWS
        </div>
        <div>
          {data.interviews}
        </div>
      </div>

      <div className="text-yellow-600 flex flex-grow items-center justify-between  gap-x-2 bg-black bg-opacity-25 p-2 
      w-full text-md font-bold">
        <div className="flex items-center gap-x-2">
          <Icon path={mdiCurrencyUsd} size={0.8} />
          OFFERS
        </div>
        <div>
          {data.offers}
        </div>
      </div>

      <div className="text-red-700 flex flex-grow items-center justify-between  gap-x-2 bg-black bg-opacity-25 p-2 
      w-full text-md font-bold">
        
        <div className="flex items-center gap-x-2">
          <Icon path={mdiSkullOutline} size={0.8} />
          REJECTIONS
        </div>
        <div className="">
          {data.rejections}
        </div>
        
      </div>
      
    </div>
  )
}

export default OverallStats;