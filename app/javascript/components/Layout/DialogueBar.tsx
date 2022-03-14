import { CHARACTERS, DialogueBarMessageType } from 'Game'
import React, {  useEffect, useState } from 'react'
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
  const imageComponent = character ? <div><img src={character.imageSrc} /><span className='characterName'>{character.name}</span></div> : <img src={currentMessage.imageSrc} />
  const icon = `fa fa-${lastMessage ? 'close' : 'arrow-right'}`

  return <div className='DialogueBar'>
    <Message index={messageIndex} message={currentMessage} onMessageClick={handleClick} imageComponent={imageComponent} icon={icon}/>
  </div>
}

type MessageProps = {
  message: DialogueBarMessageType
  onMessageClick: () => void
  imageComponent: JSX.Element
  icon: string
  index: number
}

const Message: React.FC<MessageProps> = ({ message, onMessageClick, imageComponent, icon, index }) => {
  useEffect(() => {
    if(message.disappearAfterSeconds) {
      const timeout = setTimeout(() => {
        onMessageClick()
      }, message.disappearAfterSeconds * 1000)

      return () => {
          return clearTimeout(timeout);
      }
    }
  }, [index])

  return <div className='DialogueBar'>
    <div className='content'>
      <div className='container image'>
        {imageComponent}
      </div>
      <div className='container message'>
        <div className='messages'>
          {message.title && <span className='title'>{ message.title }</span> }
          <span className='message'>{ message.message }</span>
        </div>
      </div>
      <div className='container button'>{!message.disappearAfterSeconds && <Button icon size='xl' iconLeft={icon} onClick={onMessageClick}/>}</div>
    </div>
  </div>
}

export default DialogueBar
