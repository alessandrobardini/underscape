import AnswerForm from 'components/Layout/AnswerForm'
import CountdownTimer from 'components/Layout/Countdown'
import { CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import alchemist from 'images/alchemist_boss.png'
import { sampleSize, shuffle } from 'lodash'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { useHistory } from 'react-router-dom'
import { TranslatorContext } from 'containers/TranslatorLoader'

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

const SECONDS_FOR_ANSWERING = 120

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
    { text: '38 Sr', correct: true },
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

type SpellType = {
  counter: string
  text: string
}

const AlchemistBossBattle: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const history = useHistory()
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [phase, setPhase] = useState(1)
  const [buttons, setButtons] = useState<{ phase1: PhaseStatusType, phase2: PhaseStatusType}>({ phase1: { color: '', content: []}, phase2: { color: '', content: []}})
  const [spells, setSpells] = useState<{ phase3Spell: SpellType, phase4Spell: SpellType}>({ phase3Spell: { counter: '', text: ''}, phase4Spell: { counter: '', text: ''}})
  const [showBlinking, setShowBlinking] = useState(true)
  const [showButtons, setShowButtons] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const buttonGroups = [BUTTONS_WITH_RED_SPELL, BUTTONS_WITH_GREEN_SPELL, BUTTONS_WITH_BLUE_SPELL, BUTTONS_WITH_YELLOW_SPELL]
  const namedSpells = useMemo(() => {
    // 53-58-4-111: ICeBeRg
    const TITANIC_SPELL = { counter: '53584111', text: i18n.t('alchemist.dialogues.31')}
    // 114-95-99: FlAmEs
    const IGLOO_SPELL = { counter: '1149599', text: i18n.t('alchemist.dialogues.32')}
    // 5-68-16-68-19: BErSErK
    const MEDITATION_SPELL = { counter: '568166819', text: i18n.t('alchemist.dialogues.33')}
    // 9-57-16-1: FLaSH
    const BLACKOUT_SPELL = { counter: '957161', text: i18n.t('alchemist.dialogues.34')}
    // 15-8-53-16-8-7: POISON
    const PURIFICATION_SPELL = { counter: '158531687', text: i18n.t('alchemist.dialogues.35')}
    // 75-74-53-60: ReWINd
    const FORESIGHT_SPELL = { counter: '75745360', text: i18n.t('alchemist.dialogues.36')}
    // 16-18-20-62: SArCaSm
    const SADNESS_SPELL = { counter: '16182062', text: i18n.t('alchemist.dialogues.37')}

    return [TITANIC_SPELL, IGLOO_SPELL, MEDITATION_SPELL, BLACKOUT_SPELL, PURIFICATION_SPELL, FORESIGHT_SPELL, SADNESS_SPELL]
  }, [])

  const createShuffledButtons = (buttons: Array<ButtonType>) => {
    const shuffledStyles = shuffle(Array.from(Array(buttons.length).keys()))
    const shuffledButtons = shuffle(buttons).map(({...button }, index) => ({ ...button, className: `slidein-${shuffledStyles[index]}`}))
    return shuffledButtons
  }

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'alchemist' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => history.replace(`/app/${i18n.locale}/map`))
  }

  useEffect(() => {
    const [phase1Buttons, phase2Buttons] = sampleSize(buttonGroups, 2)
    const [phase3Spell, phase4Spell] = sampleSize(namedSpells, 2)
    setButtons({
      phase1: { color: phase1Buttons.color, content: createShuffledButtons(phase1Buttons.buttons) },
      phase2: { color: phase2Buttons.color, content: createShuffledButtons(phase2Buttons.buttons) }
    })
    setSpells({
      phase3Spell: phase3Spell,
      phase4Spell: phase4Spell
    })
  }, [])

  const phase1MessagesOnMount = [
    { message: i18n.t('alchemist.dialogues.21', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: ()  => setShowButtons(true)}
  ]

  const phase2MessagesOnMount = [
    { character: 'alchemist', message: i18n.t('alchemist.dialogues.22'), disappearAfterSeconds: 3, onCloseMessage: () => setShowBlinking(true) },
    { message: i18n.t('alchemist.dialogues.23', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: ()  => setShowButtons(true) }
  ]

  const phase3MessagesOnMount = [
    { character: 'alchemist', message: i18n.t('alchemist.dialogues.24'), disappearAfterSeconds: 3 },
    { character: 'alchemist', message: i18n.t('alchemist.dialogues.25', { seconds: SECONDS_FOR_ANSWERING }), disappearAfterSeconds: 3, onCloseMessage: () => setShowBlinking(true) },
    { message: i18n.t('alchemist.dialogues.26', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: ()  => setShowForm(true) }
  ]

  const phase4MessagesOnMount = [
    { character: 'alchemist', message: i18n.t('alchemist.dialogues.27'), disappearAfterSeconds: 3, onCloseMessage: () => setShowBlinking(true) },
    { message: i18n.t('alchemist.dialogues.28', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: ()  => setShowForm(true) }
  ]

  const phase5MessagesOnMount = [
    { character: 'alchemist', message: i18n.t('alchemist.dialogues.29'), disappearAfterSeconds: 3 },
    { message: i18n.t('alchemist.dialogues.30', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: () => handleBossDefeated() }
  ]

  const handleCorrectButtonClick = () => {
    setShowBlinking(false)
    setShowButtons(false)
    setDialogueBarMessages([
      { character: 'alchemist', message: `OUCH!`, disappearAfterSeconds: 3 },
      { message: i18n.t('alchemist.dialogues.38', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: () => { setPhase(phase + 1) } }
    ])
  }

  const handleCorrectAnswer = () => {
    setShowForm(false)
    setShowBlinking(false)
    setDialogueBarMessages([
      { character: 'alchemist', message: `OUCH!`, disappearAfterSeconds: 3 },
      { message: i18n.t('alchemist.dialogues.38', { name: CHARACTERS['alchemist'].name }), disappearAfterSeconds: 3, onCloseMessage: () => { setPhase(phase + 1) } }
    ])
  }

  const handleCorrectFinalAnswer = () => {
    setShowForm(false)
    setShowBlinking(false)
    setDialogueBarMessages([
      { character: 'alchemist', message: i18n.t('alchemist.dialogues.39'), disappearAfterSeconds: 2, onCloseMessage: () => { setPhase(phase + 1) }}
    ])
  }

  const handleWrongAnswer = () => {
    setShowForm(false)
    setShowBlinking(false)
  }

  const handleWrongButtonClick = () => {
    setShowButtons(false)
    setShowBlinking(false)
  }

  if(phase === 1) {
    return <ColoredSpellsPhase key={1} showBlinking={showBlinking} color={buttons.phase1.color} buttons={buttons.phase1.content} showButtons={showButtons} onCorrectButtonClick={handleCorrectButtonClick} onWrongButtonClick={handleWrongButtonClick} messagesOnMount={phase1MessagesOnMount} />
  }
  if(phase === 2) {
    return <ColoredSpellsPhase key={2} showBlinking={showBlinking} color={buttons.phase2.color} buttons={buttons.phase2.content} showButtons={showButtons} onCorrectButtonClick={handleCorrectButtonClick} onWrongButtonClick={handleWrongButtonClick} messagesOnMount={phase2MessagesOnMount} />
  }
  if(phase === 3) {
    return <NamedSpellsPhase key={3} showBlinking={showBlinking} spell={spells.phase3Spell} showForm={showForm} messagesOnMount={phase3MessagesOnMount} onCorrectAnswer={handleCorrectAnswer} onWrongAnswer={handleWrongAnswer} />
  }
  if(phase === 4) {
    return <NamedSpellsPhase key={4} showBlinking={showBlinking} spell={spells.phase4Spell} showForm={showForm} messagesOnMount={phase4MessagesOnMount} onCorrectAnswer={handleCorrectFinalAnswer} onWrongAnswer={handleWrongAnswer} />
  }
  if(phase === 5) {
    return <YouWin key={5} messagesOnMount={phase5MessagesOnMount} />
  }
  return null
}

type ColoredSpellsPhaseProps = {
  showButtons: boolean
  showBlinking: boolean
  buttons: Array<ButtonType>
  onCorrectButtonClick: () => void
  onWrongButtonClick: () => void
  messagesOnMount: Array<DialogueBarMessageType>
  color: string
}

const ColoredSpellsPhase: React.FC<ColoredSpellsPhaseProps> = ({ color, showButtons, showBlinking, buttons, onCorrectButtonClick, onWrongButtonClick, messagesOnMount }) => {
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
      <div className={`alchemist-image ${showBlinking ? `blink-${color}` : ''}`}>
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
  showBlinking: boolean
  showForm: boolean
  spell: SpellType
  onCorrectAnswer: () => void
  onWrongAnswer: () => void
}

const NamedSpellsPhase: React.FC<NamesSpellsPhaseProps> = ({ messagesOnMount, showForm, spell, showBlinking, onCorrectAnswer, onWrongAnswer }) => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [imageClass, setImageClass]  = useState<string>('')

  useEffect(() => {
    setDialogueBarMessages(messagesOnMount)
  }, [])

  useEffect(() => {
    if(showForm) {
      setDialogueBarMessages([
        { character: 'alchemist', message: spell.text, notClosable: true },
      ])
    }
  }, [showForm])

  const handleWrongAnswer = () => {
    onWrongAnswer()
    setDialogueBarMessages([
      { message: i18n.t('alchemist.dialogues.40', { name: CHARACTERS['alchemist'].name }) },
      { character: 'alchemist', message: i18n.t('alchemist.dialogues.41') },
      { title: 'GAME OVER!', message: i18n.t('alchemist.dialogues.42'), onCloseMessage: () => location.reload() }
    ])
  }

  const handleCorrectAnswer = () => {
    setImageClass('spin')
    onCorrectAnswer()
  }

  const checkAnswer = (answer) => Promise.resolve({ data: { ok: answer === spell.counter } })

  return <div className='AlchemistBossBattle'>
    <div className='alchemist-area named'>
      <div className={`alchemist-image ${showBlinking ? 'blink-crazy' : ''} ${showForm ? 'with-form' : ''}`}>
      <img src={alchemist} className={imageClass}></img>
        {showForm && 
          <div>
          <AnswerForm checkAnswer={checkAnswer} onWrongAnswer={handleWrongAnswer} onCorrectAnswer={handleCorrectAnswer} />
          <CountdownTimer targetDate={new Date(new Date().getTime() + (SECONDS_FOR_ANSWERING * 1000)).getTime()} onFinish={handleWrongAnswer}/>
          </div>
        }
      </div>
    </div>
  </div>
}

type YouWinProps = {
  messagesOnMount: Array<DialogueBarMessageType>
}

const YouWin: React.FC<YouWinProps> = ({ messagesOnMount }) => {
  const { setDialogueBarMessages } = useContext(SessionContext)

  useEffect(() => {
    setDialogueBarMessages(messagesOnMount)
  }, [])

  return <div className='AlchemistBossBattle'>
    <div className={'alchemist-area'}>
      <div className={`alchemist-image`}>
      <img src={alchemist} className='away'></img>
      </div>
    </div>
  </div>
}

export default AlchemistBossBattle 
