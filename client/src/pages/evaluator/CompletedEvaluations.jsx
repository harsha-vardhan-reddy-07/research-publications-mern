import React from 'react'
import EvaluatorPublications from '../../components/EvaluatorPublications'

const CompletedEvaluations = () => {

  const page = 'completed-evaluations';

  return (
    <div className='GeneralPage'>

        <EvaluatorPublications page={page} />

    </div>
  )
}

export default CompletedEvaluations