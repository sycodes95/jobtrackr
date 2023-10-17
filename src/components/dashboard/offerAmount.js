import { useEffect, useState } from "react"
import { useSearch } from "rsuite/esm/Picker"
import Icon from '@mdi/react';
import { mdiArrowRightThin } from '@mdi/js';



function OfferAmount (props) {
  const jobApps = props.jobApps

  const [data, setData] = useState({
    highest: 0,
    lowest: 0,
    average: 0,

  })

  const getData = () => {
    if(jobApps.length === 0) return setData({
      highest: 0,
      lowest: 0,
      average: 0,
    })
    const offers = jobApps
    .filter(app => app.offer_amount)
    .map(app => { return app.offer_amount })
    
    if(!offers.length) return setData({
      highest: 0,
      lowest: 0,
      average: 0,
    })
    
    const highest = offers.reduce((acc, cur) => {
      if(acc >= cur) return acc
      return cur
    })
    const lowest = offers.reduce((acc, cur) => {
      if(acc <= cur) return acc
      return cur
    })
    const average = Math.floor(offers.reduce((acc, cur) => { return acc + cur }) / offers.length)
    setData({
      highest: highest,
      lowest: lowest,
      average: average
    })
  }

  useEffect(()=>{
    jobApps && getData()
  },[jobApps])
  return(
    <div className="flex flex-grow p-2 text-gray-700 bg-black bg-opacity-25 border rounded-lg shadow-md gap-x-2 gap-y-2 max-width-900px-flex-col border-slate-800">
      <section className="flex items-center justify-center p-2 font-bold text-gray-700 bg-black bg-opacity-25 rounded-lg text-md whitespace-nowrap">
        <div>
          OFFER RANGE $
        </div>
        
      </section>
      
      <section className="flex items-center justify-center w-full h-full gap-x-2 gap-y-2 max-width-900px-flex-col">
        
        <div className="flex items-center justify-center w-full h-full p-1 text-sm text-yellow-500 rounded-lg gap-x-4 bg-striped-alt">
          <span className="w-12 text-center">HIGHEST</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          <span>{data.highest}</span>
        </div>

        <div className="flex items-center justify-center w-full h-full p-1 text-sm text-red-600 rounded-lg gap-x-4 bg-striped-alt ">
          <span className="w-12 text-center">LOWEST</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          <span>{data.lowest}</span>
        </div>
        
        
        <div className="flex items-center justify-center w-full h-full p-1 text-sm font-bold rounded-lg gap-x-4 bg-striped-alt">
          <span className="w-12 text-center">AVERAGE</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          <span>{data.average}</span>
        </div>
        
      </section>
      
    </div>
  )
}

export default OfferAmount;