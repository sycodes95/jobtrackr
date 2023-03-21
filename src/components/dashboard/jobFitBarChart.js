import Rating from 'react-rating';
import { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ResponsiveBar } from '@nivo/bar';

function JobFitBarChart (props) {
  const jobApps = props.jobApps
  const [data, setData] = useState([
    {
      name: '1 STAR',
    },
    {
      name: '2 STARS',
    },
    {
      name: '3 STARS',
    },
    {
      name: '4 STARS',
    },
    {
      name: '5 STARS',
    }
  ])

  const getDataAndFormat = () => {
    let dataCopy = Array.from(data).map(app => {
      return {
        name: app.name,
        applied: 0,
        interviews: 0,
        rejections: 0,
        offers: 0,
      }
    })
    console.log(dataCopy);
    const hasRating = jobApps
    .filter(app => app.job_fit_rating)

    hasRating.forEach(app => {
      const rating = app.job_fit_rating

      if(app.job_app_date) dataCopy[rating - 1].applied++
      if(app.interview_date) dataCopy[rating - 1].interviews++  
      if(app.rejected) dataCopy[rating - 1].rejections++  
      if(app.offer_amount) dataCopy[rating - 1].offers++ 
      
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
    <div className='JOB-FIT-RATING-BAR h-full w-full relative bg-striped'>
      <div className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        PERFORMANCE BY JOB FIT RATING
      </div>
      <div className='VIEWHEIGHT-700px w-full flex justify-center items-center relative'>
      <ResponsiveContainer width="95%" height={260}>
        <BarChart height={260} width={260}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" enableBackground={true} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applied" fill="rgba(255, 255, 255, 0.5)" />
          <Bar dataKey="interviews" fill="rgba(43, 65, 98, 1)" />
          <Bar dataKey="rejections" fill="rgba(208, 0, 0, 0.8)" />
          <Bar dataKey="offers" fill="rgba(255, 186, 8, 1)" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      
      
    </div>
  )
}

export default JobFitBarChart;