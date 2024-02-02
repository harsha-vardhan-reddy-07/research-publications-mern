import React from 'react'
import Publications from '../../components/Publications'

const AllPublications = () => {

  const page = 'admin';

  return (
    <div className='GeneralPage' >
        <Publications page={page} />
    </div>
  )
}

export default AllPublications