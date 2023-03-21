
import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label, Legend } from 'recharts';
import { useSearch } from 'rsuite/esm/Picker';
import { ResponsivePie } from '@nivo/pie'
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
    { id: 'AWAITING RESPONSE', value: 0 , color: 'rgba(255, 255, 255, 0.5)'},
    { id: 'INTERVIEW STAGE', value: 0 , color: 'rgba(43, 65, 98, 1)'},
    { id: 'OFFER RECEIVED', value: 0 , color: 'rgba(255, 186, 8, 1)'},
    { id: 'REJECTED', value: 0 , color: 'rgba(208, 0, 0, 0.8)'},
  ])
  
  const getStatusData = () => {
    let dataSet = Array.from(data)
    dataSet.forEach(data => data.value = 0)
     
    console.log(dataSet);
    jobApps.forEach(app =>{
      app.rejected && dataSet.forEach(data => data.id === 'REJECTED' && data.value++)
      app.offer_amount && dataSet.forEach(data => data.id === 'OFFER RECEIVED' && data.value++)
      app.interview_date && !app.offer_amount && !app.rejected && dataSet.forEach(data => data.id === 'INTERVIEW STAGE' && data.value++)
      !app.interview_date && !app.rejected && !app.offer_amount && dataSet.forEach(data => data.id === 'AWAITING RESPONSE' && data.value++)
      
    })
    console.log(dataSet);
    
    //.filter(entry => entry.value > 0)
    setData(dataSet)
    
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
   
    <div className='JOB-APP-STATUS-PIE bg-striped-alt flex-grow flex flex-col items-center col-span-2'>
      <div className="h-12 w-full flex justify-center text-md text-white items-center bg-black bg-opacity-25 font-bold">
        JOB APP STATUS PIE
      </div>
      {
      jobApps &&
      

      <div className='h-80 w-11/12 flex justify-center items-center overflow-visible'>
        <ResponsivePie
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        
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
        arc
        colors={{datum: 'data.color'}}
        theme={{
          labels: {
            text: {
              fontSize: 14, // Set the font size for arc labels
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
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
            }
        ]}
        
      />
      </div>
      
      }
      
    </div>
    
   
    
      
  )
}

export default StatusPie;