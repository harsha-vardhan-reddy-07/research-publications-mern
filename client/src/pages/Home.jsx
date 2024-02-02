import React from 'react'
import '../styles/Home.css'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Publications from '../components/Publications';

const Home = () => {

  const page = "home";

  return (
    <div className='GeneralPage' >

      

      <Publications page={page} />

    </div>
  )
}

export default Home