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
    const offers = jobApps
    .filter(app => app.offer_amount)
    .map(app => { return app.offer_amount })
    
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
    <div className="text-white bg-black bg-opacity-25 flex flex-grow gap-x-2">
      <section className=" flex justify-center text-md text-white items-center 
      bg-black bg-opacity-25 font-bold p-2 whitespace-nowrap">
        <div>
          OFFER AMOUNT
        </div>
        
      </section>
      {
      jobApps &&
      <section className=" h-full w-full flex gap-x-2 items-center justify-center">


        <div className="p-1 h-full flex justify-center items-center gap-x-4 text-red-700 w-full text-sm bg-striped-alt ">
          <span className="w-12 text-center">LOWEST</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          <span>{data.lowest}</span>
        </div>

        <div className="p-1 h-full flex justify-center items-center gap-x-4 text-yellow-600 w-full text-sm bg-striped-alt">
          <span className="w-12 text-center">HIGHEST</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          <span>{data.highest}</span>
        </div>
        
        <div className="p-1 h-full flex justify-center items-center gap-x-2 text-xl font-bold w-full bg-striped-alt">
          <span className="text-center flex justify-center">AVG</span>
          <div className="flex justify-center">
            <Icon className="" path={mdiArrowRightThin} size={1} />
          </div>
          
          <span>{data.average}</span>
        </div>

        

        
      </section>
      }
      
    </div>
  )
}

export default OfferAmount;