import { useEffect, useState } from "react"
import { useSearch } from "rsuite/esm/Picker"
import { ResponsiveLine } from "@nivo/line"


function AppMethodLine (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState([
    {id: 'Company Website', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: 'Job Board Website', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: 'Recruiter', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: 'Referral', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: 'Other', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
  ])

  const getDataAndFormat = () => {
    
    const newData = JSON.parse(JSON.stringify(data))

    newData.forEach(set => {
      const filteredByMethod = jobApps.filter(app => app.job_app_method === set.id)
      const applied = filteredByMethod.length
      const response = filteredByMethod.filter(app => app.response_date).length
      const interview = filteredByMethod.filter(app => app.interview_date).length
      const offer = filteredByMethod.filter(app => app.offer_amount).length
      const rejected = filteredByMethod.filter(app => app.rejected).length
      const newSet = set.data.forEach(obj => {
        if(obj.x === 'APPLIED') obj.y = applied;
        if(obj.x === 'OFFER') obj.y = offer;
        if(obj.x === 'INTERVIEW') obj.y = interview;
        if(obj.x === 'RESPONSE') obj.y = response;
      })
      set = newSet
    })
    console.log(newData);
    setData(newData) 

  }
  
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])
  return(
    <div className='JOB-APP-STATUS-PIE col-span-2 h-full w-full relative flex flex-col items-center border-4 border-black border-opacity-30'>
      <section className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        PERFORMANCE BY APPLICATION METHOD
      </section>
      <section className='h-64 w-11/12 flex justify-center items-center'>
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 120, bottom: 50, left: 50 }}
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
            legend: 'APPLICATION METHODS',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'APPS',
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