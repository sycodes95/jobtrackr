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
  const {fetchLoading, setFetchLoading} = props.fetchLoadingContext
  const user_id = props.user_id;
  const {jobApps, setJobApps} = props.jobAppsContext
  const {sortColumn, setSortColumn} = props.sortColumnContext
  const {sortOrder, setSortOrder} = props.sortByContext
  const {categories, setCategories} = props.categoriesContext
  const {jobAppsIsEmpty, setJobAppsIsEmpty} = props.jobAppsIsEmptyContext
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
    
    <div className='relative w-full p-2 overflow-x-auto bg-black border border-gray-800 rounded-lg shadow-md TRACKER-TABLE bg-opacity-10' ref={containerRef}>
      {
      fetchLoading && 
      <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full ">
        <div className="absolute z-40 w-full h-full bg-black bg-opacity-25 "></div>
        
      </div>
      }
      <table className="relative w-full rounded-md ">
        <thead className='sticky top-0 z-10 border-b-2 border-black border-opacity-20 '>
          <tr className="h-12 text-left rounded-md bg-blur">
            <th className='w-6 text-xs text-white pointer-events-none'>
            </th>
            <th className='w-6 text-xs text-white pointer-events-none'>
            </th>
            
            {
            categories &&
            categories.map((cat, index) => (
            <th key={index} className='pr-4 overflow-hidden text-xs text-gray-400 transition-all whitespace-nowrap hover:cursor-pointer hover:text-opacity-70' onClick={()=>handleCategorySort(index)} >
              {cat.category }
            </th>
            ))
            }
            <th className='w-6 p-2 text-xs text-white pointer-events-none '>
            
            </th>
            <th className='w-6 p-2 text-xs text-white pointer-events-none '>
            
            </th>

          </tr>
        </thead>
        <tbody className="h-full overflow-y-scroll pointer-events-none ">
          {
          jobAppsIsEmpty &&
          <tr className="text-sm text-center text-white">
            <td colSpan='17'>No Results...</td>
          </tr>
          }
          {
          jobApps &&
          jobApps.map((obj, index) => (
            <tr key={index} className={`text-xs font-thin h-7
            ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-white'}
            ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
            ${obj.offer_amount && 'text-yellow-400'}
            ${obj.rejected && 'text-red-600'}
            
            relative overflow-hidden pointer-events-auto 
            `}>
              
              
              <td className="text-left whitespace-nowrap">
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
              
              
              <td className="whitespace-nowrap"> {obj.job_app_date 
              ? new Date(obj.job_app_date).toISOString().split('T')[0]
              : 'N/A'
              }</td>
              <td className="flex items-center w-6 h-6 whitespace-nowrap">
                {obj.company_favorite && <Icon className="" path={mdiHeart} size={0.7} />}
              </td>
              <td className="overflow-hidden whitespace-nowrap overflow-ellipsis">{obj.company_name}</td>
              <td className="overflow-hidden whitespace-nowrap overflow-ellipsis">{obj.company_website}</td>
              <td className="whitespace-nowrap">{obj.job_app_method}</td>
              <td className="overflow-hidden whitespace-nowrap overflow-ellipsis">{obj.job_source_website}</td>
              <td className="overflow-hidden whitespace-nowrap overflow-ellipsis">{obj.job_position}</td>
              <td className="whitespace-nowrap">
              {
              <Rating
              className={`
              ${!obj.interview_date && !obj.rejected && !obj.offer_amount && 'text-gray-300'}
              ${obj.interview_date && !obj.offer_amount && !obj.rejected && 'text-steel-blue'}
              ${obj.offer_amount && 'text-yellow-500'}
              ${obj.rejected && 'text-red-600'}
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
              <td className="whitespace-nowrap">{obj.job_location}</td>
              <td className="whitespace-nowrap">
              {
              obj.response_date 
              ? moment(obj.response_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </td>
              <td className="whitespace-nowrap">
              {
              obj.interview_date
              ? moment(obj.interview_date).format("YYYY-MM-DD")
              : 'N/A'
              }
              </td>
              <td className="whitespace-nowrap">{obj.rejected}</td>


              <td className="overflow-hidden whitespace-nowrap overflow-ellipsis ">{obj.offer_amount}</td>
              
              <td className="whitespace-nowrap ">
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
              </td>
              <td className="whitespace-nowrap">
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