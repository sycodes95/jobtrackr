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
    <div className="flex items-center flex-grow p-2 bg-black bg-opacity-25 rounded-lg shadow-md OVERALL-STATS gap-x-2 gap-y-2 ">
      <div className="flex items-center justify-between flex-grow w-full p-2 font-bold text-gray-300 bg-black rounded-lg gap-x-2 bg-opacity-30 text-md">
        <div className="">
          TOTAL APPS
        </div>
        <div>
          {data.all}
        </div>
      </div>

      <div className="flex items-center justify-between flex-grow w-full p-2 font-bold text-gray-500 bg-black rounded-lg gap-x-2 bg-opacity-30 text-md">
        
        
        <div className="flex items-center gap-x-2">
          <Icon path={mdiEmailFastOutline} size={0.8} />
          RESPONSES
        </div>
        <div>
          {data.responses}
        </div>
      </div>

      <div className="flex items-center justify-between flex-grow w-full p-2 font-bold bg-black rounded-lg text-steel-blue gap-x-2 bg-opacity-30 text-md">
        <div className="flex items-center gap-x-2">
          <Icon path={mdiAccountVoice} size={0.8} />
          INTERVIEWS
        </div>
        <div>
          {data.interviews}
        </div>
      </div>

      <div className="flex items-center justify-between flex-grow w-full p-2 font-bold text-yellow-600 bg-black rounded-lg gap-x-2 bg-opacity-30 text-md">
        <div className="flex items-center gap-x-2">
          <Icon path={mdiCurrencyUsd} size={0.8} />
          OFFERS
        </div>
        <div>
          {data.offers}
        </div>
      </div>

      <div className="flex items-center justify-between flex-grow w-full p-2 font-bold text-red-700 bg-black rounded-lg gap-x-2 bg-opacity-30 text-md">
        
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