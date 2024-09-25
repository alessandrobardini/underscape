import AnswerForm from 'components/Layout/AnswerForm'
import { CHARACTERS, SessionContext } from 'Game'
import goat from 'images/asriel.png'
import { sampleSize } from 'lodash'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { useHistory } from 'react-router-dom'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './GoatBossBattle.scss'

const GoatBossBattle: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const colors = useMemo(() => [
    { name: i18n.t('goat.colors.blue'), className: 'blue', operation: 'plus', operand: '5'},
    { name: i18n.t('goat.colors.orange'), className: 'orange', operation: 'plus', operand: '4'},
    { name: i18n.t('goat.colors.green'), className: 'green', operation: 'plus', operand: '3'},
    { name: i18n.t('goat.colors.brown'), className: 'brown', operation: 'plus', operand: '2'},
    { name: i18n.t('goat.colors.grey'), className: 'grey', operation: 'plus', operand: '1'},
    { name: i18n.t('goat.colors.red'), className: 'red', operation: 'minus', operand: '1'},
    { name: i18n.t('goat.colors.black'), className: 'black', operation: 'minus', operand: '2'},
    { name: i18n.t('goat.colors.yellow'), className: 'yellow', operation: 'minus', operand: '3'},
    { name: i18n.t('goat.colors.violet'), className: 'violet', operation: 'minus', operand: '4'},
    { name: i18n.t('goat.colors.pink'), className: 'pink', operation: 'minus', operand: '5'},
    { name: i18n.t('goat.colors.aqua'), className: 'aqua', operation: 'minus', operand: '6'},
  ], [])
  const history = useHistory()
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [heartPosition, setHeartPosition] = useState(0)
  const [fogs, setFogs] = useState([])
  const [showGame, setShowGame] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedOption, setSelectedOption] = useState('plus')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fogs = sampleSize(colors, 3)
    const message = i18n.t('goat.dialogues.25', { color: fogs[0].name })
    setMessage(message)
    setFogs(fogs)
    setDialogueBarMessages([
      {message: i18n.t('goat.dialogues.26')},
      {message: i18n.t('goat.dialogues.27', { name: CHARACTERS['goat'].name }), onCloseMessage: () => setShowGame(true)},
      {message, onCloseMessage: () => setShowForm(true)},
    ])
  }, [])

  useEffect(() => {
    if(heartPosition === 3) {
      setDialogueBarMessages([
        { character: 'goat', message: i18n.t('goat.dialogues.28') },
        { character: 'goat', message: i18n.t('goat.dialogues.29') },
        { message: i18n.t('goat.dialogues.30') },
        { message: i18n.t('goat.dialogues.31') },
        { character: 'goat', message: i18n.t('goat.dialogues.32') },
        { character: 'goat', message: i18n.t('goat.dialogues.33') },
        { character: 'goat', message: i18n.t('goat.dialogues.34') },
        { character: 'goat', message: i18n.t('goat.dialogues.35') },
        { character: 'goat', message: i18n.t('goat.dialogues.36') },
        { character: 'goat', message: i18n.t('goat.dialogues.37'), onCloseMessage: () => handleBossDefeated() }
      ])  
    }
    else if(heartPosition > 0) {
      const message = i18n.t('goat.dialogues.25', { color: fogs[heartPosition].name })
      setMessage(message)
      setDialogueBarMessages([
        {message, onCloseMessage: () => setShowForm(true)},
      ])
    }
  }, [heartPosition])

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'goat' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => history.replace(`/app/${i18n.locale}/map`))
  }

  const checkAnswer = answer => {
      return Promise.resolve({ data: { ok: selectedOption === fogs[heartPosition].operation && answer == fogs[heartPosition].operand } });
  }

  const handleWrongAnswer = () => {
    setShowForm(false)
    setDialogueBarMessages([
      { message: i18n.t('goat.dialogues.38') },
      { character: 'goat', message: i18n.t('goat.dialogues.39') },
      { title: 'GAME OVER!', message: i18n.t('goat.dialogues.40'), onCloseMessage: () => location.reload() }
    ])
  }

  const handleCorrectAnswer = () => {
    setShowForm(false)
    if(heartPosition == 2) {
      setHeartPosition(3)
    } else {
      setDialogueBarMessages([
        { message: i18n.t('goat.dialogues.41', { name: CHARACTERS['goat'].name }), onCloseMessage: () => setHeartPosition(heartPosition + 1)  }
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
      <div className='square' style={{ backgroundColor: heartPosition > 0 ? 'white' : fogs[0].className}}>
        {heartPosition === 1 && <div className='container'>
            <Heart />
          </div>
        }
      </div>
      <div className='square' style={{ backgroundColor: heartPosition > 1 ? 'white' : fogs[1].className}}>
        {heartPosition === 2 && <div className='container'>
            <Heart />
          </div>
        }
      </div>
      <div className='square' style={{ backgroundColor: heartPosition > 2 ? 'white' : fogs[2].className}}>
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
        <input type="radio" value="plus" name="sign" checked={selectedOption === 'plus'} onChange={(e) => setSelectedOption('plus')} /> {i18n.t('goat.signs.plus')}
        <input type="radio" value="minus" name="sign" checked={selectedOption === 'minus'} onChange={() => setSelectedOption('minus')} /> {i18n.t('goat.signs.minus')}
      </div>
      <AnswerForm numberInput checkAnswer={checkAnswer} onWrongAnswer={handleWrongAnswer} onCorrectAnswer={handleCorrectAnswer} />
      <span className='m-t-md'>{message}</span>
    </div>}
</div>
}

const Heart: React.FC = () =>
  <svg className={`strong-heart`} viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>

export default GoatBossBattle 
