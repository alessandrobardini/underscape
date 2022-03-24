import AnswerForm from 'components/Layout/AnswerForm'
import CountdownTimer from 'components/Layout/Countdown'
import { CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import goat from 'images/asriel.png'
import { sampleSize, shuffle } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'

import './GoatBossBattle.scss'

const COLORS = [
  { name: 'blue', operation: 'plus', operand: '5'},
  { name: 'orange', operation: 'plus', operand: '4'},
  { name: 'green', operation: 'plus', operand: '3'},
  { name: 'brown', operation: 'plus', operand: '2'},
  { name: 'grey', operation: 'plus', operand: '1'},
  { name: 'red', operation: 'minus', operand: '1'},
  { name: 'black', operation: 'minus', operand: '2'},
  { name: 'yellow', operation: 'minus', operand: '3'},
  { name: 'violet', operation: 'minus', operand: '4'},
  { name: 'pink', operation: 'minus', operand: '5'},
  { name: 'aqua', operation: 'minus', operand: '6'},
]

const GoatBossBattle: React.FC = () => {
  const { setDialogueBarMessages, bosses } = useContext(SessionContext)
  const [heartPosition, setHeartPosition] = useState(0)
  const [fogs, setFogs] = useState([])
  const [showGame, setShowGame] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedOption, setSelectedOption] = useState('plus')

  useEffect(() => {
    const fogs = sampleSize(COLORS, 3)
    setFogs(fogs)
    setDialogueBarMessages([
      {message: 'Come on, noble heart! One last effort before meeting the king!'},
      {message: `Destroy the three colored fogs and ${CHARACTERS['goat'].name} will be annihilated by your shimmer!`, onCloseMessage: () => setShowGame(true)},
      {message: `I am the ${fogs[0].name} fog! Your journey ends here!`, onCloseMessage: () => setShowForm(true)},
    ])
  }, [])

  useEffect(() => {
    if(heartPosition === 3) {
      setDialogueBarMessages([
        { character: 'goat', message: 'NO, NO, NO! Go away!' },
        { character: 'goat', message: 'Please, warrior of light! You make me blind!' },
        { message: '...' },
        { message: 'You finally decide to turn off the torch of your smartphone.' },
        { character: 'goat', message: '?!?' },
        { character: 'goat', message: 'Wait, a minute! The light came from that thing! Not from your heart!' },
        { character: 'goat', message: 'So... You are not the warrior of the light!' },
        { character: 'goat', message: '...' },
        { character: 'goat', message: 'Oh well, nevermind.' },
        { character: 'goat', message: 'So, wanna meet our king? Come on, follow me!', onCloseMessage: () => handleBossDefeated() }
      ])  
    }
    else if(heartPosition > 0) {
      setDialogueBarMessages([
        {message: `I am the ${fogs[heartPosition].name} fog! Your journey ends here!`, onCloseMessage: () => setShowForm(true)},
      ])
    }
  }, [heartPosition])

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'goat' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => location.reload())
  }

  const checkAnswer = answer => {
      return Promise.resolve({ data: { ok: selectedOption === fogs[heartPosition].operation && answer == fogs[heartPosition].operand } });
  }

  const handleWrongAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: `Oh no! This is not effective agains the colored fog...` },
      { character: 'goat', message: 'What a relief! My sensible eyes are safe, for today!' },
      { title: 'GAME OVER!', message: '... but you can retry the battle!', onCloseMessage: () => location.reload() }
    ])
  }

  const handleCorrectAnswer = () => {
    setShowForm(false)
    if(heartPosition == 2) {
      setHeartPosition(3)
    } else {
      setDialogueBarMessages([
        { message: `Great move, noble heart! The fog is defeated and you are closer to ${CHARACTERS['goat'].name}`, onCloseMessage: () => setHeartPosition(heartPosition + 1)  }
      ])
    }
  }

  return <div className='GoatBossBattle'>
    {showGame && <div className='row'>
      <div className='square'>
        {heartPosition === 0 && <div className='container'>
          <Heart />
        </div>
        }
      </div>
      <div className='square' style={{ backgroundColor: heartPosition > 0 ? 'white' : fogs[0].name}}>
        {heartPosition === 1 && <div className='container'>
            <Heart />
          </div>
        }
      </div>
      <div className='square' style={{ backgroundColor: heartPosition > 1 ? 'white' : fogs[1].name}}>
        {heartPosition === 2 && <div className='container'>
            <Heart />
          </div>
        }
      </div>
      <div className='square' style={{ backgroundColor: heartPosition > 2 ? 'white' : fogs[2].name}}>
        {heartPosition === 3 && <div className='container'>
            <Heart />
          </div>
        }
      </div>
      <div className='square'>
        <div className='goat-image'>
          <img src={goat}></img>
        </div>
      </div>
    </div>}
    {showForm && <div className='answer'>
      <div className='radio'>
        <input type="radio" value="plus" name="sign" checked={selectedOption === 'plus'} onChange={(e) => setSelectedOption('plus')} /> Plus
        <input type="radio" value="minus" name="sign" checked={selectedOption === 'minus'} onChange={() => setSelectedOption('minus')} /> Minus
      </div>
      <AnswerForm numberInput checkAnswer={checkAnswer} onWrongAnswer={handleWrongAnswer} onCorrectAnswer={handleCorrectAnswer} />
    </div>}
</div>
}

const Heart: React.FC = () =>
  <svg className={`strong-heart`} viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>

export default GoatBossBattle 
