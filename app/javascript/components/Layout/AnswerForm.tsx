import {  SessionContext } from 'Game'
import React, { useContext } from 'react'
import Button from 'ui/Button'
import Input from 'ui/Input'
import Form from './Form'

import './AnswerForm.scss'

type AnswerFormProps = {
  checkAnswer: (answer: string) => Promise<{ data: { ok }}>
  onCorrectAnswer?: () => void
  onWrongAnswer?: () => void
}

const AnswerForm: React.FC<AnswerFormProps> = ({ checkAnswer, onCorrectAnswer, onWrongAnswer }) => {
  const { refetch } = useContext(SessionContext)

  const handleSubmit = ({ answer }, { resetForm }) => {
    checkAnswer(answer).then(({ data: { ok } }) => {
      resetForm()
      if (ok) {
        refetch()
        onCorrectAnswer && onCorrectAnswer()
      } else {
        onWrongAnswer && onWrongAnswer()
      }
    })
  }
  
  return <Form className='AnswerForm' onSubmit={handleSubmit} initialValues={{answer: ''}}>
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
}

export default AnswerForm