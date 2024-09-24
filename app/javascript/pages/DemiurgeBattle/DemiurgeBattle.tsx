import { CHARACTERS, SessionContext } from 'Game'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { useHistory } from 'react-router-dom'
import demiurge from 'images/demiurge.png'
import AnswerForm from 'components/Layout/AnswerForm'
import { sample } from 'lodash'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './DemiurgeBattle.scss'

const DemiurgeBattle: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages, bosses } = useContext(SessionContext)
  const [phase, setPhase] = useState(null)
  const history = useHistory()

  if(bosses.map(({ name }) => name).includes('demiurge')) {
    history.replace(`/app/${i18n.locale}/map`)
  }

  useEffect(() => {
    setDialogueBarMessages([
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.28') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.29') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.30') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.31') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.32') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.33') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.34'), onCloseMessage: () => setPhase(1) }
    ])}, [])

  useEffect(() => {
    if(phase === 0) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.35') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.36') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.37') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.38'), onCloseMessage: () => setPhase(2) },
      ])
    }
  }, [phase])
  

  return <div className='DemiurgeBattle'>
    {phase === 1 && <Phase1 onPhaseCleared={() => setPhase(2)} />}
    {phase === 2 && <Phase2 onPhaseCleared={() => setPhase(3)} onGameOver={() => setPhase(0) } />}
    {phase === 3 && <Phase3 onPhaseCleared={() => setPhase(4)} />}
    {phase === 4 && <Phase4 onPhaseCleared={() => setPhase(5)} />}
  </div>
}

const BUTTON_MARGIN_LEFT = [
  '0',
  '50%',
  '-75%',
  '0'
]

const DEMIURGE_MARGIN_LEFT = [
  '0',
  '0',
  '0',
  '0',
  '75%',
  '-80%'
]

type PhaseProps = {
  onPhaseCleared: () => void
  onGameOver?: () => void
}

const Phase1: React.FC<PhaseProps> = ({ onPhaseCleared }) => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [hitIndex, setHitIndex]  = useState(0)
  const dialogues_by_hit = useMemo(() => [
    i18n.t('demiurge.dialogues.39'),
    i18n.t('demiurge.dialogues.40'),
    i18n.t('demiurge.dialogues.41'),
    i18n.t('demiurge.dialogues.42'),
    i18n.t('demiurge.dialogues.43'),
    i18n.t('demiurge.dialogues.44')
  ], [])
  const isLastMessage = hitIndex === dialogues_by_hit.length - 1

  const handleButtonClick = () => {
    if(hitIndex > dialogues_by_hit.length - 1) {
      return null
    }
    setDialogueBarMessages([{ character: 'demiurge', message: dialogues_by_hit[hitIndex], notClosable: true, ...(isLastMessage && { onCloseMessage: onPhaseCleared, disappearAfterSeconds: 4 }) } ])
    setHitIndex(hitIndex + 1)
  }

  return <div className='Phase1'>
      <div className='demiurge-area'>
        <img src={demiurge} style={{ 'marginLeft': DEMIURGE_MARGIN_LEFT[hitIndex] }}/>
      </div>
      <Button style={{ 'marginLeft': BUTTON_MARGIN_LEFT[hitIndex] }} onClick={handleButtonClick}>HIT</Button>
    </div>
}

const NUMBER_OF_BUTTONS = 8

const DEMIURGE_POSITIONS = [
  5,
  2,
  7,
  3,
  0,
  1,
  4,
  6,
]

const INITIAL_HITS = 2
const REMAINING_HEALTH = 3

const Phase2: React.FC<PhaseProps> = ({ onPhaseCleared, onGameOver }) => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [canClickButtons, setCanClickButtons] = useState(true)
  const [classes, setClasses] = useState(Array(NUMBER_OF_BUTTONS).fill(''))
  const [demiurgePositionIndex, setDemiurgePositionIndex] = useState(Math.floor(Math.random() * DEMIURGE_POSITIONS.length))
  const [remainingHits, setRemainingHits] = useState(INITIAL_HITS)
  const [remainingHealth, setRemainingHealth] = useState(REMAINING_HEALTH)
  const [spin, setSpin] = useState(false)
  const [isTimeoutActive, setIsTimeoutActive] = useState(false)

  const handleButtonClick = (index: number) => {
    setCanClickButtons(false)
    if(index === DEMIURGE_POSITIONS[(demiurgePositionIndex + 1) % DEMIURGE_POSITIONS.length]) {
      setSpin(true)
      setRemainingHealth(remainingHealth - 1)
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.45'), disappearAfterSeconds: 4, onCloseMessage: () => setCanClickButtons(true) } 
      ])
    } else {
      setRemainingHits(remainingHits - 1)
    }
    const currentClasses = [...classes]
    currentClasses[index] = 'animate'
    setClasses(currentClasses)
    setDemiurgePositionIndex((demiurgePositionIndex + 1) % DEMIURGE_POSITIONS.length)
  }

  useEffect(() => {
    if(classes.filter((className) => className !== '').length > 0) {
      setIsTimeoutActive(true)
      const timeout = setTimeout(() => {
        setIsTimeoutActive(false)
        setSpin(false)
        setClasses(Array(NUMBER_OF_BUTTONS).fill(''))
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [classes])

  useEffect(() => {
    if(remainingHits === 1) {
      setCanClickButtons(false)
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.46'), disappearAfterSeconds: 2, onCloseMessage: () => setCanClickButtons(true) } 
      ])
    }
    if(remainingHits === 0) {
      setCanClickButtons(false)
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.47') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.48') },
        { title: 'GAME OVER!', message: i18n.t('demiurge.dialogues.49') },
        {character: 'demiurge', message: i18n.t('demiurge.dialogues.50'), onCloseMessage: () => onGameOver(), disappearAfterSeconds: 2}
      ])
    }

  }, [remainingHits])

  useEffect(() => {
    if(remainingHealth === 0) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.51'), onCloseMessage: () => onPhaseCleared() } 
      ])
    }
  }, [remainingHealth])

  return <div className='Phase2'>
      <div className='buttons'>
      {Array.from(Array(NUMBER_OF_BUTTONS).keys()).map((index) => {
          return <div key={index} className='button-area'>
            {index === DEMIURGE_POSITIONS[demiurgePositionIndex] && <img className={`${spin ? 'spin' : ''}`} src={demiurge}/>}
          </div>
        })}
      </div>
      <div className='buttons'>
        {Array.from(Array(NUMBER_OF_BUTTONS).keys()).map((index) => {
          return <div key={index} className='button-area' {...((!isTimeoutActive && canClickButtons) &&  { onClick: () => handleButtonClick(index)})}>
            {<span className={`ray ${classes[index]}`}></span>}
            <Button disabled={(isTimeoutActive || !canClickButtons)}>HIT</Button>
          </div>
        })}
      </div>
    </div>
}

const ANSWERS = [
  11,
  20,
  9
]


const Phase3: React.FC<PhaseProps> = ({ onPhaseCleared }) => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [riddleIndex, setRiddleIndex] = useState(Math.floor(Math.random() * ANSWERS.length))
  const [firstNumber, setFirstNumber] = useState(() => Math.floor(Math.random() * 8))
  const [fakeResult, setFakeResult] = useState(() => sample([10, 12, 13, 14, 15, 16, 17, 18, 19]))
  const [answer, setAnswer] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const message = i18n.t('demiurge.dialogues.52', { first: firstNumber, fake_result: fakeResult })
    setDialogueBarMessages([
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.53')},
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.54') },
      { character: 'demiurge', message, onCloseMessage: () => { setShowForm(true); setMessage(message) } }
    ])}, [])

    useEffect(() => {
      if(answer) {
        setMessage(null)
        setShowForm(false)
        if((isNaN(answer) ? 0 : parseInt(answer)) + firstNumber !== ANSWERS[riddleIndex]) {
          setDialogueBarMessages([
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.55', { first: firstNumber, answer, result: fakeResult }) }
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.55', { first: firstNumber, answer, result: ANSWERS[riddleIndex] }) },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.56') },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.57', { first: firstNumber, answer, result: ANSWERS[riddleIndex] }) },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.58', { result: ANSWERS[riddleIndex] }) },
            { title: 'GAME OVER!', message: i18n.t('demiurge.dialogues.59') },
            {character: 'demiurge', message: i18n.t('demiurge.dialogues.60'), disappearAfterSeconds: 3, onCloseMessage: () => {
            setRiddleIndex((riddleIndex + 1) % ANSWERS.length)
            const firstNumber = Math.floor(Math.random() * 8)
            setFirstNumber(firstNumber)
            const fakeResult = Math.floor(Math.random() * 8) + 9
            setFakeResult(fakeResult)
            const message = i18n.t('demiurge.dialogues.52', { first: firstNumber, fake_result: fakeResult })
            setDialogueBarMessages([
              { character: 'demiurge', message: i18n.t('demiurge.dialogues.53') },
              { character: 'demiurge', message: i18n.t('demiurge.dialogues.54') },
              { character: 'demiurge', message, onCloseMessage: () => { setShowForm(true); setMessage(message) } }
            ])
          }}
          ])
        } else {
          setDialogueBarMessages([
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.55', { first: firstNumber, answer, result: fakeResult }) },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.55', { first: firstNumber, answer, result: ANSWERS[riddleIndex] }) },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.56') },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.61') },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.62') },
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.63')},
            { character: 'demiurge', message: i18n.t('demiurge.dialogues.64'), onCloseMessage: () => onPhaseCleared() }
          ])
        }
      }
    }, [answer])

  const checkAnswer = answer => {
      setAnswer(answer)
      return Promise.resolve({ data: { ok: true } })
  }

  return <div className='Phase3'>
      <div className='demiurge-area'>
        <img src={demiurge} />
      </div>
      {message && <span>{message}</span>}
      {showForm && <AnswerForm numberInput checkAnswer={checkAnswer} onWrongAnswer={null} onCorrectAnswer={null} />}
    </div>
}

const EMAIL_REGEX = /^[^@]+@[^@]+\.\w+$/

const Phase4: React.FC<PhaseProps> = ({ onPhaseCleared }) => {
  const i18n = useContext(TranslatorContext)
  const history = useHistory()
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState(null)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isAgeError, setIsAgeError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isBossDefeated, setIsBossDefeated] = useState(false)

  useEffect(() => {
    const message = i18n.t('demiurge.dialogues.65')
    setDialogueBarMessages([
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.66') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.67') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.68') },
      { character: 'demiurge', message, disappearAfterSeconds: 5, onCloseMessage: () => { setShowForm(true); setMessage(message) } },
    ])}, [])

    useEffect(() => {
      if(isAgeError && isEmailError && isPasswordError) {
        setDialogueBarMessages([
          { character: 'demiurge', message: i18n.t('demiurge.dialogues.69') },
          { character: 'demiurge', message: i18n.t('demiurge.dialogues.70') },
          { character: 'demiurge', message: i18n.t('demiurge.dialogues.71') },
          { character: 'demiurge', message: i18n.t('demiurge.dialogues.72'), disappearAfterSeconds: 3, onCloseMessage: () => setIsBossDefeated(true) },
          { message: i18n.t('demiurge.dialogues.73', { name: CHARACTERS['demiurge'].name}), disappearAfterSeconds: 3, onCloseMessage: () => handleBossDefeated() }
        ])
      }
    }, [isEmailError, isAgeError, isPasswordError])

  const checkEmailAnswer = (answer) => Promise.resolve({ data: { ok: EMAIL_REGEX.test(answer) } })

  const onCorrectEmailAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: i18n.t('demiurge.dialogues.74') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.75'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongEmailAnswer = () => {
    setIsEmailError(true)
    setShowForm(false)
    if(!(isAgeError && isPasswordError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.76'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const checkAgeAnswer = (answer) => Promise.resolve({ data: { ok: answer > 0 } })

  const onCorrectAgeAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: i18n.t('demiurge.dialogues.77') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.75'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongAgeAnswer = () => {
    setIsAgeError(true)
    setShowForm(false)
    if(!(isEmailError && isPasswordError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.76'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const checkPasswordAnswer = (answer) => Promise.resolve({ data: { ok: answer ? answer.length > 7 : false } })

  const onCorrectPasswordAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: i18n.t('demiurge.dialogues.78') },
      { character: 'demiurge', message: i18n.t('demiurge.dialogues.75'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongPasswordAnswer = () => {
    setIsPasswordError(true)
    setShowForm(false)
    if(!(isAgeError && isEmailError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.76'), disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'demiurge' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => history.replace(`/app/${i18n.locale}/map`))
  }

  return <div className='Phase3'>
      <div className='demiurge-area'>
        <img className={`${isBossDefeated ? 'away' : ''}`} src={demiurge} />
      </div>
      {message && <span>{message}</span>}
      {isEmailError ? <span className='error'>ERROR</span> : showForm && <AnswerForm checkAnswer={checkEmailAnswer} onWrongAnswer={onWrongEmailAnswer} onCorrectAnswer={onCorrectEmailAnswer} placeholder={i18n.t('demiurge.input_placeholder.email')} />}
      {isAgeError ? <span className='error'>ERROR</span> : showForm && <AnswerForm numberInput checkAnswer={checkAgeAnswer} onWrongAnswer={onWrongAgeAnswer} onCorrectAnswer={onCorrectAgeAnswer} placeholder={i18n.t('demiurge.input_placeholder.age')} />}
      {isPasswordError ? <span className='error'>ERROR</span> : showForm && <AnswerForm checkAnswer={checkPasswordAnswer} onWrongAnswer={onWrongPasswordAnswer} onCorrectAnswer={onCorrectPasswordAnswer} placeholder={i18n.t('demiurge.input_placeholder.password')} />}
    </div>
}

export default DemiurgeBattle
