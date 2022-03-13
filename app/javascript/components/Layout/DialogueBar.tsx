import { CHARACTERS, DialogueBarMessageType } from 'Game'
import React, {  useState } from 'react'
import Button from 'ui/Button'

import './DialogueBar.scss'

type DialogueBarProps = {
  messages: Array<DialogueBarMessageType>
  closeDialogueBar: Function
}

const DialogueBar: React.FC<DialogueBarProps> = ({ messages, closeDialogueBar }) => {
  const [messageIndex, setMessageIndex ] = useState<number>(0)
  if( messages.length == 0 ) {
    return null
  }

  const currentMessage = messages[messageIndex]

  const lastMessage = messageIndex == (messages.length - 1)

  const handleClick = () => {
    if(lastMessage) {
      setMessageIndex(0)
      closeDialogueBar()
    } else {
      setMessageIndex(messageIndex + 1)
    }
    currentMessage.onCloseMessage && currentMessage.onCloseMessage()
  }

  const character = CHARACTERS[currentMessage.character]

  return <div className='DialogueBar'>
    <div className='content'>
      <div className='container image'>
        {character ? <div><img src={character.imageSrc} /><span className='characterName'>{character.name}</span></div> : <img src={currentMessage.imageSrc} />}
      </div>
      <div className='container message'>
        <div className='messages'>
          {currentMessage.title && <span className='title'>{ currentMessage.title }</span> }
          <span className='message'>{ currentMessage.message }</span>
        </div>
      </div>
      <div className='container button'><Button icon size='xl' iconLeft={`fa fa-${lastMessage ? 'close' : 'arrow-right'}`} onClick={handleClick}/></div>
    </div>
  </div>
}

export default DialogueBar
