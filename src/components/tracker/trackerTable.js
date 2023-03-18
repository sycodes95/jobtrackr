import moment from "moment";
import Icon from '@mdi/react';
import { mdiDeleteVariant, mdiCircleEditOutline, mdiSort, mdiAccountCircleOutline, mdiNoteOutline, mdiHeart } from '@mdi/js';
import Rating from 'react-rating';
import { useEffect, useRef, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import AddJob from "./addJob";
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import Contact from "./appNotes";
import ContactPerson from "./appNotes";
import Notes from "./appNotes";
import AppNotes from "./appNotes";
import AppContact from "./appContact";
import AppDelete from "./appDelete";


function TrackerTable (props) {
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext
  const {sortColumn, setSortColumn} = props.sortColumnContext
  const {sortOrder, setSortOrder} = props.sortByContext
  const {categories, setCategories} = props.categoriesContext
  const containerRef = useRef(null)

  const handleCategorySort = (index) => {
    const column = categories[index].column;
    const sortOrder = categories[index].sortOrder;
    setSortColumn(column)
    setSortOrder(sortOrder)

    let cat = Array.from(categories)
    cat[index].sortOrder === 0 ? cat[index].sortOrder = 1 : cat[index].sortOrder = 0;
    setCategories(cat)
    
  } 

  const handleOverlayClick = (event) => {
    event.preventDefault();
  };
  

  return (
    
    <div className='TRACKER-TABLE w-full overflow-x-scroll ' ref={containerRef}>
      <table className="w-full relative">
        <thead className='sticky top-0 z-10'>
          <tr className="bg-striped-alt h-12 bg-blur">
            <th className='text-xs text-white p-2 w-6 pointer-events-none'>
            </th>
            <th className='text-xs text-white p-2 w-6 pointer-events-none'>
            </th>
            <th className='text-xs text-white p-2 w-6 pointer-events-none'>
            #
            </th>
            {
            categories &&
            categories.map((cat, index) => (
            <th key={index} className='text-xs text-white p-2 
            whitespace-nowrap hover:cursor-pointer hover:text-opacity-70 transition-all
            overflow-hidden ' onClick={()=>handleCategorySort(index)} >
              {cat.category }
            </th>
            ))
            }
            <th className='text-xs text-white p-2 pointer-events-none
            '>
            MISC
            </th>

          </tr>
        </thead>
        <tbody className="h-full overflow-y-scroll pointer-events-none">
          {
          !jobApps &&
          <td colSpan='17' className="text-center text-white text-sm">No Results...</td>
          }
          {
          jobApps && 
          jobApps.map((obj, index) => (
            <tr key={index} className={`text-xs font-thin h-6   
            ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-gray-300'}
            ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
            ${obj.offer_amount && 'text-yellow-500'}
            ${obj.rejected && 'text-red-500'}
            ${obj.rejected && 'strike'}
            relative overflow-hidden pointer-events-auto
            `}>
              
              
              <td className="text-center whitespace-nowrap pl-1">
                <Dialog.Root>
                  <Dialog.Trigger className="flex items-center">
                        
                    <Icon path={mdiDeleteVariant} size={0.7} />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                
                    <Dialog.Overlay className="DialogOverlayMisc"/>
                    <Dialog.Overlay/>
                    <Dialog.Content className="DialogContentMisc">
                      <AppDelete user_id={user_id} jobApp={obj}/>
                    </Dialog.Content>
                  
                  </Dialog.Portal>
                </Dialog.Root>                
                
              </td>
              
              
              <td className="text-center whitespace-nowrap">
                
                <Dialog.Root>
                  <Dialog.Trigger className="flex items-center">
                        
                    <Icon className="h-fit w-fit" path={mdiCircleEditOutline} size={0.6}/>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                
                    <Dialog.Overlay className="DialogOverlay"/>
                    <Dialog.Overlay/>
                    <Dialog.Content className="DialogContent" onInteractOutside={handleOverlayClick}>
                      <AddJob user_id={user_id} jobApp={obj}/>
                    </Dialog.Content>
                  
                  </Dialog.Portal>
                </Dialog.Root>
              </td>
              
              <td className="text-center whitespace-nowrap">{index + 1}</td>
              <td className="text-center whitespace-nowrap">{moment(obj.job_app_date).format("YYYY-MM-DD")}</td>
              <td className="text-center whitespace-nowrap h-6 flex justify-center items-center">
                {obj.company_favorite && <Icon className="" path={mdiHeart} size={0.7} />}
              </td>
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
              
              <td className="flex items-center justify-center gap-x-1 h-6">
                <Dialog.Root>
                  <Dialog.Trigger className="flex items-center">
                        
                    <Icon path={mdiAccountCircleOutline} size={0.7} />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                
                    <Dialog.Overlay className="DialogOverlayMisc"/>
                    <Dialog.Overlay/>
                    <Dialog.Content className="DialogContentMisc" >
                      <AppContact user_id={user_id} jobApp={obj}/>
                    </Dialog.Content>
                  
                  </Dialog.Portal>
                </Dialog.Root>

                
                <Dialog.Root>
                  <Dialog.Trigger className="flex items-center">
                        
                    <Icon className="" path={mdiNoteOutline} size={0.7} />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                
                    <Dialog.Overlay className="DialogOverlayMisc"/>
                    <Dialog.Overlay/>
                    <Dialog.Content className="DialogContentMisc" >
                      <AppNotes user_id={user_id} jobApp={obj}/>
                    </Dialog.Content>
                  
                  </Dialog.Portal>
                </Dialog.Root>
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