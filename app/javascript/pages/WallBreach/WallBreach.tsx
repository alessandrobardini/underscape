import { bagContains, CHARACTERS, SessionContext } from 'Game'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'ui/Button'
import cat from 'images/kitty.jpeg'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './WallBreach.scss'

const SEQUENCE = '535241'

const WallBreach: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages, pickUpItem } = useContext(SessionContext)

  const bagContainsPsyNote = bagContains('psychological_note')
  const bagContainsPassword = bagContains('password')

  const [showKittensBg, setShowKittensBg] = useState(false)
  const [showKittens, setShowKittens] = useState(bagContainsPsyNote)
  const [showSentences, setShowSentences] = useState(bagContainsPsyNote)
  const [showButtons, setShowButtons] = useState(bagContainsPsyNote)
  const [insertedSequence, setInsertedSequence] = useState('')
  const [canInteractWithElements, setCanInteractWithElements] = useState(bagContainsPsyNote || false)

  const cats = useMemo(() => [
    { age: i18n.t('demiurge.cats.age', { months: 4 }), answer: 'MEOOOOOOW' },
    { age: i18n.t('demiurge.cats.age', { months: 14 }), answer: 'MIAOOOOW' },
    { age: i18n.t('demiurge.cats.age', { months: 2 }), answer: 'MIAW-MEOWWWW' }
  ], [])

  useEffect(() => {
    if(!bagContainsPsyNote) {
      setDialogueBarMessages([
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.1') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.2', { name: CHARACTERS['demiurge'].name }) },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.3') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.4') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.5') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.6') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.7') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.8') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.9') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.10') },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.11'), onCloseMessage: () => setShowKittensBg(true) },
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.12')},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.13')},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.14'), onCloseMessage: () => { setShowSentences(true); setShowKittensBg(false) }},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.15'), onCloseMessage: () => setShowButtons(true)},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.16'), onCloseMessage: () => setShowKittens(true)},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.17')},
        { character: 'cat', message: i18n.t('demiurge.dialogues.18')},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.19')},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.20')},
        { character: 'demiurge', message: i18n.t('demiurge.dialogues.21'), onCloseMessage: () => setCanInteractWithElements(true)},
      ])
    }
  }, [])

  useEffect(() => {
    if(insertedSequence === SEQUENCE) {
      pickUpItem({ pickableItem: 'password', firstMessage: i18n.t('bag.you_found_an_hidden_item')})
    }
  }, [insertedSequence])

  const handleCatClick = (index: number) => {
    const cat = cats[index]
    setDialogueBarMessages([
      { character: 'cat', message: i18n.t('demiurge.dialogues.22', { age: cat.age })},
      { character: 'cat', message: i18n.t('demiurge.dialogues.23', { answer: cat.answer })}
    ])
  }

  const handleSequenceButtonClick = (number: string) => {
    if(!bagContainsPassword) {
      const isNumberCorrect = SEQUENCE[insertedSequence.length] === number
      if(isNumberCorrect) {
        setInsertedSequence(insertedSequence.concat(number))
        setDialogueBarMessages([
          { message: i18n.t('demiurge.dialogues.24')}
        ])
      } else {
        setInsertedSequence('')
        setDialogueBarMessages([
          { message: i18n.t('demiurge.dialogues.25')}
        ])
      }
    }
  }

  return <div className='WallBreach'>
    <div className={`content ${showKittensBg ? 'kittens' : ''} ${!(showSentences || showKittensBg) ? 'start' : ''}`}>
      {showSentences &&
        <div className='sentences'>
          { showButtons && <Button className='center' {...(canInteractWithElements && { onClick: () => handleSequenceButtonClick('2')})}>2</Button> }
          { showKittens && <img className='start' src={cat} {...(canInteractWithElements && { onClick: () => handleCatClick(0)})}/> }
          <span className='center'>QWERTYUIOP</span>
          { showButtons && <Button className='start' {...(canInteractWithElements && { onClick: () => handleSequenceButtonClick('5')})}>5</Button> }
          { showKittens && <img className='end' src={cat} {...(canInteractWithElements && { onClick: () => handleCatClick(1)})}/> }
          { showButtons && <Button className='end' {...(canInteractWithElements && { onClick: () => handleSequenceButtonClick('4')})}>4</Button> }
          <span className='center' >{i18n.t('demiurge.dialogues.26', { name: CHARACTERS['demiurge'].name })}</span>
          <span className='start'>ASDFGHJKL</span>
          { showKittens && <img className='center' src={cat} {...(canInteractWithElements && { onClick: () => handleCatClick(2)})}/> }
          <span className='start'>{i18n.t('demiurge.dialogues.79', { name: CHARACTERS['demiurge'].name })}</span>
          { showButtons && <Button className='start' {...(canInteractWithElements && { onClick: () => handleSequenceButtonClick('1')})}>1</Button> }
          <span className='end'>ZXCVBNM</span>
          { (showButtons && !bagContainsPsyNote) && <Button {...(canInteractWithElements && { onClick: () => pickUpItem({ pickableItem: 'psychological_note'})})}>???</Button> }
          <span className='center'>{i18n.t('demiurge.dialogues.27', { name: CHARACTERS['demiurge'].name })}</span>
          { showButtons && <Button {...(canInteractWithElements && { onClick: () => handleSequenceButtonClick('3')})}>3</Button> }
        </div>
      }
    </div>
  </div>
}

export default WallBreach 
