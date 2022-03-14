import React, { useState, useEffect } from 'react'
import Button from 'ui/Button'

import './SorryToDisturb.scss'

const QUERIES = [
  { ean: '5000112638837', title: 'Coca Cola', detail: ' (1l, Glas)' },
  { ean: '90162565', title: 'Red Bull', detail: '' }
]

const successMessage = 'Great, thanks for all the help!'
const failureMessage = 'Hm, no, that\'s not it... could you check once more?'

const SorryToDisturb = () => {
  const [answered, setAnswered] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!currentQuestion) {
      const timer = setTimeout(() => {
        const candidates = QUERIES.map((_, i) => i).filter(i => !answered.includes(i))
        if (candidates.length > 0) {
          setCurrentQuestion({
            index: candidates[Math.floor(Math.random() * candidates.length)],
            unknown: Math.random() > 0.5 ? 'ean' : 'title'
          })
        }
      }, randomDelay(1, 30))
      return () => clearTimeout(timer)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (currentQuestion && messages.length === 0) {
      setMessages([generateQuestionMessage(currentQuestion)])
    }
  }, [currentQuestion])

  const suspend = () => {
    setAnswered([...answered, currentQuestion.index])
    setCurrentQuestion(null)
    setMessages([])
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!draft) {
      return
    }

    setDraft('')

    if (draft === expectedAnswer(currentQuestion)) {
      setMessages([...messages, { from: 'ME', text: draft }, { from: 'PM', text: successMessage }])
      setTimeout(suspend, 1500)
    } else {
      console.log('got', draft, 'expected', expectedAnswer(currentQuestion))
      setMessages([...messages, { from: 'ME', text: draft }, { from: 'PM', text: failureMessage }])
    }
  }

  const handleDraftChange = (event: React.ChangeEvent<HTMLInputElement>) => setDraft(event.currentTarget.value)

  if (!currentQuestion) {
    return null
  }

  return (
    <div id='SorryToDisturb'>
      <div className='backdrop' />
      <div className='conversation'>
        {messages.map((message, i) => (
          <div className='message' key={i}>
            <div className='from'>{message.from}</div>
            <div className='text'>{message.text}</div>
            {i === messages.length - 1 && <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Reply' value={draft} onChange={handleDraftChange} autoFocus />
              <Button submit icon iconLeft='fa fa-paper-plane' />
            </form>}
          </div>
        ))}
      </div>
    </div>
  )
}

const generateQuestionMessage = (question) => {
  const prefix = `Sorry to disturb you, I know you're busy!\nSuper quick question`
  let text = ''
  const query = QUERIES[question.index]
  switch (question.unknown) {
    case 'ean':
      text = `${prefix}: could you tell me the EAN of ${query.title}${query.detail}?`
    case 'title':
      text = `${prefix}: could you tell me the title of the product with EAN ${query.ean}?`
  }
  return { from: 'PM', text }
}

const expectedAnswer = (question) => QUERIES[question.index][question.unknown]

const randomDelay = (minMinutes: number, maxMinutes: number) => maxMinutes * Math.floor(Math.random() * (maxMinutes - minMinutes)) * 60e3
// FOR TESTING:
//const randomDelay = () => 100

export default SorryToDisturb
