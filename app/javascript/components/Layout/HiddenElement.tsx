import { bagContains, ITEMS, SessionContext } from 'Game'
import React, { MouseEventHandler, useContext } from 'react'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'

import './HiddenElement.scss'

type HiddenElementProps = {
  top: string
  left: string
  width: string
  height: string
  onClick?: MouseEventHandler<HTMLDivElement>
  pickableItem?: string
}

const HiddenElement: React.FC<HiddenElementProps> = ({
  top,
  left,
  width,
  height,
  onClick,
  pickableItem,
}) => {
  const { setDialogueBarMessages, refetch } = useContext(SessionContext)

  const handlePickUpItem = () => {
    pickUpItem(pickableItem).then(() => {
      setDialogueBarMessages(messagesForItemFound(pickableItem))
      refetch()
    })
  } 

  if (pickableItem) {
    return !bagContains(pickableItem) ? <div className='HiddenElement' style={{ top, left, width, height }} onClick={handlePickUpItem} /> : null  
  }
  return <div className='HiddenElement' style={{ top, left, width, height }} {...(onClick && { onClick })} />
}

const messagesForItemFound = (itemName: string) => {
  const { imageSrc, name, message } = ITEMS[itemName]
  return [
    { message: 'You found an item!' }, 
    { imageSrc, title: name, message },
    { message: 'You put the item in your bag' }
  ]
}

const pickUpItem = (name: string) => {
  return axios.post(
    '/items',
    { item: { name }, authenticity_token: csrfToken() },
    { headers: { Accept: 'application/json' }, responseType: 'json' }
  )
}

export default HiddenElement 
