import Rating from 'react-rating';
import { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    console.log(data);
  },[data])
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])

  return (
    <div className='JOB-FIT-RATING-BAR h-full w-full relative flex flex-col items-center border-4 border-black border-opacity-30'>
      <div className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        PERFORMANCE BY FIT RATING
      </div>
      <div className='h-64 w-11/12 flex justify-center items-center relative'>
      <ResponsiveBar
        data={data}
        keys={[
          'AWAITING RESPONSE',
          'INTERVIEW STAGE',
          'REJECTED',
          'OFFER RECEIVED',
        ]}
        indexBy="name"
        margin={{ top: 20, right: 140, bottom: 50, left: 40 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
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
                  1.6
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
       
      </div>
      
      
    </div>
  )
}

export default JobFitBarChart;