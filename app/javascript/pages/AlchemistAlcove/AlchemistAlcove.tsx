import { appPath } from 'App'
import AlchemistBossBattle from 'components/AlchemistAlcove/AlchemistBossBattle'
import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, CHARACTERS, riddleSolved, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { setDialogueBarMessages, setModalChildren, closeModal, items, bosses } = useContext(SessionContext)
  const [showBattlePage, setShowBattlePage] = useState<boolean>(false)
  const history = useHistory()
  const i18n = useContext(TranslatorContext)

  const alchemistRiddleSolved = riddleSolved('alchemist_cave')
  const bookOfSpellsAlreadyFound = bagContains('book_of_spells')
  const canProceedToBossBattle = alchemistRiddleSolved && bookOfSpellsAlreadyFound

  if(bosses.map(({ name }) => name).includes('alchemist')) {
    history.replace(`/app/${i18n.locale}/map`)
  }

  useEffect(() => {
    if(items.length === 0) {
      setDialogueBarMessages([
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.1') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.2', { name: CHARACTERS['alchemist'].name }) },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.3') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.4') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.5') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.6') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.7') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.8') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.9') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.10') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.11') }
      ])
    }
  }, [])

  useEffect(() => {
    if(canProceedToBossBattle) {
      setDialogueBarMessages([
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.12') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.13') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.14') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.15') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.16') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.17') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.18') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.19') },
        { character: 'alchemist', message: i18n.t('alchemist.dialogues.20'), onCloseMessage: () => setShowBattlePage(true) },
      ])
    }
  }, [canProceedToBossBattle])

  const handleMirrorClick = () => {
    setDialogueBarMessages([
      { message: i18n.t('alchemist.objects.mirror') }
    ])
  }

  const handleFurnaceClick = () => {
    setDialogueBarMessages([
      { message: i18n.t('alchemist.objects.furnace') }
    ])
  }

  const handleSkullClick = () => {
    setDialogueBarMessages([
      { message: i18n.t('alchemist.objects.skull') }
    ])
  }

  const handleBossBattleGateClick = () => {
    if(alchemistRiddleSolved) {
      // this item is needed to beat the boss!
      if(!bookOfSpellsAlreadyFound) {
        setDialogueBarMessages([
          { message: i18n.t('alchemist.objects.battle_gate.not_ready.1') },
          { message: i18n.t('alchemist.objects.battle_gate.not_ready.2') }
        ])
      }
    } else {
      setModalChildren(answerSubmissionComponent)
    }
  }

  const answerSubmissionComponent = <AnswerSubmission
    riddle='alchemist_cave'
    errorMessage={i18n.t('alchemist.objects.battle_gate.error')}
    explanations={[
      i18n.t('alchemist.objects.battle_gate.ready.1'),
      i18n.t('alchemist.objects.battle_gate.ready.2'),
      i18n.t('alchemist.objects.battle_gate.ready.3')
    ]}
    onCorrectAnswerSubmission={closeModal}
  />
  
  return showBattlePage ?
    <AlchemistBossBattle /> : 
    <div className='AlchemistAlcove'>
      <div className='map'>
        <HiddenElement top='496px' left='401px' width='135px' height='206px' pickableItem='periodic_table' />
        <HiddenElement top='410px' left='820px' width='240px' height='300px' onClick={handleBossBattleGateClick} />
        <HiddenElement top='510px' left='1085px' width='50px' height='100px' onClick={handleMirrorClick} />
        <HiddenElement top='380px' left='1570px' width='84px' height='137px' onClick={handleFurnaceClick} />
        <HiddenElement top='511px' left='630px' width='39px' height='37px' onClick={handleSkullClick} />
        <HiddenElement top='778px' left='589px' width='79px' height='50px' pickableItem='principles_of_life' />
        <HiddenElement top='871px' left='170px' width='90px' height='50px' pickableItem='book_of_spells' />
      </div>
    </div>
}

export default AlchemistAlcove 
