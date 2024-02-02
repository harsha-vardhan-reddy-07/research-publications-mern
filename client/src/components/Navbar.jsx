import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import '../styles/Navbar.css'
import Button from '@mui/material/Button';

const Navbar = () => {

  const userId = localStorage.getItem('userId');

  const usertype = localStorage.getItem('usertype');

  const navigate = useNavigate();

  const {logout} = useContext(GeneralContext);

  return (
    <>

      {usertype === 'user' ?
          <div className="navbar">
            <h3 onClick={()=> navigate('/')} >Scholarzz..</h3>
    
            <div className="nav-options">
                <p onClick={()=> navigate('/')} >Home</p>
                <p onClick={()=> navigate('/newPublication')} >New Publication</p>
                <p onClick={()=> navigate('/myPublications')} >My Publications</p>
                <Button  onClick={()=> logout()} variant="contained" disableElevation>Logout</Button>
            </div>
          </div>
      :
      
      <>

      {
        usertype === 'evaluator' ?
          <div className="navbar">
            <h3 onClick={()=> navigate('/')} >Scholarzz..</h3>

            <div className="nav-options">
                <p onClick={()=> navigate('/')} >Home</p>
                <p onClick={()=> navigate('/completed-evaluations')} >Finished Evaluations</p>
                <p onClick={()=> navigate('/pending-evaluation')} >Pending Evaluations</p>
                <Button  onClick={()=> logout()} variant="contained" disableElevation>Logout</Button>
            </div>
          </div>
        :
        <>

        {usertype === 'admin' ?
          <div className="navbar">
            <h3 onClick={()=> navigate('/admin')} >Scholarzz.. <i>(admin)</i> </h3>
    
            <div className="nav-options">
                <p onClick={()=> navigate('/admin')} >Home</p>
                <p onClick={()=> navigate('/users')} >Users</p>
                <p onClick={()=> navigate('/allPublications')} >Publications</p>
                <p onClick={()=> navigate('/allEvaluations')} >Evaluations</p>
                <Button  onClick={()=> logout()} variant="contained" disableElevation>Logout</Button>
            </div>
          </div>
        : 
          <div className="navbar">
            <h3 onClick={()=> navigate('/')} >Scholarzz..</h3>
    
            <div className="nav-options">
                <p onClick={()=> navigate('/')} >Home</p>
                <Button  onClick={()=>  navigate('/authenticate')} variant="contained" disableElevation>Login</Button>
            </div>
          </div>

        
        }


        </>
      }
      
      
      </>}
      
      

      
      

      

    </>
    

    
  )
}

export default Navbar