
import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import Rating from 'react-rating';
import { Oval } from "react-loader-spinner";
import { format, addMinutes } from 'date-fns';
import Icon from '@mdi/react';
import { mdiDomain, mdiBriefcaseOutline, mdiCheckDecagram, mdiHelpCircle } from '@mdi/js';

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigate } from 'react-router-dom';

function AddJob (props) {
  const user_id = props.user_id;

  const jobApp = props.jobApp

  const navigate = useNavigate()
  
  const [isEditMode, setIsEditMode] = useState(false)
  
  const [saveError, setSaveError] = useState(' ')

  const [jobForm, setJobForm] = useState({
    
    
    company_name: null, //STRING
    company_website: null, //STRING LINK
    company_favorite: null, //BOOLEAN
    job_app_date: null, //DATE
    job_app_method: null,//STRING OPTIONS
    job_source_website: null, //STRING LINK
    job_position: null, //STRING
    job_fit_rating: null, //INTEGER OPTIONS
    job_location: null, //STRING OPTIONS
    response_date: null, //DATE
    interview_date: null, //DATE
    offer_amount : null, //INTEGER
    rejected: null, //STRING OPTIONS
    contact_person_name: null, //STRING 
    contact_person_email: null, //STRING  
    contact_person_phone: null, //STRING 
    notes: null, //STRING
    user_id: user_id
  });

  const [jobFitRating, setJobFitRating] = useState(null);

  const [saveLoading, setSaveLoading] = useState(false);

  const [saveSuccessful, setSaveSuccessful] = useState(false)

  const [companyNameEmpty, setCompanyNameEmpty] = useState(null)


  useEffect(()=>{
    jobFitRating && setJobForm({...jobForm, job_fit_rating: jobFitRating})
  },[jobFitRating])

  const handleOnChange = (e) =>{
    let {name, value} = e.target;

    // if (name === 'job_app_date' || name === 'response_date' || name === 'interview_date') {
    //   const date = new Date(value);
  
    //   const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  
    //   const formattedDate = format(localDate, 'yyyy-MM-dd\'T\'HH:mm');
  
    //   setJobForm({ ...jobForm, [name]: formattedDate });
    // } else {
    //   if(name === 'company_name') value = value.toUpperCase()
    //   setJobForm({...jobForm, [name]: value})

    // }

    if(name === 'company_name') value = value.toUpperCase()
    setJobForm({...jobForm, [name]: value})
    
    
  }

  const handleJobFitRating = (value) => {
    setJobFitRating(value);
  }

  const handleJobFormSubmit = () =>{
    if(isEditMode){
      setSaveLoading(true)
      fetch(`${process.env.REACT_APP_API_HOST}/job-app-put?job_app_id=${jobApp.job_app_id}`,{
        method: 'PUT',
        body: JSON.stringify(jobForm),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        setSaveLoading(false)
        if(data.command === 'UPDATE'){
          setSaveSuccessful(true)
          setTimeout(()=>{
            setSaveSuccessful(false)
            navigate(0)
          },1500)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
    }

    if(!isEditMode){
      if(!jobForm.company_name) return setCompanyNameEmpty(true)
      setSaveLoading(true)
      fetch(`${process.env.REACT_APP_API_HOST}/job-app-post`, {
        method:'POST',
        body: JSON.stringify(jobForm),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then((data) => {
        
        setSaveLoading(false)
        const job_app_id = data.job_app_id
        if(job_app_id){
          setSaveSuccessful(true)
          setTimeout(()=>{
            setSaveSuccessful(false)
            navigate(0)
          },1500)
        } 

        if(data.name === 'error'){
          if(data.code === '23505'){
            setSaveError('[ COMPANY NAME ALREADY EXISTS ]')
          }
        }
      })
    }
    
  }


  useEffect(()=>{
    
    if(jobApp && jobApp.job_app_id){
      setJobForm(jobApp)
      setIsEditMode(true)
    }
   
     
  },[jobApp])


  const job_app_method_choices = [
    null, 'Company Website', 'Job Board Website', 'Recruiter', 'Referral', 'Other'
  ];

  const job_location_choices = [
    null, 'On Site', 'Remote', 'Hybrid', 'Both'
  ];

  const rejected_choices = [
    null, 'From Response', 'After Interview', 'After Offer', 'Other'
  ];

  useEffect(()=> {
    console.log(jobForm);
    console.log(jobForm.job_app_date);
  },[jobForm])

  return(
    <div className="flex flex-col max-h-full border rounded-lg max-w-7xl bg-gray ">
      
      <section className="grid items-center h-8 pl-4 pr-4 text-sm font-bold text-center text-white bg-black bg-opacity-25 rounded-lg min-w-fit">
        <div className="col-start-2 min-w-fit">JOB APPLICATION DETAILS</div>
        <div className="flex justify-end col-start-3">
          <Dialog.Close>
            <button className='text-xl'>X</button>
          </Dialog.Close>
        </div>
      </section>

      <section className="grid justify-center flex-grow w-full h-full p-4 overflow-x-hidden overflow-y-auto text-sm text-center text-white rounded-lg JOB-FORM gap-x-4">
        
        <section className='flex flex-col w-64 p-4 COMPANY-DETAILS gap-y-2 '>
          <div className='flex items-center justify-center p-1 mb-2 text-2xl text-white bg-black bg-opacity-25 rounded-lg gap-x-2'>
            <span>COMPANY</span>
          </div>

          <div className='flex flex-col gap-y-2 '>
            <label className='flex justify-start'>
              <span className='text-red-800'>Company Name</span> 
              <span className='flex items-end pl-4 text-xs text-red-800'>*</span>
              {
              companyNameEmpty &&
              <span className='flex items-end pl-4 text-xs text-red-800'>required</span>
              }
              
            </label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <input className='flex justify-start w-full pl-1 pr-1 bg-black bg-opacity-0' name='company_name' 
            type='text' value={jobForm.company_name} placeholder='...' onChange={handleOnChange}/>
            </div>
            
          </div>


          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Company Website</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <input className='flex justify-start w-full pl-1 pr-1 bg-black bg-opacity-0' name='company_website' 
            type='text' value={jobForm.company_website} placeholder='...' onChange={handleOnChange}/>
            </div>
            
          </div>
          <div className='flex justify-between gap-x-2'>
            <label className='flex justify-start '>Favorite Company</label>
            <input className='flex justify-start pl-1 pr-1 bg-gray-600 bg-opacity-25' name='company_favorite' 
            type='checkbox' placeholder='...' checked={jobForm.company_favorite}
             onChange={(e) => setJobForm({...jobForm, company_favorite : e.target.checked})}/>
          </div>
        </section>

        <section className='flex flex-col w-64 p-4 JOB-DETAILS gap-y-2'>
          <div className='flex items-center justify-center p-1 mb-2 text-2xl text-white bg-black rounded-lg gap-x-2 bg-opacity-30'>
            
            <span>JOB DETAILS</span>
          </div>
            
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Application Date</label>

            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <input className='flex justify-start w-full pl-1 pr-1 bg-black bg-opacity-0' name='job_app_date' 
            type='date' value={
            jobForm.job_app_date ?
            new Date(jobForm.job_app_date).toISOString().split('T')[0]
            : null
            
            } 
            placeholder='...' onChange={handleOnChange}/>
            </div>
            
            
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Job Application Method</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <select className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='job_app_method' 
            type='text' value={jobForm.job_app_method} placeholder='...' onChange={handleOnChange}>
              {
              job_app_method_choices.map(choice => (
                <option className='bg-slate-600'>{choice}</option>
              ))  
              }
            </select>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Job Source Website</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-black bg-opacity-0' name='job_source_website' 
              type='text' value={jobForm.job_source_website} placeholder='...' onChange={handleOnChange}/>
            </div>
            
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Job Position</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='job_position' 
              type='text' value={jobForm.job_position} placeholder='...' onChange={handleOnChange}/>
            </div>
           
          </div>
          <div className='flex justify-between gap-y-2 '>
            <label className='flex items-center justify-start'>Job Fit Rating :</label>
            <div className='text-2xl'>
              <Rating
              className='flex justify-between text-yellow-600 '
              initialRating={jobForm.job_fit_rating}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={handleJobFitRating}
              />
            </div>
            <a className='flex items-center justify-center text-white my-anchor-element' 
            data-tooltip-id="my-tooltip" data-tooltip-content="How well do you fit the job description?">
              <Icon className='transition-all hover:cursor-pointer hover:text-slate-300' path={mdiHelpCircle} size={1} />
            </a>
            <Tooltip anchorSelect=".my-anchor-element" />
            
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Job Location</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <select className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='job_location' 
            type='text' value={jobForm.job_location} placeholder='...' onChange={handleOnChange}>
              {
              job_location_choices.map(choice => (
                <option className='bg-black focus:bg-slate-600'>{choice}</option>
              ))  
              }
            </select>
            </div>
          </div>
        </section>

        <section className='flex flex-col w-64 p-4 gap-y-2'>
          <div className='flex justify-center p-1 mb-2 text-2xl text-white bg-black bg-opacity-25 rounded-lg gap-x-2'>
            <span>RESPONSE</span>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Response Date</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='response_date' 
              type='date' 
              value={
              jobForm.response_date 
              ? new Date(jobForm.response_date).toISOString().split('T')[0]
              : ''
              }
              placeholder='...' onChange={handleOnChange}/>
            </div>
            
            
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Interview Date</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='interview_date' 
              type='date' 
              value={
              jobForm.interview_date 
              ? new Date(jobForm.interview_date).toISOString().split('T')[0]
              : ''
              }
              placeholder='...' onChange={handleOnChange}/>
            </div>
            
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Offer Amount</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='offer_amount' 
              type='number' value={jobForm.offer_amount} placeholder='...' onChange={handleOnChange}/>
            </div>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start '>Rejected</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <select className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='rejected' 
              type='text' value={jobForm.rejected } placeholder='...' onChange={handleOnChange}>
                {
                rejected_choices.map(choice => (
                  <option className='bg-black focus:bg-slate-600'>{choice}</option>
                ))  
                }
              </select>
            </div>
          </div>
          
        </section>

        <section className='flex flex-col w-64 p-4 gap-y-2'>
          <div className='flex items-center justify-center p-1 mb-2 text-2xl text-white bg-black rounded-lg gap-x-2 bg-opacity-30 '>
            <span>MISC</span>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Name</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='contact_person_name' 
            type='text' value={jobForm.contact_person_name} placeholder='...' onChange={handleOnChange}/>
            </div>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Email</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
              <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='contact_person_email' 
              type='text' value={jobForm.contact_person_email} placeholder='...' onChange={handleOnChange}/>
            </div>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Phone</label>
            <div className='flex w-full p-1 border rounded-lg border-slate-700'>
            <input className='flex justify-start w-full pl-1 pr-1 bg-gray-600 bg-opacity-0' name='contact_person_phone' 
            type='text' value={jobForm.contact_person_phone} placeholder='...' onChange={handleOnChange}/>
            </div>
          </div>

          <div className='flex flex-col h-full gap-y-2'>
            <label className='flex justify-start'>Notes</label>
            <div className='flex w-full h-full p-1 border rounded-lg border-slate-700'>
              <textarea className='flex justify-start w-full h-full pl-1 pr-1 bg-gray-600 bg-opacity-0 resize-none' name='notes' 
              type='text' value={jobForm.notes} placeholder='...' onChange={handleOnChange} maxLength='255'/>
            </div>
          </div>
          
        </section>

        <section className='w-full h-6 pb-2 text-xs ERROR-TEXT col-span-full'>
          
          <span className='h-full text-red-700'>{saveError}</span>
        </section>

        <section className='flex justify-center p-2 border-black border-opacity-50 h-fit col-span-full '>
          <div className='flex w-64 gap-4 max-640px-flex-column-w-full'>
            <button className='flex items-center justify-center w-full text-black transition-all bg-yellow-500 rounded-lg border-blac bg-opacity-60 hover:bg-opacity-80' onClick={handleJobFormSubmit}>
            
              {
              !saveLoading && !saveSuccessful && 'SAVE'
              }
              {
              saveLoading &&
              <Oval height="20" width="20" color="#000000" secondaryColor="#808080"
              strokeWidth="8" ariaLabel="triangle-loading" wrapperStyle={{}}
              visible={true}/>
              }
              {
              saveSuccessful && 
              <Icon path={mdiCheckDecagram} size={1.1} className='text-white' />
              }
              
              
            </button>

            <Dialog.Close className='w-full h-8 transition-all bg-black rounded-lg bg-opacity-40 hover:bg-opacity-50'>
              CANCEL
            </Dialog.Close>
          </div>
          
          
        </section>

      </section>

    </div>
  )
}

export default AddJob;