import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../styles/PublicationPage.css'
import TextField from '@mui/material/TextField';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PublicationPage = () => {

  const navigate = useNavigate();

  const [viewPdf, setViewPdf] = useState(null);

  const {id} = useParams();

  // const defaultPdfPath = '/pdfs/1706161119649cat result 2023.pdf';



  const newplugin = defaultLayoutPlugin();

  const [publication, setPublication] = useState();

  useEffect(() => {
    getPublication();
  },[])  
  const getPublication = async () => {
    await axios.get(`http://localhost:6001/fetch-publication/${id}`).then(
      (res)=>{
        setPublication(res.data);
        setViewPdf('/pdfs/' + res.data.pdfFileName);
      }
    )
  }


  const [evaluatorsNote, setEvaluatorsNote] = useState('');

  const handleApprove = async () => {
      await axios.post(`http://localhost:6001/approve-publication/${id}`, {evaluator: localStorage.getItem('username'), evaluatorId: localStorage.getItem('userId') ,evaluatorsNote: evaluatorsNote, evaluationDate: new Date()}).then(
        (res)=>{
          alert("Publication approved successfully");
          navigate('/completed-evaluations');
        }
      )
  }

  const handleReject = async () => {
        await axios.post(`http://localhost:6001/reject-publication/${id}`, {evaluator: localStorage.getItem('username'), evaluatorId: localStorage.getItem('userId') ,evaluatorsNote: evaluatorsNote, evaluationDate: new Date()}).then(
        (res)=>{
          alert("Publication rejected")
          navigate('/completed-evaluations')
          
        }
      )
  }

  return (

    <>
        {publication ?
          
            <div  className='Publication-page'>


              <div className="publication-data">

                <h2>{publication.title}</h2>
                <p className='description' >{publication.description}</p>
                <span>
                  <h4>Author: <i>{publication.author}</i></h4>
                  <h4>Domain: <i>{publication.domain}</i></h4>
                  <b>Publication date: <i>{publication.publishedDate.slice(0,16)}</i></b>
                </span>
                <div className="publication-page-keywords">
                  <h5>Keywords:</h5>
                  <span>
                    {publication.keywords.map((keyword) => (
                      <p key={keyword}>{keyword}</p>
                    ))}
                  </span>
                </div>

                {publication.status === 'pending' && localStorage.getItem('usertype') === 'evaluator' ?
                
                  <div className="evaluators-publication-inputs">
                    <TextField
                      className="evaluators-publication-input"
                      id="outlined-multiline-flexible"
                      label="Evalator's note"
                      multiline
                      minRows={3}
                      onChange={(e)=>setEvaluatorsNote(e.target.value)}
                    />
                    <div>
                      <Button variant="contained" onClick={handleApprove} >Approve</Button>
                      <Button variant="contained" color='error' onClick={handleReject} >Reject</Button>
                    </div>
                  </div>
                :""}

              </div>


              {publication.status === 'approved' ?

                <div className="publication-status">
                  <h3>Status: <i>Approved</i></h3>
                  <h3>Evaluation date: <i>{publication.evaluationDate}</i></h3>
                </div>

                :  ''
              }

              <div className="pdf-container">
                <h3>Publication paper</h3>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewPdf && <>
                      <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                    </>}
                    {!viewPdf && <>No pdf</>}
                </Worker>
              </div>


            
          </div>
        :"Loading..."}
    </>
  )
}

export default PublicationPage