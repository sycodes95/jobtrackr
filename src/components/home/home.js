import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

function Home () {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('jobtrackr_token'))
    token ? navigate('/tracker') : navigate('/login')
  }, [navigate])
}

export default Home;