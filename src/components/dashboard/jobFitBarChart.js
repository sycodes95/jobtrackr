
/*
import Rating from 'react-rating';
import { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from "@nivo/line"


function JobFitBarChart (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState([
    {id: '*', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null},
    ]},
    {id: '**', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: '***', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: '****', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
    {id: '*****', color: 'white', data: [
      {x: 'APPLIED', y: null}, {x: 'RESPONSE', y: null}, {x: 'INTERVIEW', y: null}, {x: 'OFFER', y: null}
    ]},
  ])
  
  const [data, setData] = useState([
    {
      id: '*',
    },
    {
      id: '**',
    },
    {
      id: '***',
    },
    {
      id: '****',
    },
    {
      id: '*****',
    }
  ])
  
  const getDataAndFormat = () => {
    
    const newData = JSON.parse(JSON.stringify(data))

    newData.forEach(set => {
      const filteredByMethod = jobApps.filter(app => app.job_fit_rating === set.id.length)
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
    setData(newData) 

  }
  useEffect(()=>{ 
  },[data])
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])

  return (
    <div className='JOB-FIT-RATING-BAR h-full w-full flex flex-col items-center
     border-4 border-black border-opacity-30'>
      <section className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        PERFORMANCE BY FIT RATING
      </section>

      <section className='h-64 w-11/12 top-0 left-0 flex justify-center items-center'>
      <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 60, bottom: 50, left: 50 }}
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

export default JobFitBarChart;
*/

import Rating from 'react-rating';
import { useEffect, useState } from 'react';

import { ResponsiveBar } from '@nivo/bar';

function JobFitBarChart (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState([
    {
      name: '*'
    },
    {
      name: '**',
    },
    {
      name: '***',
    },
    {
      name: '****',
    },
    {
      name: '*****',
    }
  ])

  const getDataAndFormat = () => {
    let dataCopy = Array.from(data).map(app => {
      return {
        name: app.name,
        'AWAITING RESPONSE': 0,
        'INTERVIEW STAGE': 0,
        'REJECTED': 0,
        'OFFER RECEIVED': 0,
      }
    })
    
    if(jobApps.length === 0) return setData(dataCopy)
    const hasRating = jobApps
    .filter(app => app.job_fit_rating)
    
    hasRating.forEach(app => {
      const rating = app.job_fit_rating
      
      !app.interview_date && !app.rejected && !app.offer_amount && dataCopy[rating - 1]['AWAITING RESPONSE']++
      app.interview_date && !app.offer_amount && !app.rejected && dataCopy[rating - 1]['INTERVIEW STAGE']++
      app.rejected && dataCopy[rating - 1]['REJECTED']++  
      app.offer_amount && dataCopy[rating - 1]['OFFER RECEIVED']++ 
       
    })
    
    setData(dataCopy)

  }
  useEffect(()=>{ 
    
  },[data])
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])

  return (
    <div className='JOB-FIT-RATING-BAR h-full w-full flex flex-col items-center col-span-1
     border-4 border-black border-opacity-30'>
      <section className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        STATUS BY FIT RATING
      </section>

      <section className='h-64 w-11/12 top-0 left-0 flex justify-center items-center'>
        <ResponsiveBar
          data={data}
          keys={[
            'AWAITING RESPONSE',
            'INTERVIEW STAGE',
            'REJECTED',
            'OFFER RECEIVED',
          ]}
          indexBy="name"
          margin={{ top: 20, right: 140, bottom: 50, left: 25 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'set3' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.2)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.2)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'OFFER RECEIVED'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'REJECTED'
              },
              id: 'lines'
            },
            
          ]}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                    'darker',
                    2
                  ]
              ]
          }}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'FIT RATING',
            legendPosition: 'middle',
            legendOffset: 32,
              
          }}
          axisLeft={{
            format: e => Math.floor(e) === e && e,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'APPS',
            legendPosition: 'middle',
            legendOffset: -30,
              
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                    'darker',
                    10
                  ]
              ]
          }}
          theme={{
            textColor: 'gray',
            fontSize: 10,
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 110,
              translateY: 0,
              itemsSpacing: 1,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 15,
              effects: [
                {
                  on: 'hover',
                  style: {
                      itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
          
        />
      
      </section>
      
      
    </div>
  )
}

export default JobFitBarChart;
