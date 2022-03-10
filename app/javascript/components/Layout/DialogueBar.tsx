import { DialogueBarMessageType } from 'Game'
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

  const lastMessage = messageIndex == (messages.length - 1)

  const handleClick = () => {
    if(lastMessage) {
      setMessageIndex(0)
      closeDialogueBar()
    } else {
      setMessageIndex(messageIndex + 1)
    }
  }

  return <div className='DialogueBar'>
    <div className='content'>
      <div className='container image'><img src={messages[messageIndex].imageSrc} /></div>
      <div className='container message'>
        <div className='messages'>
          {messages[messageIndex].title && <span className='title'>{ messages[messageIndex].title }</span> }
          <span className='message'>{ messages[messageIndex].message }</span>
        </div>
      </div>
      <div className='container button'><Button icon size='xl' iconLeft={`fa fa-${lastMessage ? 'close' : 'arrow-right'}`} onClick={handleClick}/></div>
    </div>
  </div>
}

export default DialogueBar
