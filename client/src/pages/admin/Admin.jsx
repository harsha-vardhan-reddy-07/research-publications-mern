import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import '../../styles/Admin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [allPublications, setAllPublications] = useState([]);

  const [allEvaluationsCount, setAllEvaluationsCount] = useState(0);
  const [pendingPublicationsCount, setPendingPublicationsCount] = useState(0);

  const [allUsersCount, setAllUsersCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async()=>{
    await axios.get('http://localhost:6001/fetch-publications')
    .then((res) => {
      setAllPublications(res.data);
      let pending = res.data.filter((publication) => (publication.status === 'pending'));
      setPendingPublicationsCount(pending.length);
      let evalCount = res.data.filter((publication) => (publication.status === 'accepted'));
      setAllEvaluationsCount(evalCount.length);
    })
    .catch((err) => {
      console.log(err);
    })

    await axios.get('http://localhost:6001/fetch-users')
    .then((res) => {
      setAllUsersCount(res.data.length);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className='adminPage'>
        <div className="adminCard">
          <p>All Publications</p>
          <b>{allPublications.length}</b>
          <Button variant="contained" color="primary" onClick={()=> navigate('/allPublications')} > View all </Button>
        </div>

        <div className="adminCard">
          <p>All Evaluations</p>
          <b>{allEvaluationsCount}</b>
          <Button variant="contained" color="primary" onClick={()=> navigate('/allEvaluations')} > View all </Button>
        </div>

        <div className="adminCard">
          <p>Pending Publications</p>
          <b>{pendingPublicationsCount}</b>
          <Button variant="contained" color="primary" onClick={()=> navigate('/allPublications')} > View all </Button>
        </div>

        <div className="adminCard">
          <p>All Users</p>
          <b>{allUsersCount}</b>
          <Button variant="contained" color="primary" onClick={()=> navigate('/users')} > View all </Button>
        </div>



    </div>
  )
}

export default Admin