
import { useEffect, useState } from 'react';

import { useSearch } from 'rsuite/esm/Picker';
import { ResponsivePie } from '@nivo/pie'
function StatusPie ({jobApps}) {
  
  const [data, setData] = useState([
    { id: 'AWAITING RESPONSE', value: 0 , color: 'rgba(156, 175, 183)'},
    { id: 'INTERVIEW STAGE', value: 0 , color: 'rgb(3, 206, 164)'},
    { id: 'OFFER RECEIVED', value: 0 , color: 'rgb(247, 219, 167)'},
    { id: 'REJECTED', value: 0 , color: 'rgb(251, 77, 61)'},
  ])
  
  const getStatusData = () => {
    let dataSet = Array.from(data)
    dataSet.forEach(data => data.value = 0)
    
    if(jobApps.length === 0) return setData(dataSet)
    
    jobApps.forEach(app =>{
      app.rejected && dataSet.forEach(data => data.id === 'REJECTED' && data.value++)
      app.offer_amount && dataSet.forEach(data => data.id === 'OFFER RECEIVED' && data.value++)
      app.interview_date && !app.offer_amount && !app.rejected && dataSet.forEach(data => data.id === 'INTERVIEW STAGE' && data.value++)
      !app.interview_date && !app.rejected && !app.offer_amount && dataSet.forEach(data => data.id === 'AWAITING RESPONSE' && data.value++)
      
    })
    setData(dataSet)
  }
  
  useEffect(()=>{
    jobApps && getStatusData()
  },[jobApps])
  return (
   
    <div className='flex flex-col items-center flex-grow col-span-1 border rounded-lg JOB-APP-STATUS-PIE border-slate-800 bg-black-transparent-gradient'>
      <section className="flex items-center justify-center w-full h-12 font-bold text-white bg-black bg-opacity-25 rounded-lg text-md">
        APPLICATION STATUS PIE
      </section>
      
      <section className='flex items-center justify-center w-11/12 h-64 overflow-visible '>
        <ResponsivePie
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        innerRadius={0.5}
        padAngle={0.5}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#FFFFFF"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                'darker',
                3
              ]
          ]
        }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'rgb(251, 77, 61)',
            color: 'rgba(255, 255, 255, 0.4)',
            rotation: -45,
            lineWidth: 9,
            spacing: 10
          },
          {
            id: 'dots',
            type: 'patternDots',
            background: 'rgb(247, 219, 167)',
            color: 'rgba(255, 255, 255, 0.8)',
            rotation: -45,
            lineWidth: 8,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'REJECTED'
            },
            id: 'lines'
          },
          {
            match: {
              id: 'OFFER RECEIVED'
            },
            id: 'dots'
          },
        ]}
        colors={data.map(d => d.color)}
        theme={{
          labels: {
            text: {
              fontSize: 16,
            },
          },
          legends: {
            text: {
              fontSize: 10
            }
          }
        }}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -40,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
          }
        ]}
      />
      </section>
      
    </div>
      
  )
}

export default StatusPie;