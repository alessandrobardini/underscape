import { checkAnswer, ITEMS, SessionContext } from 'Game'
import React, { useContext, useState } from 'react'
import Button from 'ui/Button'
import Input from 'ui/Input'
import Form from '../Form'

import './AnswerSubmission.scss'

type AnswerSubmissionProps = {
  message: string
  errorMessage: string
  explanations: Array<string>
  riddle: string
}

const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({ message: messageText, errorMessage: errorMessageText, explanations, riddle }) => {
  const [message, setMessage] = useState<string>(null)
  const [errorMessage, setErrorMessage] = useState<string>(null)

  const handleSubmit = ({ answer }, { resetForm }) => {
    checkAnswer(riddle, answer).then(({ data: { ok } }) => {
      resetForm()
      if (ok) {
        setErrorMessage(null)
        setMessage(messageText)
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
        {message && <span className='message'>{message}</span>}
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

export default AnswerSubmission