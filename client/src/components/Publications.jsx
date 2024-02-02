import React, { useContext, useEffect, useState } from 'react'
import '../styles/Publications.css'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { GeneralContext } from '../context/GeneralContext';
import { all } from 'axios';
import { useNavigate } from 'react-router-dom';

const Publications = ({page}) => {

    const navigate = useNavigate();

    const {allPublications} = useContext(GeneralContext);

    const [displayPublications, setDisplayPublications] = useState([]);

    const [allDomains, setAllDomains] = useState([]);

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

        if (page === 'home') {
            
            let publications = allPublications.filter((publication) => (publication.status === 'accepted' || publication.authorId === localStorage.getItem('userId')));
            setDisplayPublications(publications);
            console.log(publications);
            
        } else if (page === 'self') {
    
            let publications = allPublications.filter((publication) => publication.authorId === localStorage.getItem('userId'));
            setDisplayPublications(publications);
    
        } else if (page === 'admin') {
            setDisplayPublications(allPublications);
        }
    }, [allPublications])


    const [searchText, setSearchText] = useState('');
    const [searchDomain, setSearchDomain] = useState('');

    useEffect(() => {

        if (searchDomain === '') {
            let publications = allPublications.filter((publication) => (publication.title.toLowerCase().includes(searchText.toLowerCase()) || publication.domain.toLowerCase().includes(searchText.toLowerCase())  || publication.author.toLowerCase().includes(searchText.toLowerCase())));
            setDisplayPublications(publications);
            console.log(searchText);
        } else {
        
            let publications = allPublications.filter((publication) => (publication.title.toLowerCase().includes(searchText.toLowerCase()) || publication.domain.toLowerCase().includes(searchText.toLowerCase()) || publication.author.toLowerCase().includes(searchText.toLowerCase())) && publication.domain === searchDomain);
            setDisplayPublications(publications);
            console.log(searchText, searchDomain);
        }
    }, [searchText, searchDomain]);


    


  return (

    <div className="publications-container">
        <div className="publications-head">
            <div className="publications-head-content">
                {page === 'self' ? 
                    <h2>My Publications</h2>
                : <h2>All Publications</h2>}

                <div className="publications-header-filter">

                    
                    <div className="publications-search-body">
                        <SearchIcon className='search-icon' />

                        <input type="text" placeholder='Search...' className='publications-search-input' onChange={(e)=> setSearchText(e.target.value)}  />


                    </div>


                    <FormControl fullWidth className='publications-header-select' size="small" >
                        <InputLabel id="demo-select-small-label">Popular domains</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-simple-select"
                            label="Popular domains"
                            value={searchDomain}
                            onChange={(e)=>setSearchDomain(e.target.value)}
                        >
                            <MenuItem value=''>All</MenuItem>
                            {allDomains.map((domain) => (
                                <MenuItem value={domain} key={domain} >{domain}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>


            </div>
                <hr className='publications-header-hr' />
        </div>

        <div className="publications-body">

            {displayPublications && displayPublications.map((publication) => (
                
                <div className="publication" key={publication._id} onClick={()=> navigate(`/publication/${publication._id}`)} >

                    <img className="publication-image" src={publication.bannerImg} alt="" />
                    
                    <div className="publication-content">
                        <h3>{publication.title.slice(0,83)}{publication.title.length > 83 ? '...' : '' }</h3>
                        <span>
                            {page !== 'self' ? <p>Author: <i>{publication.author}</i></p> : null}
                            {page !== 'self' ? <p>Domain: <i>{publication.domain}</i></p> : null}
                        </span>
                        <span>
                            <p>Published on: <i>{publication.publishedDate.slice(4,16)}</i></p>
                            {page === 'admin' && publication.status !== 'pending' ? <p>Evaluated on: <i>{publication.evaluationDate.slice(0,10)}</i></p> : null}
                        </span>
                        {page !== 'home' ? <p>Status: <i>{publication.status}</i></p> : null}

                        <div className="publication-keywords">
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

export default Publications