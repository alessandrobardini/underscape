import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { SessionContext } from 'Game'
import React, { useContext } from 'react'

import './AlchemistAlcove.scss'

const AlchemistAlcove: React.FC = () => {
  const { setDialogueBarMessages, setModalChildren } = useContext(SessionContext)

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

  const answerSubmissionComponent = <AnswerSubmission
    riddle='alchemist_cave'
    message='Great job! You disabled the barrier'
    errorMessage='The password is wrong...' 
    explanations={[
      'The access to the cave seems to be blocked by an invisible barrier...',
      'There is a writing on the floor: "It\'s elementary!"',
      'It seems you need to insert a password to deactivate the barrier: '
    ]}
  />
  
  return <div className='AlchemistAlcove'>
    <div className='map'>
      <HiddenElement top='496px' left='401px' width='135px' height='206px' pickableItem='periodic_table' />
      <HiddenElement top='410px' left='820px' width='240px' height='300px' onClick={() => setModalChildren(answerSubmissionComponent)} />
      <HiddenElement top='510px' left='1085px' width='50px' height='100px' onClick={handleMirrorClick} />
      <HiddenElement top='380px' left='1570px' width='84px' height='137px' onClick={handleFurnaceClick} />
      <HiddenElement top='511px' left='630px' width='39px' height='37px' onClick={handleSkullClick} />
      <HiddenElement top='778px' left='589px' width='79px' height='50px' pickableItem='principles_of_life' />
      <HiddenElement top='871px' left='170px' width='90px' height='50px' pickableItem='book_of_spells' />
    </div>
  </div>
}

export default AlchemistAlcove 