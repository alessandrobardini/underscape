import axios from 'axios'
import DialogueBar from 'components/Layout/DialogueBar'
import HiddenElement from 'components/Layout/HiddenElement'
import { bagContains, DialogueBarMessageType, SessionContext } from 'Game'
import csrfToken from 'helpers/csrfToken'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import hydrogen from '../../images/hydrogen.jpg'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { itemFound } = useContext(SessionContext)

  const [dialogueBarMessages, setDialogueBarMessages] = useState<Array<DialogueBarMessageType>>([])

  const handlePeriodicTableFound = () => {
    itemFound('periodic_table')
    setDialogueBarMessages([
      { message: 'You found an item!' }, 
      { imageSrc: hydrogen, title: 'Periodic table of elements', message: 'Do yo want to create delightful cocktails?' },
      { message: 'You put the item in your bag' }
    ])
  }

  return <div className='AlchemistAlcove'>
    <div className='map'>
      <HiddenElement top='880px' left='180px' width='70px' height='40px' render={!bagContains('periodic_table')} onClick={handlePeriodicTableFound} />
    </div>
    <DialogueBar messages={dialogueBarMessages} closeDialogueBar={() => setDialogueBarMessages([])}/>
  </div>
}

export default AlchemistAlcove 