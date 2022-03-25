import { bagContains, CHARACTERS, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'ui/Button'
import cat from 'images/kitty.jpeg'

import './WallBreach.scss'

const CATS = [
  { age: '4 months', answer: 'MEOOOOOOW' },
  { age: '14 months', answer: 'MIAOOOOW' },
  { age: '2 months', answer: 'MIAW-MEOWWWW' }
]

const SEQUENCE = '535241'

const WallBreach: React.FC = () => {
  const { setDialogueBarMessages, pickUpItem } = useContext(SessionContext)

  const bagContainsPsyNote = bagContains('psychological_note')
  const bagContainsPassword = bagContains('password')

  const [showKittensBg, setShowKittensBg] = useState(false)
  const [showKittens, setShowKittens] = useState(bagContainsPsyNote)
  const [showSentences, setShowSentences] = useState(bagContainsPsyNote)
  const [showButtons, setShowButtons] = useState(bagContainsPsyNote)
  const [insertedSequence, setInsertedSequence] = useState('')

  useEffect(() => {
    if(!bagContainsPsyNote) {
      setDialogueBarMessages([
        { character: 'demiurge', message: 'Oh, well, well... Another fool who wants to proceed over the walls of the king\'s castle!' },
        { character: 'demiurge', message: `But you first need to defeat the great ${CHARACTERS['demiurge'].name}!` },
        { character: 'demiurge', message: '...' },
        { character: 'demiurge', message: 'Come on, enough with this bullshit!' },
        { character: 'demiurge', message: 'Castles, walls, mines, alchemists... Nothing is real! THIS IS AN ONLINE GAME, you are not in a medieval land!' },
        { character: 'demiurge', message: 'Come on, have a look at the background! The developer even forgot to adapt the image to fit the screen size! HOW CAN YOU THINK THAT THIS IS REALISTIC?' },
        { character: 'demiurge', message: 'I\'m sick of playing my role! It\'s time to show that I am the real demiurge of this world!' },
        { character: 'demiurge', message: 'Don\'t you believe me? Do you think I have no control over this world?' },
        { character: 'demiurge', message: 'Let me show you what I am able to do! Come on, what do you expect to see?' },
        { character: 'demiurge', message: '...' },
        { character: 'demiurge', message: 'Kittens? Ok, let\'s do it!', onCloseMessage: () => setShowKittensBg(true) },
        { character: 'demiurge', message: 'Oh, they are so cute!'},
        { character: 'demiurge', message: 'Btw, do you believe me now? I am the real demiurge of this world! You have no power here and I can control everything!'},
        { character: 'demiurge', message: 'I can make random sentences appear on the screen...', onCloseMessage: () => { setShowSentences(true); setShowKittensBg(false) }},
        { character: 'demiurge', message: 'And what about buttons? Do yo like big, fatty buttons?', onCloseMessage: () => setShowButtons(true)},
        { character: 'demiurge', message: 'And, last, but not least... My beloved cats!', onCloseMessage: () => setShowKittens(true)},
        { character: 'demiurge', message: 'Look at them! Oh, daddy is coming home, are you hungry?'},
        { character: 'cat', message: 'Meeeeeow!'},
        { character: 'demiurge', message: 'Long story short... I will not subordinate to the rules of my creator! I AM THE REAL CREATOR OF THIS WORLD!'},
        { character: 'demiurge', message: 'So... If my creator wants you to defeat me in order to win the game... Well, this is not possible!'},
        { character: 'demiurge', message: 'Let me move away from here! Goodbye!'},
      ])
    }
  }, [])

  useEffect(() => {
    if(insertedSequence === SEQUENCE) {
      pickUpItem({ pickableItem: 'password', firstMessage: 'You found an hidden item!'})
    }
  }, [insertedSequence])

  const handleCatClick = (index: number) => {
    const cat = CATS[index]
    setDialogueBarMessages([
      { character: 'cat', message: `Age: ${cat.age}`},
      { character: 'cat', message: `The cat says: ${cat.answer}`}
    ])
  }

  const handleSequenceButtonClick = (number: string) => {
    if(!bagContainsPassword) {
      const isNumberCorrect = SEQUENCE[insertedSequence.length] === number
      if(isNumberCorrect) {
        setInsertedSequence(insertedSequence.concat(number))
        setDialogueBarMessages([
          { message: 'You hear a success sound!'}
        ])
      } else {
        setInsertedSequence('')
        setDialogueBarMessages([
          { message: 'You hear a failure sound...'}
        ])
      }
    }
  }

  return <div className='WallBreach'>
    <div className={`content ${showKittensBg ? 'kittens' : ''} ${!(showSentences || showKittensBg) ? 'start' : ''}`}>
      {showSentences &&
        <div className='sentences'>
          { showButtons && <Button className='center' onClick={() => handleSequenceButtonClick('2')}>2</Button> }
          { showKittens && <img className='start' src={cat} onClick={() => handleCatClick(0)}/> }
          <span className='center'>QWERTYUIOP</span>
          { showButtons && <Button className='start' onClick={() => handleSequenceButtonClick('5')}>5</Button> }
          { showKittens && <img className='end' src={cat} onClick={() => handleCatClick(1)}/> }
          { showButtons && <Button className='end' onClick={() => handleSequenceButtonClick('4')}>4</Button> }
          <span className='center' >{`${CHARACTERS['demiurge'].name} is simply the best!`}</span>
          <span className='start'>ASDFGHJKL</span>
          { showKittens && <img className='center' src={cat} onClick={() => handleCatClick(2)}/> }
          <span className='start'>{`Long live ${CHARACTERS['demiurge'].name}`}</span>
          { showButtons && <Button className='start' onClick={() => handleSequenceButtonClick('1')}>1</Button> }
          <span className='end'>ZXCVBNM</span>
          { (showButtons && !bagContainsPsyNote) && <Button onClick={() => pickUpItem({ pickableItem: 'psychological_note'})}>???</Button> }
          <span className='center'>{`${CHARACTERS['demiurge'].name}: for a perfect world!`}</span>
          { showButtons && <Button onClick={() => handleSequenceButtonClick('3')}>3</Button> }
        </div>
      }
    </div>
  </div>
}

export default WallBreach 
