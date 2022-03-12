import axios from 'axios'
import DialogueBar from 'components/Layout/DialogueBar'
import Form from 'components/Layout/Form'
import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, checkAnswer, DialogueBarMessageType, messagesForItemFound, SessionContext } from 'Game'
import csrfToken from 'helpers/csrfToken'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from 'ui/Button'
import Input from 'ui/Input'
import hydrogen from '../../images/hydrogen.jpg'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { itemFound, setDialogueBarMessages, setModalChildren } = useContext(SessionContext)

  const handlePeriodicTableFound = () => {
    itemFound('periodic_table')
    setDialogueBarMessages(messagesForItemFound('periodic_table'))
  }

  const handlePrinciplesOfLifeFound = () => {
    itemFound('principles_of_life')
    setDialogueBarMessages(messagesForItemFound('principles_of_life'))
  }

  const handleMirrorClick = () => {
    setDialogueBarMessages([
      { message: 'The mirror reflects your image. You are so handsome!' }
    ])
  }

  const handleFurnaceClick = () => {
    setDialogueBarMessages([
      { message: 'The furnace is hot as hell. Unfortunately, you forgot to bring the sunscreen with you. Better to get a tan after this adventure.' }
    ])
  }

  const handleSkullClick = () => {
    setDialogueBarMessages([
      { message: 'The alchemist is a great fan of Hamlet.' }
    ])
  }
  
  return <div className='AlchemistAlcove'>
    <div className='map'>
      <HiddenElement top='496px' left='401px' width='135px' height='206px' render={!bagContains('periodic_table')} onClick={handlePeriodicTableFound} />
      <HiddenElement top='410px' left='820px' width='240px' height='300px' onClick={() => setModalChildren(<AnswerSubmission />)} />
      <HiddenElement top='510px' left='1085px' width='50px' height='100px' onClick={handleMirrorClick} />
      <HiddenElement top='380px' left='1570px' width='84px' height='137px' onClick={handleFurnaceClick} />
      <HiddenElement top='511px' left='630px' width='39px' height='37px' onClick={handleSkullClick} />
      <HiddenElement top='778px' left='589px' width='79px' height='50px' render={!bagContains('principles_of_life')} onClick={handlePrinciplesOfLifeFound} />
    </div>
  </div>
}

export default AlchemistAlcove 