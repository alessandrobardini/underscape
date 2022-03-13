import {  SessionContext } from 'Game'
import React, { useContext, useState } from 'react'
import Button from 'ui/Button'
import Input from 'ui/Input'
import Form from '../Form'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'

import './AnswerSubmission.scss'

type AnswerSubmissionProps = {
  errorMessage: string
  explanations: Array<string>
  riddle: string
  onCorrectAnswerSubmission?: Function
}

const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({ errorMessage: errorMessageText, explanations, riddle, onCorrectAnswerSubmission }) => {
  const { refetch } = useContext(SessionContext)
  const [errorMessage, setErrorMessage] = useState<string>(null)

  const handleSubmit = ({ answer }, { resetForm }) => {
    checkAnswer(riddle, answer).then(({ data: { ok } }) => {
      resetForm()
      if (ok) {
        refetch()
        onCorrectAnswerSubmission && onCorrectAnswerSubmission()
      } else {
        setErrorMessage(errorMessageText)
      }
    })
  }
  
  return <div className='AnswerSubmission'>
    <div className='text'>
      {explanations.map(((explanation, index) => 
        <span key={index} className='explanation'>{explanation}</span>
      ))}
      <span className='submission-result'>
        {errorMessage && <span className='error-message'>{errorMessage}</span>}
      </span>
    </div>
    <Form onSubmit={handleSubmit} initialValues={{answer: ''}}>
      {({ errors, touched, values, setFieldValue }) => (
          <>
            <Input
              formik
              name='answer'
              errors={errors}
              touched={touched}
              value={values.answer}
              setFieldValue={setFieldValue}
            />
            <Button submit type='primary'>Submit</Button>
          </>
      )}
    </Form>
  </div>
}

const checkAnswer = (riddle: string, answer: string) => {
  return axios.post(
    '/answers',
    { riddle, answer, authenticity_token: csrfToken() },
    { headers: { Accept: 'application/json' }, responseType: 'json' }
  )
}

export default AnswerSubmission