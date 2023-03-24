
import Icon from '@mdi/react';
import { mdiHammerWrench } from '@mdi/js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Settings () {
  const navigate = useNavigate()
  const [user_id, set_user_id] = useState(null)
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('jobtrackr_token'))
    if(!token) return navigate('/login')
    if(token) {
      fetch(`${process.env.REACT_APP_API_HOST}/users/verify-token-get`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const user_id = data.user.user.rows[0].user_id
        set_user_id(user_id)
      })  
      .catch(error => console.error(error))
    }    

  },[])   
  return (
    <div className="flex justify-center p-8 w-full h-full">
      <div className="h-full w-full max-w-7xl text-red-800 flex  gap-x-2 gap-y-2 items-center 
     p-2 bg-black bg-opacity-25 flex-grow justify-between">
        <Icon path={mdiHammerWrench} size={1} />
        <span>UNDER CONSTRUCTION</span>
        <Icon path={mdiHammerWrench} size={1} />

      </div>
       
    </div>
  )
}

export default Settings;