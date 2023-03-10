import moment from "moment";
import Icon from '@mdi/react';
import { mdiDeleteVariant, mdiCircleEditOutline } from '@mdi/js';
import Rating from 'react-rating';


function TrackerTable (props) {
  const {jobApps, setJobApps} = props.jobAppsContext
  const categories = [
    'APP DATE', 'FAV', 'COMPANY', 'COMPANY WEBSITE', 'APPLICATION METHOD', 'SOURCE WEBSITE', 'POSITION',
    'FIT RATING', 'LOCATION', 'RESPONSE DATE', 'INTERVIEW DATE',  'REJECTED', 'OFFER AMOUNT', 'ADDITIONAL'
  ]

  console.log(jobApps);
  return (
    <div className=' w-full overflow-x-auto'>
      <table className="w-full">
        <thead>
          <tr className="bg-black bg-opacity-25">
            <th colspan='1' className='text-xs text-gray-300 p-2  w-6
            '></th>
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30 w-6
            '></th>
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30 w-6
            '>#</th>
            {
            categories.map((cat, index) => (
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-white border-opacity-30
            whitespace-nowrap'>{cat}</th>
            ))
            }

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