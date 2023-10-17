import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";


function RejectionStageBar({jobApps}) {
  
  const [data, setData] = useState([
    {
      name:'From Response', value: 0
    },
    {
      name:'After Interview', value: 0
    },
    {
      name:'After Offer', value: 0
    },
    {
      name:'Other', value: 0
    },
  ])

  const getDataAndFormat = () => {
    if(jobApps.length === 0) return setData([
      {
        name:'From Response', value: 0
      },
      {
        name:'After Interview', value: 0
      },
      {
        name:'After Offer', value: 0
      },
      {
        name:'Other', value: 0
      },
    ])
    
    let dataCopy = data.map(set => ({ name: set.name, value: 0 }));

    const rejectedApps = jobApps.filter(app => app.rejected)

    rejectedApps.forEach(app => {
      dataCopy.forEach(data =>{
        if(app.rejected === data.name){
          data['value']++
        }
      })
    })
    
    setData(dataCopy)
    
  }
  
  useEffect(()=>{
    jobApps && getDataAndFormat()
  },[jobApps])
  
  return (
    <div className='flex flex-col items-center w-full h-full col-span-2 border rounded-lg shadow-md border-slate-800 bg-black-transparent-gradient'>
      <section className="flex items-center justify-center w-full h-12 font-bold text-gray-700 bg-black bg-opacity-25 rounded-lg text-md ">
        REJECTIONS BY STAGE
      </section>

      <section className='top-0 left-0 flex items-center justify-center w-11/12 h-64'>
        <ResponsiveBar
          data={data}
          keys={[
            'value',
          ]}
          indexBy="name"
          margin={{ top: 20, right: 25, bottom: 50, left: 25 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'pastel1' }}
          layout="horizontal"
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: e => Math.floor(e) === e && e,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
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
          label={_label => _label.data.name}
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
          
          
        />
      
      </section>

    </div>
  )
}

export default RejectionStageBar;