import moment from "moment";
import Icon from '@mdi/react';
import { mdiDeleteVariant, mdiCircleEditOutline } from '@mdi/js';
import Rating from 'react-rating';
import { useEffect, useState } from "react";


function TrackerTable (props) {
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext

  const [categories, setCategories] = useState([
    {category: 'APP DATE', column: 'job_app_date', sortby: 0},
    {category: 'FAV', column: 'company_favorite', sortby: 0},
    {category: 'COMPANY', column: 'company_name', sortby: 0},
    {category: 'COMPANY WEBSITE', column: 'company_website', sortby: 0},
    {category: 'APPLICATION METHOD', column: 'job_app_method', sortby: 0},
    {category: 'SOURCE WEBSITE', column: 'job_source_website', sortby: 0},
    {category: 'POSITION', column: 'job_position', sortby: 0},
    {category: 'FIT RATING', column: 'job_fit_rating', sortby: 0},
    {category: 'LOCATION', column: 'job_location', sortby: 0},
    {category: 'RESPONSE DATE', column: 'response_date', sortby: 0},
    {category: 'INTERVIEW DATE', column: 'interview_date', sortby: 0},
    {category: 'REJECTED', column: 'rejected', sortby: 0},
    {category: 'OFFER AMOUNT', column: 'offer_amount', sortby: 0},
  ])
  
  const handleCategorySort = (index) => {
    const column = categories[index].column;
    const sortby = categories[index].sortby;
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-sort-category-get?user_id=${user_id}&column=${column}&sortby=${sortby}`)
    .then(response => response.json())
    .then(data =>{
      if(data.length > 0){
        let cat = Array.from(categories)
        cat[index].sortby === 0 ? cat[index].sortby = 1 : cat[index].sortby = 0;
        setCategories(cat)
        setJobApps(data)
      }
      console.log(data);
      /*
      let cat = Array.from(categories)
      cat[index].sortby === 0 ? cat[index].sortby = 1 : cat[index].sortby = 0
      setCategories(cat)
      */
      
    })
    
  } 

 
  useEffect(()=>{
    console.log(categories);
  },[categories])

  /*
  const categories = [
    {category: 'APP DATE',  }, 'FAV', 'COMPANY', 'COMPANY WEBSITE', 'APPLICATION METHOD', 'SOURCE WEBSITE', 'POSITION',
    'FIT RATING', 'LOCATION', 'RESPONSE DATE', 'INTERVIEW DATE',  'REJECTED', 'OFFER AMOUNT', 'ADDITIONAL'
  ]
  */

  console.log(jobApps);
  return (
    <div className=' w-full h-96 overflow-x-auto'>
      <table className="w-full">
        <thead>
          <tr className="bg-black bg-opacity-25">
            <th colspan='1' className='text-xs text-gray-300 p-2  w-6'>
            </th>
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30 w-6'>
            </th>
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30 w-6'>
            #
            </th>
            {
            categories &&
            categories.map((cat, index) => (
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30
            whitespace-nowrap hover:cursor-pointer hover:text-white transition-all' onClick={()=>handleCategorySort(index)} >{cat.category}</th>
            ))
            }
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30 w-6'>
            ADDITIONAL
            </th>
          

          </tr>
        </thead>
        <tbody>
          {
          jobApps &&
          jobApps.map((obj, index) => (
            <tr className={`text-xs font-thin  
            ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-white'}
            ${obj.interview_date && !obj.offer_amount && 'text-steel-blue'}
            ${obj.offer_amount && 'text-yellow-500'}
            ${obj.rejected && 'text-red-500'}
            ${obj.rejected &&'strike'}
            
            `}>
              <th className="whitespace-nowrap"><Icon path={mdiCircleEditOutline} size={0.7} /></th>
              <th className="whitespace-nowrap"><Icon path={mdiDeleteVariant} size={0.7} /></th>
              <th className="whitespace-nowrap">{index + 1}</th>
              <th className="whitespace-nowrap">{moment(obj.job_app_date).format("YYYY-MM-DD")}</th>
              <th className="whitespace-nowrap">{obj.company_favorite}</th>
              <th className="whitespace-nowrap">{obj.company_name}</th>
              <th className="whitespace-nowrap">{obj.company_website}</th>
              <th className="whitespace-nowrap">{obj.job_app_method}</th>
              <th className="whitespace-nowrap">{obj.job_source_website}</th>
              <th className="whitespace-nowrap">{obj.job_position}</th>
              <th className="whitespace-nowrap">{<Rating
              className=' text-gray-300 flex justify-between'
              initialRating={obj.job_fit_rating}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              readonly
              fractions={1}
              stop={5}
              />}
              </th>
              <th className="whitespace-nowrap">{obj.job_location}</th>
              <th className="whitespace-nowrap">
              {
              obj.response_date 
              ? moment(obj.response_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </th>
              <th className="whitespace-nowrap">
              {
              obj.interview_date
              ? moment(obj.interview_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </th>
              <th className="whitespace-nowrap">{obj.rejected}</th>
              <th className="whitespace-nowrap">{obj.offer_amount}</th>
              
              <th className="flex flex-row">
                <span>Contact</span> <span>Notes</span>
              </th>
              
            </tr>
          ))
          }

        </tbody>
        

      </table>

      
      
    </div>
  )
}
export default TrackerTable;