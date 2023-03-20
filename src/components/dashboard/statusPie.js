
import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label, Legend } from 'recharts';
import { useSearch } from 'rsuite/esm/Picker';

function StatusPie ({jobApps}) {
  /*
  ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-gray-300'}
  ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
  ${obj.offer_amount && 'text-yellow-500'}
  ${obj.rejected && 'text-red-500'}
  ${obj.rejected && 'strike'} 
  */
  const [animationEnd, setAnimationEnd] = useState(false)
  const [data, setData] = useState([
    { name: 'AWAITING RESPONSE', value: 0 , color: 'rgba(255, 0, 0, 0.2)'},
    { name: 'INTERVIEW STAGE', value: 0 , color: 'rgba(255, 255, 255, 0.2)'},
    { name: 'OFFER RECEIVED', value: 0 , color: 'rgba(0, 255, 0, 0.2)'},
    { name: 'REJECTED', value: 0 , color: 'rgba(0, 0, 255, 0.2)'},
  ])
  
  const getStatusData = () => {
    
    const dataSet = {
      'AWAITING RESPONSE': 0,
      'INTERVIEW STAGE': 0,
      'OFFER RECEIVED': 0,
      'REJECTED': 0,
    }
    
    jobApps.forEach(app =>{
      app.rejected && dataSet['REJECTED']++
      app.offer_amount && dataSet['OFFER RECEIVED']++
      app.interview_date && !app.offer_amount && !app.rejected && dataSet['INTERVIEW STAGE']++
      !app.interview_date && !app.rejected && !app.offer_amount && dataSet['AWAITING RESPONSE']++
    })

    const updatedData = Object.entries(dataSet)
    .map(([name, value]) => ({
      name,
      value,
    }))
    //.filter(entry => entry.value > 0)
    setData(updatedData)
    console.log(updatedData);
  }
  
  const COLORS = ['rgba(255, 255, 255, 0.5)', 'rgba(43, 65, 98, 0.5)', 'rgba(255, 186, 8, 0.5)', 'rgba(208, 0, 0, 0.5)'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    if(percent === 0) return null
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  useEffect(()=>{
    jobApps && getStatusData()
  },[jobApps])
  return (
   
    <div className='bg-striped'>
      <div className="h-12 flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        JOB APP STATUS PIE
      </div>
      {
      jobApps &&
      <PieChart className='text-sm' width={260} height={260}>
        <Pie
          
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          stroke='none'
          animationDuration={600}
          onAnimationEnd={()=>setAnimationEnd(true)}
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          
        </Pie>
        
        <Legend animationId="chartAnimation"/>
        
        
      </PieChart>
      }
      
    </div>
   
    
      
  )
}

export default StatusPie;