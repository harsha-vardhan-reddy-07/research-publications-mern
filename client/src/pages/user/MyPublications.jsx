import React from 'react'
import Publications from '../../components/Publications'

const MyPublications = () => {

  const page = "self";

  return (
    <div className='GeneralPage' >
        <Publications page={page} />
    </div>
  )
}

export default MyPublications