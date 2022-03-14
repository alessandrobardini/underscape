import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, CHARACTERS, DialogueBarMessageType, riddleSolved, SessionContext } from 'Game'
import alchemist from 'images/alchemist_boss.png'
import { sampleSize, shuffle } from 'lodash'
import { string } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'ui/Button'

import './AlchemistBossBattle.scss'

type ButtonType = {
  text: string
  correct?: boolean
  className?: string
}

type PhaseStatusType = {
  color: string,
  content: Array<ButtonType>
}

const BUTTONS_WITH_RED_SPELL = {
  color: 'red', 
  buttons: [
    { text: '3 Li' },
    { text: '21 Sc' },
    { text: '27 Co' },
    { text: '51 Sb', correct: true },
    { text: '56 Ba' },
    { text: '60 Nd' },
    { text: '70 Yb' },
    { text: '87 Fr' },
    { text: '109 Mt' },
    { text: '112 Cn' }
  ]
}

const BUTTONS_WITH_GREEN_SPELL = {
  color: 'green',
  buttons: [
    { text: '5 B' },
    { text: '18 Ar' },
    { text: '38 Sb', correct: true },
    { text: '39 Y' },
    { text: '48 Cd' },
    { text: '68 Er' },
    { text: '85 At' },
    { text: '92 U' },
    { text: '111 Rg' },
    { text: '118 Og' }
  ]
}

const BUTTONS_WITH_BLUE_SPELL = {
  color: 'blue',
  buttons: [
    { text: '1 H' },
    { text: '17 Cl' },
    { text: '18 Ar' },
    { text: '37 Rb' },
    { text: '46 Pd' },
    { text: '53 I' },
    { text: '61 Pm', correct: true },
    { text: '76 Os' },
    { text: '103 Lr' },
    { text: '113 Nh' }
  ]
}

const BUTTONS_WITH_YELLOW_SPELL = {
  color: 'yellow', 
  buttons: [
    { text: '2 He' },
    { text: '4 Be' },
    { text: '10 Ne' },
    { text: '20 Ca' },
    { text: '31 Ga' },
    { text: '55 Cs' },
    { text: '67 Ho' },
    { text: '71 Lu', correct: true },
    { text: '102 No' },
    { text: '116 Lv' }
  ]
}

const AlchemistBossBattle: React.FC = () => {
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [phase, setPhase] = useState(1)
  const [buttons, setButtons] = useState<{ phase1: PhaseStatusType, phase2: PhaseStatusType}>({ phase1: { color: '', content: []}, phase2: { color: '', content: []}})
  const [showButtons, setShowButtons] = useState<boolean>(false)
  const buttonGroups = [BUTTONS_WITH_RED_SPELL, BUTTONS_WITH_GREEN_SPELL, BUTTONS_WITH_BLUE_SPELL, BUTTONS_WITH_YELLOW_SPELL]

  const createShuffledButtons = (buttons: Array<ButtonType>) => {
    const shuffledStyles = shuffle(Array.from(Array(buttons.length).keys()))
    const shuffledButtons = shuffle(buttons).map(({...button }, index) => ({ ...button, className: `slidein-${shuffledStyles[index]}`}))
    return shuffledButtons
  }

  useEffect(() => {
    const [phase1Buttons, phase2Buttons] = sampleSize(buttonGroups, 2)
    setButtons({
      phase1: { color: phase1Buttons.color, content: createShuffledButtons(phase1Buttons.buttons) },
      phase2: { color: phase2Buttons.color, content: createShuffledButtons(phase2Buttons.buttons) }
    })
  }, [])

  const phase1MessagesOnMount = [
    { message: `${CHARACTERS['alchemist'].name} is preparing a colored spell! You need to neutralize it!`, disappearAfterSeconds: 3, onCloseMessage: ()  => setShowButtons(true)}
  ]

  const phase2MessagesOnMount = [
    { character: 'alchemist', message: `So lucky! Let's change color!`, disappearAfterSeconds: 3 },
    { message: `${CHARACTERS['alchemist'].name} is preparing another colored spell! Come on, same as before!`, disappearAfterSeconds: 3, onCloseMessage: ()  => setShowButtons(true) }
  ]

  const phase3MessagesOnMount = [
    { character: 'alchemist', message: `ENOUGH! Colored spells are child\'s play. How do you cope with advanced magic? `, disappearAfterSeconds: 3 },
    { message: `${CHARACTERS['alchemist'].name} is blinking weirdly! Cast a spell, quickly!`, disappearAfterSeconds: 3 },
    { message: 'TODO' }
  ]

  const handleCorrectButtonClick = () => {
    setShowButtons(false)
    setDialogueBarMessages([
      { character: 'alchemist', message: `OUCH!`, disappearAfterSeconds: 3 },
      { message: `Well done! You hit ${CHARACTERS['alchemist'].name}`, disappearAfterSeconds: 3, onCloseMessage: () => { setPhase(phase + 1) } }
    ])
  }

  const handleWrongButtonClick = () => {
    setShowButtons(false)
  }

  if(phase === 1) {
    return <ColoredSpellsPhase key={1} color={buttons.phase1.color} buttons={buttons.phase1.content} showButtons={showButtons} onCorrectButtonClick={handleCorrectButtonClick} onWrongButtonClick={handleWrongButtonClick} messagesOnMount={phase1MessagesOnMount} />
  }
  if(phase === 2) {
    return <ColoredSpellsPhase key={2} color={buttons.phase2.color} buttons={buttons.phase2.content} showButtons={showButtons} onCorrectButtonClick={handleCorrectButtonClick} onWrongButtonClick={handleWrongButtonClick} messagesOnMount={phase2MessagesOnMount} />
  }
  if(phase === 3) {
    return <NamedSpellsPhase key={3} messagesOnMount={phase3MessagesOnMount} />
  }
  return null
}

type ColoredSpellsPhaseProps = {
  showButtons: boolean
  buttons: Array<ButtonType>
  onCorrectButtonClick: () => void
  onWrongButtonClick: () => void
  messagesOnMount: Array<DialogueBarMessageType>
  color: string
}

const ColoredSpellsPhase: React.FC<ColoredSpellsPhaseProps> = ({ color, showButtons, buttons, onCorrectButtonClick, onWrongButtonClick, messagesOnMount }) => {
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [imageClass, setImageClass]  = useState<string>('')
  const half = Math.ceil(buttons.length / 2)
  const buttonsAtTheLeftOfTheAlchemist = buttons.slice(0, half)
  const buttonsAtTheRightOfTheAlchemist = buttons.slice(-half)

  useEffect(() => {
    setDialogueBarMessages(messagesOnMount)
  }, [])

  const handleWrongButtonClick = () => {
    onWrongButtonClick()
    setDialogueBarMessages([
      { message: `Oh no! This does not counteract the colored spell...` },
      { character: 'alchemist', message: `Eheheh... Go away now, I need to prepare my stand-up comedy show!` },
      { title: 'GAME OVER!', message: '... but you can retry the battle!', onCloseMessage: () => location.reload() }
    ])
  }

  const handleCorrectButtonClick = () => {
    setImageClass('spin')
    onCorrectButtonClick()
  }

  return <div className='AlchemistBossBattle'>
    <div className='alchemist-area'>
      {showButtons && buttonsAtTheLeftOfTheAlchemist.map(({ text, className, correct }, index) => {
        return <div key={index} className='column'><Button onClick={correct ? handleCorrectButtonClick : handleWrongButtonClick } className={className}>{text}</ Button></div>  
      })}
      <div className={`alchemist-image ${showButtons ? `blink-${color}` : ''}`}>
        <img src={alchemist} className={imageClass}></img>
      </div>
      {showButtons && buttonsAtTheRightOfTheAlchemist.map(({ text, className, correct }, index) => {
        return <div key={index} className='column'><Button onClick={correct ? handleCorrectButtonClick : handleWrongButtonClick } className={className}>{text}</ Button></div>  
      })}
    </div>
  </div>
}

type NamesSpellsPhaseProps = {
  messagesOnMount: Array<DialogueBarMessageType>
}

const NamedSpellsPhase: React.FC<NamesSpellsPhaseProps> = ({ messagesOnMount }) => {
  const { setDialogueBarMessages } = useContext(SessionContext)

  useEffect(() => {
    setDialogueBarMessages(messagesOnMount)
  }, [])

  return <div className='AlchemistBossBattle'>
    <div className='alchemist-area'>
      <div className={'alchemist-image'}>
        <img src={alchemist}></img>
      </div>
    </div>
  </div>
}

export default AlchemistBossBattle 