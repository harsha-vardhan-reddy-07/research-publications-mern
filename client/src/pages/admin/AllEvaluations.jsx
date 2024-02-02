import React from 'react'
import EvaluatorPublications from '../../components/EvaluatorPublications'

const AllEvaluations = () => {
  const page = 'admin-evaluations'
  return (
    <div className='GeneralPage' >
        <EvaluatorPublications page={page} />
    </div>
  )
}

export default AllEvaluations