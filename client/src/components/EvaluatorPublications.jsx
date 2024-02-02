import React, { useContext, useEffect, useState } from 'react'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Publications.css'
import { GeneralContext } from '../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const EvaluatorPublications = ({page}) => {

    const {allPublications} = useContext(GeneralContext);

    const navigate = useNavigate();

    const [allDomains, setAllDomains] = useState([]);
    const [displayPublications, setDisplayPublications] = useState([]);

    useEffect(() => {
        let domains = [];
        allPublications.map((publication) => {
            if (!domains.includes(publication.domain)) {
                domains.push(publication.domain);
            }
        })
        setAllDomains(domains);
    }, [allPublications])

    useEffect(() => {

        if (page === 'pending-evaluations') {
            
            let publications = allPublications.filter((publication) => (publication.status === 'pending' && publication.domain === localStorage.getItem('domain')));

            setDisplayPublications(publications);
            console.log(publications)
            
        } else if (page === 'completed-evaluations') {
    
            let publications = allPublications.filter((publication) => ((publication.status === 'accepted' || publication.status === 'rejected') && publication.evaluatorId === localStorage.getItem('userId')));
            setDisplayPublications(publications);
    
        } else if (page === 'admin-evaluations') {
            let publications = allPublications.filter((publication) => (publication.status === 'accepted' || publication.status === 'rejected'));
            setDisplayPublications(publications);
        }
    }, [allPublications])
    

    const [search, setSearch] = useState('');

    useEffect(() => {

        
            if (page === 'pending-evaluations') {
                
                if (search !== '') {
                    let publications = allPublications.filter((publication) => ((publication.status === 'pending' && publication.domain === localStorage.getItem('domain')) && (publication.title.toLowerCase().includes(search.toLowerCase()) || publication.author.toLowerCase().includes(search.toLowerCase()) || publication.domain.toLowerCase().includes(search.toLowerCase()) || publication.keywords.includes(search.toLowerCase()))));
                    setDisplayPublications(publications);
                } else {
                    let publications = allPublications.filter((publication) => (publication.status === 'pending' && publication.domain === localStorage.getItem('domain')));
                    setDisplayPublications(publications);
                }
                
            } else if (page === 'completed-evaluations') {

                if (search !== '') {
                    let publications = allPublications.filter((publication) => ( ((publication.status === 'accepted' || publication.status === 'rejected') && publication.evaluatorId === localStorage.getItem('userId')) && ((publication.title.toLowerCase().includes(search.toLowerCase()) || publication.author.toLowerCase().includes(search.toLowerCase()) || publication.domain.toLowerCase().includes(search.toLowerCase()) || publication.keywords.includes(search.toLowerCase())))));
                    setDisplayPublications(publications);
                } else {
                    let publications = allPublications.filter((publication) => ((publication.status === 'accepted' || publication.status === 'rejected') && publication.evaluatorId === localStorage.getItem('userId')));
                    setDisplayPublications(publications);
                }
        
                
        
            } else if (page === 'admin-evaluations') {
                let publications = allPublications.filter((publication) => (publication.status === 'accepted' || publication.status === 'rejected'));
                setDisplayPublications(publications);
            }
        
    }, [search])




  return (

 

                    <div className="publications-container">
                        <div className="publications-head">
                            <div className="publications-head-content">

                                {page === 'pending-evaluations' ?
                                    <h2>Pending  Evaluations</h2>
                                :page === 'completed-evaluations' ?
                                    <h2>Completed  Evaluations</h2>
                                :page === 'admin-evaluations' ?
                                    <h2>All  Evaluations</h2>
                                :""
                                }

                                
                                    
                                <div className="publications-header-filter">
                                    <div className="publications-search-body">
                                        <SearchIcon className='search-icon' />
                                        <input type="text" placeholder='Search...' className='publications-search-input' onChange={(e)=> setSearch(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                                <hr className='publications-header-hr' />
                        </div>

                        
                            <div className="evaluator-publications-body">

                                {displayPublications.length>0 && displayPublications.map((publication) => (
                                    
                                    <div className="evaluator-publication" key={publication._id} onClick={()=> navigate(`/publication/${publication._id}`)} >

                                        <img className="evaluator-publication-image" src={publication.bannerImg} alt="" />
                                    
                                        <div className="evaluator-publication-content">
                                            <h3>{publication.title}</h3>
                                            {page === 'admin-evaluations' ?
                                            <p> <b>Note by Evaluator: </b> {publication.evaluationNote}</p>
                                            :
                                            <p>{publication.description}</p>
                                            }
                                            {page === 'completed-evaluations' ?
                                                <div>
                                                    <p><b>Published on:</b> <span>{publication.publishedDate.slice(0,20)}</span></p>
                                                    <p><b>Evaluated on:</b> <span>{publication.evaluationDate}</span></p>
                                                </div>
                                            :
                                                <p><b>Published on:</b> <span>{publication.publishedDate.slice(0,16)}</span></p>
                                            }

                                            {page === 'completed-evaluations' ?
                                                <>
                                                    <div>
                                                        <p><b>Author:</b> <span>{publication.author}</span></p>
                                                        <p><b>Domain:</b> <span>{publication.domain}</span></p>
                                                    </div>
                                                    <p><b>Status:</b> <span style={{color: 'green'}} >Accepted</span></p>
                                                </>
                                            :
                                                <>
                                                <p><b>Author:</b> <span>{publication.author}</span></p>
                                                <p><b>Domain:</b> <span>{publication.domain}</span></p>
                                                </>
                                            }
                                            

                                            <div className="evaluator-publication-keywords">
                                                {publication.keywords.map((keyword) => (
                                                    <p key={keyword}>{keyword}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>

                    </div>

  )
}

export default EvaluatorPublications