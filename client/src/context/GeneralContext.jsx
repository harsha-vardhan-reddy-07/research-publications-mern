import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) =>{

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
    const [domain, setDomain] = useState('');
    const [qualification, setQualification] = useState('');


    const login = async () =>{
        try{
          const loginInputs = {email, password}
            await axios.post('http://localhost:6001/login', loginInputs)
            .then( async (res)=>{
    
              localStorage.setItem('userId', res.data._id);
                localStorage.setItem('usertype', res.data.usertype);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('domain', res.data.domain);
                localStorage.setItem('qualification', res.data.qualification);
                if(res.data.usertype === 'user' || res.data.usertype === 'evaluator'){
                    navigate('/');
                }else if(res.data.usertype === 'admin'){
                    navigate('/admin');
                }
              }).catch((err) =>{
                alert("login failed!!");
                console.log(err);
              });
              
            }catch(err){
              console.log(err);
            }
          }
          
      const inputs = {username, email, usertype, password, domain, qualification};
    
      const register = async () =>{
        try{
            console.log(inputs);
            await axios.post('http://localhost:6001/register', inputs)
            .then( async (res)=>{
                localStorage.setItem('userId', res.data._id);
                localStorage.setItem('usertype', res.data.usertype);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('domain', res.data.domain);
                localStorage.setItem('qualification', res.data.qualification);
    
                if(res.data.usertype === 'user' || res.data.usertype === 'evaluator'){
                  navigate('/');
              }else if(res.data.usertype === 'admin'){
                  navigate('/admin');
              }
     
            }).catch((err) =>{
                alert("registration failed!!");
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
      }
    


    const logout = async () =>{
    
        localStorage.clear();
        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            localStorage.removeItem(key);
          }
        }
        
        navigate('/');
      }



    const [allPublications, setAllPublications] = useState([]);

    useEffect(() =>{

        getPublications();

    }, []);

    const getPublications = async () =>{
        try{
            await axios.get('http://localhost:6001/fetch-publications')
            .then((res)=>{
                setAllPublications(res.data);
                console.log(res.data);
            }).catch((err)=>{
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
    }

    return(
        <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, domain, setDomain, qualification, setQualification, allPublications}}>{children }</GeneralContext.Provider>
    )
}

export default GeneralContextProvider;