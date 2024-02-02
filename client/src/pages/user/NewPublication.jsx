import React from 'react'
import '../../styles/NewPublication.css'
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const NewPublication = () => {


  const [publicationFile, setPublicationFile] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [bannerImg, setBannerImg] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [domain, setDomain] = React.useState('');

  
  const handleSubmit = async (e) => {
    try{

        e.preventDefault();
      
        let formData = new FormData();

        formData.append('file', publicationFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('bannerImg', bannerImg);
        formData.append('domain', domain);
        formData.append('keywords', keywords);
        formData.append('author', localStorage.getItem('username'));
        formData.append('authorId', localStorage.getItem('userId'));
        formData.append('publishedDate', new Date());

        console.log(formData);
  
        await axios.post('http://localhost:6001/new-publication', formData).then(
          (response)=>{
            console.log(response);
            alert('Publication added successfully');
            window.location.replace('/myPublications');
          }
        ).catch(
          (err)=>{
            console.log(err);
          }
        );
      }catch (error) {
      console.error(error);
    }
  }

  

  return (
    <div className='NewPublication-page'>

      <div className='NewPublication-container'>
        <h1 className='NewPublication-title'>New Publication</h1>
        <div className="newPublication-body">

            <TextField className='new-publication-input' id="outlined-basic publication-title" label="Research Title" variant="outlined" onChange={(e)=> setTitle(e.target.value)} value={title} />
            <TextField className='new-publication-input' id="outlined-multiline-static publication-description" label="Description" multiline rows={3}  onChange={(e)=> setDescription(e.target.value)} value={description} />
            <TextField className='new-publication-input' id="outlined-basic publication-banner-image" label="Banner Image" variant="outlined"  onChange={(e)=> setBannerImg(e.target.value)} value={bannerImg} />
            <div className='span-65-35'>
            <TextField className='new-publication-input' id="outlined-basic publication-keywords" label="Keywords (seperate with ' , ' ) " variant="outlined"  onChange={(e)=> setKeywords(e.target.value)} value={keywords} />
            <TextField className='new-publication-input' id="outlined-basic publication-domain" label="Domain" variant="outlined"  onChange={(e)=> setDomain(e.target.value)} value={domain} />
            </div>
            <div className="fileInput-body">
                <Button id='fileInput-btn' variant="text" component="label" startIcon={<CloudUploadIcon />}  >
                  Upload pdf (research paper)  &nbsp;
                  <Input className="fileInput" id="contained-button-file" name='file' accept='application/pdf'  type="file" onChange={(e)=>setPublicationFile(e.target.files[0])}  />
                </Button>
            </div>  

        </div>

        <Button variant="contained" className='newPublication-submit-btn' type='button' onClick={(e)=>handleSubmit(e)} >Publish</Button>
      </div>

    </div>
  )
}

export default NewPublication