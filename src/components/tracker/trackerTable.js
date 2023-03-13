import moment from "moment";
import Icon from '@mdi/react';
import { mdiDeleteVariant, mdiCircleEditOutline, mdiSort } from '@mdi/js';
import Rating from 'react-rating';
import { useEffect, useState } from "react";


function TrackerTable (props) {
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext

  const [categories, setCategories] = useState([
    {category: 'APP DATE', column: 'job_app_date', sortby: 1},
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
    const jobAppIds = jobApps.map(app => app.job_app_id)
    
    fetch(`${process.env.REACT_APP_API_HOST}/job-app-sort-category-get?user_id=${user_id}&column=${column}&sortby=${sortby}&jobAppIds=${JSON.stringify(jobAppIds)}`)
    .then(response => response.json())
    .then(data =>{
      if(data.length > 0){
        let cat = Array.from(categories)
        cat[index].sortby === 0 ? cat[index].sortby = 1 : cat[index].sortby = 0;
        setCategories(cat)
        setJobApps(data)
      }
    })
  } 
 
  return (
    <div className=' w-full h-96 overflow-x-auto'>
      <table className="w-full">
        <thead>
          <tr className="bg-striped h-12">
            <th colspan='1' className='text-xs text-white p-2  w-6 pointer-events-none'>
            </th>
            <th colspan='1' className='text-xs text-white p-2 w-6 pointer-events-none'>
            </th>
            <th colspan='1' className='text-xs text-white p-2 w-6 pointer-events-none'>
            #
            </th>
            {
            categories &&
            categories.map((cat, index) => (
            <th key={index} colspan='1' className='text-xs text-white p-2 
            whitespace-nowrap hover:cursor-pointer hover:text-opacity-70 transition-all
            overflow-hidden ' onClick={()=>handleCategorySort(index)} >
              {cat.category }
            </th>
            ))
            }
            <th colspan='1' className='text-xs text-white p-2 border-r-2 border-white border-opacity-30 pointer-events-none
            '>
            ADDITIONAL
            </th>

          </tr>
        </thead>
        <tbody>
          {
          jobApps &&
          jobApps.map((obj, index) => (
            <tr key={index} className={`text-xs font-thin h-6  
            ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-gray-300'}
            ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
            ${obj.offer_amount && 'text-yellow-500'}
            ${obj.rejected && 'text-red-500'}
            ${obj.rejected && 'strike'}
            
            `}>
              
              <td className="text-center whitespace-nowrap"><Icon path={mdiDeleteVariant} size={0.7} /></td>
              <td className="text-center whitespace-nowrap"><Icon path={mdiCircleEditOutline} size={0.7} /></td>
              <td className="text-center whitespace-nowrap">{index + 1}</td>
              <td className="text-center whitespace-nowrap">{moment(obj.job_app_date).format("YYYY-MM-DD")}</td>
              <td className="text-center whitespace-nowrap">{obj.company_favorite}</td>
              <td className="text-center whitespace-nowrap overflow-ellipsis overflow-hidden">{obj.company_name}</td>
              <td className="text-center whitespace-nowrap overflow-ellipsis overflow-hidden">{obj.company_website}</td>
              <td className="text-center whitespace-nowrap">{obj.job_app_method}</td>
              <td className="text-center whitespace-nowrap overflow-ellipsis overflow-hidden">{obj.job_source_website}</td>
              <td className="text-center whitespace-nowrap overflow-ellipsis overflow-hidden">{obj.job_position}</td>
              <td className="text-center whitespace-nowrap">
              {
              <Rating
              className={`
              ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-gray-300'}
              ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
              ${obj.offer_amount && 'text-yellow-500'}
              ${obj.rejected && 'text-red-500'}
              ${obj.rejected && 'strike'} 
              flex justify-between`}
              initialRating={obj.job_fit_rating}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              readonly
              fractions={1}
              stop={5}
              />
              }
              </td>
              <td className="text-center whitespace-nowrap">{obj.job_location}</td>
              <td className="text-center whitespace-nowrap">
              {
              obj.response_date 
              ? moment(obj.response_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </td>
              <td className="text-center whitespace-nowrap">
              {
              obj.interview_date
              ? moment(obj.interview_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </td>
              <td className="text-center whitespace-nowrap">{obj.rejected}</td>
              <td className="text-center whitespace-nowrap overflow-ellipsis overflow-hidden">{obj.offer_amount}</td>
              
              <td className="flex flex-row">
                <span>Contact</span> <span>Notes</span>
              </td>
              
            </tr>
          ))
          }

        </tbody>

      </table>
      
    </div>
  )
}
export default TrackerTable;