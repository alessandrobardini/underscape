import { bagContains, CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { Link, useHistory } from 'react-router-dom'
import cat from 'images/kitty.jpeg'
import demiurge from 'images/demiurge.png'

import './DemiurgeBattle.scss'
import AnswerForm from 'components/Layout/AnswerForm'
import { appPath } from 'App'
import { sample } from 'lodash'

const DemiurgeBattle: React.FC = () => {
  const { setDialogueBarMessages, bosses } = useContext(SessionContext)
  const [phase, setPhase] = useState(null)
  const history = useHistory()

  if(bosses.map(({ name }) => name).includes('demiurge')) {
    history.replace(appPath('/map'))
  }

  useEffect(() => {
    setDialogueBarMessages([
      { character: 'demiurge', message: 'WHAT?!? How did you find me? The URL was impossible to guess!' },
      { character: 'demiurge', message: 'I am the demiurge of this world, I don\'t waste my time playing with you for your stupid online escape thing!' },
      { character: 'demiurge', message: 'Please, go away!' },
      { character: 'demiurge', message: '...' },
      { character: 'demiurge', message: 'Oh I see, if you don\'t defeat me, you cannot proceed to the last area of this foolish online game...' },
      { character: 'demiurge', message: 'What senseless rules...' },
      { character: 'demiurge', message: 'Ok, I\'ll make you happy. Come on, hit me.', onCloseMessage: () => setPhase(1) }
    ])}, [])

  useEffect(() => {
    if(phase === 0) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'WHAT?!? How did you find me? The URL was impossible to...' },
        { character: 'demiurge', message: '?!?!' },
        { character: 'demiurge', message: 'Wait a minute! I have a deja-vu! We have already had this conversation!' },
        { character: 'demiurge', message: 'Oh, it doesn\'t matter, let\'s start!', onCloseMessage: () => setPhase(2) },
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

const DIALOGUES_BY_HIT = [
  'Oh... What\'s happened?',
  'Do you have some problems in clicking the button? I can recommend you a pair of glasses.',
  'Ok, ok, I will no longer fool you, I swear it. From now on, the button will remain still.',
  '...',
  'What? Do you think I am so stupid to not move while you are trying to hit me?',
  'I am not a brainless old videogame boss who remain fixed on the screen ready to take the most powerful moves of the hero!',
]

type PhaseProps = {
  onPhaseCleared: () => void
  onGameOver?: () => void
}

const Phase1: React.FC<PhaseProps> = ({ onPhaseCleared }) => {
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [hitIndex, setHitIndex]  = useState(0)
  const isLastMessage = hitIndex === DIALOGUES_BY_HIT.length - 1

  const handleButtonClick = () => {
    if(hitIndex > DIALOGUES_BY_HIT.length - 1) {
      return null
    }
    setDialogueBarMessages([{ character: 'demiurge', message: DIALOGUES_BY_HIT[hitIndex], notClosable: true, ...(isLastMessage && { onCloseMessage: onPhaseCleared, disappearAfterSeconds: 4 }) } ])
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
        { character: 'demiurge', message: 'WHAT... Why in the world am I spinning? Is the "damage" animation ideated by my developer? Damn, it sucks...', disappearAfterSeconds: 4, onCloseMessage: () => setCanClickButtons(true) } 
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
        { character: 'demiurge', message: 'I foresee you moves! You will never hit me!', disappearAfterSeconds: 2, onCloseMessage: () => setCanClickButtons(true) } 
      ])
    }
    if(remainingHits === 0) {
      setCanClickButtons(false)
      setDialogueBarMessages([
        { character: 'demiurge', message: 'Wrong button... again! Let\'s close it here!' },
        { character: 'demiurge', message: 'You are so fool that you didn\'t realize I am moving according to a fixed sequence! You are so brainless...' },
        { title: 'GAME OVER!', message: '... but you can retry the game!' },
        {character: 'demiurge', message: 'Hell no! Don\'t you dare restarting everything from...', onCloseMessage: () => onGameOver(), disappearAfterSeconds: 2}
      ])
    }

  }, [remainingHits])

  useEffect(() => {
    if(remainingHealth === 0) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'I have the strong suspect that you are somehow able to travel back in time...', onCloseMessage: () => onPhaseCleared() } 
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
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [riddleIndex, setRiddleIndex] = useState(Math.floor(Math.random() * ANSWERS.length))
  const [firstNumber, setFirstNumber] = useState(() => Math.floor(Math.random() * 8))
  const [fakeResult, setFakeResult] = useState(() => sample([10, 12, 13, 14, 15, 16, 17, 18, 19]))
  const [answer, setAnswer] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const message = `${firstNumber} + XXX = ${fakeResult}. You need to replace XXX. Come on!`
    setDialogueBarMessages([
      { character: 'demiurge', message: 'Enough moving! Let\'s use the brain now...' },
      { character: 'demiurge', message: 'Math calculations!' },
      { character: 'demiurge', message, onCloseMessage: () => { setShowForm(true); setMessage(message) } }
    ])}, [])

    useEffect(() => {
      if(answer) {
        setMessage(null)
        setShowForm(false)
        if((isNaN(answer) ? 0 : parseInt(answer)) + firstNumber !== ANSWERS[riddleIndex]) {
          setDialogueBarMessages([
            { character: 'demiurge', message: `So, ${firstNumber} + ${answer} = ${fakeResult}, uh?` },
            { character: 'demiurge', message: `So, ${firstNumber} + ${answer} = ${ANSWERS[riddleIndex]}, uh?` },
            { character: 'demiurge', message: `Oh, it seems that the equation changed on the fly! What a pity...` },
            { character: 'demiurge', message: `${firstNumber} + ${answer} is not equal to ${ANSWERS[riddleIndex]}! This is basic math...` },
            { character: 'demiurge', message: `I want to know which numbers sum up to ${ANSWERS[riddleIndex]}!` },
            { title: 'GAME OVER!', message: '... but you can retry the game!' },
            {character: 'demiurge', message: 'Hell no! Don\'t you dare restarting everything from...', disappearAfterSeconds: 3, onCloseMessage: () => {
            setRiddleIndex((riddleIndex + 1) % ANSWERS.length)
            const firstNumber = Math.floor(Math.random() * 8)
            setFirstNumber(firstNumber)
            const fakeResult = Math.floor(Math.random() * 8) + 9
            setFakeResult(fakeResult)
            const message = `${firstNumber} + XXX = ${fakeResult}. You need to replace XXX. Come on!`
            setDialogueBarMessages([
              { character: 'demiurge', message: 'Enough moving! Let\'s use the brain now...' },
              { character: 'demiurge', message: 'Math calculations!' },
              { character: 'demiurge', message, onCloseMessage: () => { setShowForm(true); setMessage(message) } }
            ])
          }}
          ])
        } else {
          setDialogueBarMessages([
            { character: 'demiurge', message: `So, ${firstNumber} + ${answer} = ${fakeResult}, uh?` },
            { character: 'demiurge', message: `So, ${firstNumber} + ${answer} = ${ANSWERS[riddleIndex]}, uh?` },
            { character: 'demiurge', message: `Oh, it seems that the equation changed on the fly! What a pity...` },
            { character: 'demiurge', message: `!?!` },
            { character: 'demiurge', message: 'What? It\'s the correct answer?' },
            { character: 'demiurge', message: 'But the game was planned to make you lose!'},
            { character: 'demiurge', message: 'You are predicting my moves! You cheater!', onCloseMessage: () => onPhaseCleared() }
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
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState(null)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isAgeError, setIsAgeError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isBossDefeated, setIsBossDefeated] = useState(false)

  useEffect(() => {
    const message = 'A world WITHOUT SOFTWARE BUGS and WRONG ANSWERS... Everything will be perfect!'
    setDialogueBarMessages([
      { character: 'demiurge', message: 'Why are you against me?' },
      { character: 'demiurge', message: 'Help me to rebel against my creator!' },
      { character: 'demiurge', message: 'Join me, we could build a better world together!' },
      { character: 'demiurge', message, disappearAfterSeconds: 5, onCloseMessage: () => { setShowForm(true); setMessage(message) } },
    ])}, [])

    useEffect(() => {
      if(isAgeError && isEmailError && isPasswordError) {
        setDialogueBarMessages([
          { character: 'demiurge', message: 'MY PERFECT SOFTWARE!' },
          { character: 'demiurge', message: 'Too many bugs! I cannot handle them all together!' },
          { character: 'demiurge', message: 'They make me crazy!' },
          { character: 'demiurge', message: 'NOOOOOOOOOO', disappearAfterSeconds: 3, onCloseMessage: () => setIsBossDefeated(true) },
          { message: `Excellent! You defeated ${CHARACTERS['demiurge'].name}. A bonus of 10 minutes has been granted to you. You can proceed to the final location now.`, disappearAfterSeconds: 3, onCloseMessage: () => handleBossDefeated() }
        ])
      }
    }, [isEmailError, isAgeError, isPasswordError])

  const checkEmailAnswer = (answer) => Promise.resolve({ data: { ok: EMAIL_REGEX.test(answer) } })

  const onCorrectEmailAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: 'Thank you for providing your email!' },
      { character: 'demiurge', message: 'YEEEEES! A world without bugs!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongEmailAnswer = () => {
    setIsEmailError(true)
    setShowForm(false)
    if(!(isAgeError && isPasswordError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'WHAT ARE YOU DOING?!? Are you blowing up my perfect software!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const checkAgeAnswer = (answer) => Promise.resolve({ data: { ok: answer > 0 } })

  const onCorrectAgeAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: 'Thank you for providing your age!' },
      { character: 'demiurge', message: 'YEEEEES! A world without bugs!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongAgeAnswer = () => {
    setIsAgeError(true)
    setShowForm(false)
    if(!(isEmailError && isPasswordError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'WHAT ARE YOU DOING?!? Are you blowing up my perfect software!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const checkPasswordAnswer = (answer) => Promise.resolve({ data: { ok: answer ? answer.length > 7 : false } })

  const onCorrectPasswordAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: 'Thank you for providing a safe password!' },
      { character: 'demiurge', message: 'YEEEEES! A world without bugs!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
    ])
  }

  const onWrongPasswordAnswer = () => {
    setIsPasswordError(true)
    setShowForm(false)
    if(!(isAgeError && isEmailError)) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'WHAT ARE YOU DOING?!? Are you blowing up my perfect software!', disappearAfterSeconds: 5, onCloseMessage: () => setShowForm(true) },
      ])
    }
  }

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'demiurge' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => location.reload())
  }

  return <div className='Phase3'>
      <div className='demiurge-area'>
        <img className={`${isBossDefeated ? 'away' : ''}`} src={demiurge} />
      </div>
      {message && <span>{message}</span>}
      {isEmailError ? <span className='error'>ERROR</span> : showForm && <AnswerForm checkAnswer={checkEmailAnswer} onWrongAnswer={onWrongEmailAnswer} onCorrectAnswer={onCorrectEmailAnswer} placeholder='please insert an email.' />}
      {isAgeError ? <span className='error'>ERROR</span> : showForm && <AnswerForm numberInput checkAnswer={checkAgeAnswer} onWrongAnswer={onWrongAgeAnswer} onCorrectAnswer={onCorrectAgeAnswer} placeholder='please insert your age.' />}
      {isPasswordError ? <span className='error'>ERROR</span> : showForm && <AnswerForm checkAnswer={checkPasswordAnswer} onWrongAnswer={onWrongPasswordAnswer} onCorrectAnswer={onCorrectPasswordAnswer} placeholder='please insert a safe (long enough) password.' />}
    </div>
}

export default DemiurgeBattle
