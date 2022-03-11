import axios from 'axios'
import DialogueBar from 'components/Layout/DialogueBar'
import HiddenElement from 'components/Layout/HiddenElement'
import { bagContains, DialogueBarMessageType, messagesForItemFound, SessionContext } from 'Game'
import csrfToken from 'helpers/csrfToken'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import hydrogen from '../../images/hydrogen.jpg'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { itemFound, setDialogueBarMessages } = useContext(SessionContext)

  const handlePeriodicTableFound = () => {
    itemFound('periodic_table')
    setDialogueBarMessages(messagesForItemFound('periodic_table'))
  }

  return <div className='AlchemistAlcove'>
    <div className='map'>
      <HiddenElement top='880px' left='180px' width='70px' height='40px' render={!bagContains('periodic_table')} onClick={handlePeriodicTableFound} />
    </div>
  </div>
}

export default AlchemistAlcove 