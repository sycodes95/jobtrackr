import { useCallback, useEffect, useState } from "react"
import { ResponsiveLine } from "@nivo/line"


function AppMethodLine (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState([
    {id: 'Company Website', color: 'white', data: [
      {x: 'APPLIED', y: 0}, {x: 'RESPONSE', y: 0}, {x: 'INTERVIEW', y: 0}, {x: 'OFFER', y: 0}
    ]},
    {id: 'Job Board Website', color: 'white', data: [
      {x: 'APPLIED', y: 0}, {x: 'RESPONSE', y: 0}, {x: 'INTERVIEW', y: 0}, {x: 'OFFER', y: 0}
    ]},
    {id: 'Recruiter', color: 'white', data: [
      {x: 'APPLIED', y: 0}, {x: 'RESPONSE', y: 0}, {x: 'INTERVIEW', y: 0}, {x: 'OFFER', y: 0}
    ]},
    {id: 'Referral', color: 'white', data: [
      {x: 'APPLIED', y: 0}, {x: 'RESPONSE', y: 0}, {x: 'INTERVIEW', y: 0}, {x: 'OFFER', y: 0}
    ]},
    {id: 'Other', color: 'white', data: [
      {x: 'APPLIED', y: 0}, {x: 'RESPONSE', y: 0}, {x: 'INTERVIEW', y: 0}, {x: 'OFFER', y: 0}
    ]},
  ])

  const getDataAndFormat = () => {
    
    const newData = JSON.parse(JSON.stringify(data))
    if(jobApps.length === 0) {
      newData.forEach(set => {
        set.data.forEach(obj => obj.y = 0)
      })
      return setData(newData)
    }
    
    newData.forEach(set => {
      const filteredByMethod = jobApps.filter(app => app.job_app_method === set.id)
      const applied = filteredByMethod.length
      const response = filteredByMethod.filter(app => app.response_date).length
      const interview = filteredByMethod.filter(app => app.interview_date).length
      const offer = filteredByMethod.filter(app => app.offer_amount).length
      
      const newSet = set.data.forEach(obj => {
        if(obj.x === 'APPLIED') obj.y = applied;
        if(obj.x === 'OFFER') obj.y = offer;
        if(obj.x === 'INTERVIEW') obj.y = interview;
        if(obj.x === 'RESPONSE') obj.y = response;
      })
      set = newSet
    })
    
    setData(newData) 

  }
  
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])
  return(
    <div className='relative flex flex-col items-center w-full h-full col-span-1 border rounded-lg shadow-md JOB-APP-STATUS-PIE border-slate-800 bg-black-transparent-gradient'>
      <section className="flex items-center justify-center w-full h-12 font-bold text-white bg-black bg-opacity-25 rounded-lg text-md">
        <span>PERFORMANCE BY APPLICATION METHOD</span>
      </section>
      <section className='flex items-center justify-center w-11/12 h-64'>
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 120, bottom: 50, left: 25 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: '0',
            max: 'auto',
            stacked: false,
            reverse: false
          }}
          colors={{ scheme: 'set3' }}
          yFormat=" >-.2f"
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            
            legendOffset: -40,
            legendPosition: 'middle',
            format: e => Math.floor(e) === e && e,
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          theme={{
            textColor: 'gray',
            fontSize: 10,
            grid: {
              stroke: 'rgba(255,255,255,0.2)'
            }
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
       
      </section>
      
      
    </div>
  )
}
export default AppMethodLine;