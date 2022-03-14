import React, { useState } from 'react'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import AnswerForm from '../AnswerForm'

import './AnswerSubmission.scss'

type AnswerSubmissionProps = {
  errorMessage: string
  explanations: Array<string>
  riddle: string
  onCorrectAnswerSubmission?: () => void
}

const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({ errorMessage: errorMessageText, explanations, riddle, onCorrectAnswerSubmission }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  
  return <div className='AnswerSubmission'>
    <div className='text'>
      {explanations.map(((explanation, index) => 
        <span key={index} className='explanation'>{explanation}</span>
      ))}
      <span className='submission-result'>
        {errorMessage && <span className='error-message'>{errorMessage}</span>}
      </span>
    </div>
    <AnswerForm checkAnswer={checkAnswer(riddle)} onCorrectAnswer={onCorrectAnswerSubmission} onWrongAnswer={() => setErrorMessage(errorMessageText)} />
  </div>
}

const checkAnswer = (riddle: string) => (answer: string) => {
  return axios.post(
    '/answers',
    { riddle, answer, authenticity_token: csrfToken() },
    { headers: { Accept: 'application/json' }, responseType: 'json' }
  )
}

export default AnswerSubmission