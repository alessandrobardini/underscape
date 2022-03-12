import { checkAnswer, ITEMS, SessionContext } from 'Game'
import React, { useContext, useState } from 'react'
import Button from 'ui/Button'
import Input from 'ui/Input'
import Form from '../Form'

import './AnswerSubmission.scss'

const AnswerSubmission: React.FC = () => {
  const [message, setMessage] = useState<string>(null)
  const [errorMessage, setErrorMessage] = useState<string>(null)

  const handleSubmit = ({ answer }, { resetForm }) => {
    checkAnswer('alchemist_cave', answer).then(({ data: { ok } }) => {
      resetForm()
      if (ok) {
        setErrorMessage(null)
        setMessage('Great job! You disabled the barrier')
      } else {
        setErrorMessage('The password is wrong...')
      }
    })
  }
  
  return <div className='AnswerSubmission'>
    <div className='text'>
      <span className='explanation'>The access to the cave seems to be blocked by an invisible barrier...</span>
      <span className='explanation'>You need to insert the password that disables it</span>
      <span className='submission-result'>
        {errorMessage && <span className='error-message'>{errorMessage}</span>}
        {message && <span className='message'>{message}</span>}
      </span>
      {/* <span className='riddle'>Taking RESPONSIBILITIES is elementary!</span> */}
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