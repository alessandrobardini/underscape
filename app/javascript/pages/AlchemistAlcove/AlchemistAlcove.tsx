import AlchemistBossBattle from 'components/AlchemistAlcove/AlchemistBossBattle'
import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, riddleSolved, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { setDialogueBarMessages, setModalChildren, closeModal, items, bosses } = useContext(SessionContext)
  const [showBattlePage, setShowBattlePage] = useState<boolean>(false)
  const history = useHistory()

  const alchemistRiddleSolved = riddleSolved('alchemist_cave')
  const bookOfSpellsAlreadyFound = bagContains('book_of_spells')
  const canProceedToBossBattle = alchemistRiddleSolved && bookOfSpellsAlreadyFound

  if(bosses.map(({ name }) => name).includes('alchemist')) {
    history.goBack()
  }

  useEffect(() => {
    if(items.length === 0) {
      setDialogueBarMessages([
        { character: 'alchemist', message: 'Who the hell dares to sneak into my lair?!?' },
        { character: 'alchemist', message: 'I am SANS, the master alchemist of Magaland and I hate being disturbed!' },
        { character: 'alchemist', message: 'Moreover, I am the most appreciate comedian of the kingdom!' },
        { character: 'alchemist', message: 'My bone jokes are the best of the best, they are so... HUMERUS!' },
        { character: 'alchemist', message: 'Unless you came here to see my pretty little BONE-sai tree, please go away and let me prepare my standup show!' },
        { character: 'alchemist', message: '... ... ...' },
        { character: 'alchemist', message: 'Oh, so do you want my amulet? Here we go, another dull who wants to play with higher powers...' },
        { character: 'alchemist', message: 'This amulet has an unbearable power inside, it must be guarded by trusted (and humorous) people like me!' },
        { character: 'alchemist', message: '... ... ...' },
        { character: 'alchemist', message: 'You are so stubborn! Do you want to fight me and steal the amulet?' },
        { character: 'alchemist', message: 'Ok, reach me at the end of the cave. I\'ll be waiting for you! I may be a skeleton, buy I have guts!' }
      ])
    }
  }, [])

  useEffect(() => {
    if(canProceedToBossBattle) {
      setDialogueBarMessages([
        { character: 'alchemist', message: 'So, you\'re doing chemistry pretty well...' },
        { character: 'alchemist', message: 'Unfortunately, I think that I forgot to tell you something....' },
        { character: 'alchemist', message: 'I took a master in witchcraft when I was young!' },
        { character: 'alchemist', message: 'Prepare to get destroyed by my BONE-fide skills!' },
        { character: 'alchemist', message: '... ... ...' },
        { character: 'alchemist', message: 'Come on, did you understand the pun?' },
        { character: 'alchemist', message: 'I am a skeleton and I have BONES, so BONE-fide...' },
        { character: 'alchemist', message: 'Oh, screw you! You pretend to steal my amulet and you don\'t laugh at my jokes! You are useless!' },
        { character: 'alchemist', message: 'You will be hit by a ton of spells today... A skele-TON!!!', onCloseMessage: () => setShowBattlePage(true) },
      ])
    }
  }, [canProceedToBossBattle])

  const handleMirrorClick = () => {
    setDialogueBarMessages([
      { message: 'The mirror reflects your image. You are so handsome!' }
    ])
  }

  const handleFurnaceClick = () => {
    setDialogueBarMessages([
      { message: 'The furnace is hot as hell. Unfortunately, you forgot to bring the sunscreen with you. Better to get a tan only after this adventure.' }
    ])
  }

  const handleSkullClick = () => {
    setDialogueBarMessages([
      { message: 'The alchemist is a great fan of Hamlet.' }
    ])
  }

  const handleBossBattleGateClick = () => {
    if(alchemistRiddleSolved) {
      // this item is needed to beat the boss!
      if(!bookOfSpellsAlreadyFound) {
        setDialogueBarMessages([
          { message: 'Well done you deactivated the barrier!' },
          { message: 'But the alchemist casts very powerful spells! Better to discover how to neutralize them first...' }
        ])
      }
    } else {
      setModalChildren(answerSubmissionComponent)
    }
  }

  const answerSubmissionComponent = <AnswerSubmission
    riddle='alchemist_cave'
    errorMessage='The password is wrong...' 
    explanations={[
      'The access to the cave seems to be blocked by an invisible barrier...',
      'There is a writing on the floor: "It\'s elementary!"',
      'It seems you need to insert a password to deactivate the barrier: '
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