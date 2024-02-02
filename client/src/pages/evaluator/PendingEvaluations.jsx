import React from 'react'
import EvaluatorPublications from '../../components/EvaluatorPublications';

const PendingEvaluations = () => {
  const page = 'pending-evaluations';

  return (
    <div className='GeneralPage'>

        <EvaluatorPublications page={page} />

    </div>
  )
  }

export default PendingEvaluations