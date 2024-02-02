import React, { useEffect, useState } from 'react'
import '../../styles/Users.css'
import axios from 'axios';

const Users = () => {

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async()=>{
      await axios.get('http://localhost:6001/fetch-users').then((res) => {
        setAllUsers(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='users-page'>
      <h1>All Users</h1>
      <div className="users">

        {allUsers.map((user) => (
          <div className="user">
            <span>
              <b>User Id</b>
              <p>{user._id}</p>
            </span>
            <span>
              <b>Username</b>
              <p>{user.username}</p>
            </span>
            <span>
              <b>Email</b>
              <p>{user.email}</p>
            </span>
            <span>
              <b>User Role</b>
              <p>{user.usertype}</p>
            </span>
          </div>
        
        ))}
        

      </div>
    </div>
  )
}

export default Users