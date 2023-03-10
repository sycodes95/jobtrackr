import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiDomain, mdiBriefcaseOutline, mdiCheckDecagram } from '@mdi/js';
import Rating from 'react-rating';
import { Oval } from "react-loader-spinner";



function AddJob (props) {
  const user_id = props.user_id;

  const job_app_method_choices = [
    'Company Website', 'Job Board Website', 'Recruiter', 'Referral', 'Other'
  ];

  const job_location_choices = [
    'On Site', 'Remote', 'Hybrid', 'Both'
  ];

  const rejected_choices = [
    'From Reponse', 'After Interview', 'After Offer', 'Other'
  ];

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
  /*
  const [jobForm, setJobForm] = useState({
    
    
    company_name: '', //STRING
    company_website: '', //STRING LINK
    company_favorite: false, //BOOLEAN
    job_app_date: null, //DATE
    job_app_method: '',//STRING OPTIONS
    job_source_website: '', //STRING LINK
    job_position: '', //STRING
    job_fit_rating: 0, //INTEGER OPTIONS
    job_location: '', //STRING OPTIONS
    response_date: null, //DATE
    interview_date: null, //DATE
    offer_amount : null, //INTEGER
    rejected: '', //STRING OPTIONS
    contact_person_name: '', //STRING 
    contact_person_email: '', //STRING  
    contact_person_phone: '', //STRING 
    notes: '', //STRING
    user_id: user_id
  });
  */

  const [favoriteIsChecked, setFavoriteIsChecked] = useState(null)

  const [jobFitRating, setJobFitRating] = useState(null);

  const [saveLoading, setSaveLoading] = useState(false);

  const [saveSuccessful, setSaveSuccessful] = useState(false)

  const [companyNameEmpty, setCompanyNameEmpty] = useState(null)

  useEffect(()=>{
    favoriteIsChecked
    ? setJobForm({...jobForm, company_favorite: true})
    : setJobForm({...jobForm, company_favorite: false})
  },[favoriteIsChecked])

  useEffect(()=>{
    jobFitRating && setJobForm({...jobForm, job_fit_rating: jobFitRating})
  },[jobFitRating])

  const handleOnChange = (e) =>{
    const {name, value} = e.target;
    setJobForm({...jobForm, [name]: value})
  }

  const handleJobFitRating = (value) => {
    setJobFitRating(value);
  }

  const handleJobFormSubmit = () =>{
    if(!jobForm.company_name) return setCompanyNameEmpty(true)
    setSaveLoading(true)
    fetch(`http://localhost:5000/job-app-post`, {
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
          window.location.href = '/tracker'
        },1500)
      } 
    })
  }

  useEffect(()=>{
    console.log(jobForm);
  },[jobForm])
  return(
    <div className="flex flex-col h-full max-w-7xl ">
      
      <section className="w-full text-center text-sm font-bold bg-red-800 text-black
      grid grid-cols-3 pl-4 pr-4">
        <div className="col-start-2">JOB APPLICATION DETAILS</div>
        <div className="col-start-3 flex justify-end">
          <Dialog.Close>
            <button>X</button>
          </Dialog.Close>
        </div>
      </section>

      <section className="w-full h-full bg-black bg-opacity-50 border-black 
      text-center text-sm text-white flex-grow  
      flex  p-4 gap-x-4">
        
        <section className='COMPANY-DETAILS flex flex-col gap-y-2 p-4 w-72 bg-dev-slate-darker border-4 border-black'>
          <div className='text-white text-2xl mb-2 flex gap-x-2'><Icon path={mdiDomain} size={1.1} />COMPANY DETAILS</div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>
              <span>Company Name</span> 
              <span className='text-red-800 text-xs flex items-end pl-4'>*</span>
              {
              companyNameEmpty &&
              <span className='text-red-800 text-xs flex items-end pl-4'>required</span>
              }
              
            </label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='company_name' 
            type='text' value={jobForm.company_name} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Company Website</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='company_website' 
            type='text' value={jobForm.company_website} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex justify-between gap-x-2'>
            <label className='flex justify-start'>Favorite Company</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='company_favorite' 
            type='checkbox' placeholder='...' checked={favoriteIsChecked} onChange={(e) => setFavoriteIsChecked(e.target.checked)}/>
          </div>
        </section>

        <section className='JOB-DETAILS flex flex-col gap-y-2 p-4 w-72 bg-dev-slate-darker border-4 border-black'>
          <div className='text-white text-2xl mb-2 flex gap-x-2'><Icon path={mdiBriefcaseOutline} size={1.1} />JOB DETAILS</div>
            
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Application Date</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='job_app_date' 
            type='datetime-local' value={jobForm.job_app_date} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start text-green-600'>Job Application Method</label>
            <select className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='job_app_method' 
            type='text' value={jobForm.job_app_method} placeholder='...' onChange={handleOnChange}>
              {
              job_app_method_choices.map(choice => (
                <option className='bg-black focus:bg-slate-600'>{choice}</option>
              ))  
              }
            </select>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Job Source Website</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='job_source_website' 
            type='text' value={jobForm.job_source_website} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Job Position</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='job_position' 
            type='text' value={jobForm.job_position} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex gap-y-2 justify-between'>
            <label className='flex items-center justify-start'>Job Fit Rating :</label>
            <div className='text-2xl'>
              <Rating
              className=' text-yellow-600 flex justify-between'
              initialRating={jobFitRating}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={handleJobFitRating}
              />
            </div>
            
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start text-green-600'>Job Location</label>
            <select className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='job_location' 
            type='text' value={jobForm.job_location} placeholder='...' onChange={handleOnChange}>
              {
              job_location_choices.map(choice => (
                <option className='bg-black focus:bg-slate-600'>{choice}</option>
              ))  
              }
            </select>
          </div>
        </section>

        <section className='flex flex-col gap-y-2 p-4 w-72 bg-dev-slate-darker border-4 border-black'>
          <div className='text-white text-2xl mb-2 flex gap-x-2'><Icon path={mdiDomain} size={1.1} />RESPONSE</div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Response Date</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='response_date' 
            type='datetime-local' value={jobForm.response_date} placeholder='...' onChange={handleOnChange}/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Interview Date</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='interview_date' 
            type='datetime-local' value={jobForm.interview_date} placeholder='...' onChange={handleOnChange}/>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Offer Amount</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='offer_amount' 
            type='number' value={jobForm.offer_amount} placeholder='...' onChange={handleOnChange}/>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start text-green-600'>Rejected</label>
            <select className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='rejected' 
            type='text' value={jobForm.rejected} placeholder='...' onChange={handleOnChange}>
              {
              rejected_choices.map(choice => (
                <option className='bg-black focus:bg-slate-600'>{choice}</option>
              ))  
              }
            </select>
          </div>
          
        </section>

        <section className='flex flex-col gap-y-2 p-4 w-72 bg-dev-slate-darker border-4 border-black'>
          <div className='text-white text-2xl mb-2 flex gap-x-2'><Icon path={mdiDomain} size={1.1} />MISC</div>
          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Name</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='contact_person_name' 
            type='text' value={jobForm.contact_person_name} placeholder='...' onChange={handleOnChange}/>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Email</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='contact_person_email' 
            type='text' value={jobForm.contact_person_email} placeholder='...' onChange={handleOnChange}/>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='flex justify-start'>Contact Person Phone</label>
            <input className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1' name='contact_person_phone' 
            type='text' value={jobForm.contact_person_phone} placeholder='...' onChange={handleOnChange}/>
          </div>

          <div className='flex flex-col gap-y-2 h-full'>
            <label className='flex justify-start'>Notes</label>
            <textarea className='flex justify-start bg-gray-600 bg-opacity-25 pl-1 pr-1 h-full' name='notes' 
            type='text' value={jobForm.notes} placeholder='...' onChange={handleOnChange} maxLength='255'/>
          </div>
          
        </section>

        <section className='absolute -bottom-12 left-1/2 -translate-x-1/2 h-12 w-64 bg-black bg-opacity-50 
        border-l-8 border-r-8 border-b-8 border-black border-opacity-50 grid grid-cols-2'>
          <button className='bg-green-800 bg-opacity-40 border-r-4 border-black flex justify-center items-center'
          onClick={handleJobFormSubmit}>
            {
            !saveLoading && !saveSuccessful && 'Save'
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
          <Dialog.Close className='bg-red-800 bg-opacity-40 border-l-4 border-black hover:bg-opacity-50'>
            <button className=''>CANCEL</button>
          </Dialog.Close>
          
        </section>

      </section>

    </div>
  )
}

export default AddJob;