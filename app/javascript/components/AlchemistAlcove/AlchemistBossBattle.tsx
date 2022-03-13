import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, riddleSolved, SessionContext } from 'Game'
import alchemist from 'images/alchemist_boss.png'
import React, { useContext, useEffect, useState } from 'react'

import './AlchemistBossBattle.scss'

const AlchemistBossBattle: React.FC = () => {  
  return <div className='AlchemistBossBattle'>
    <img src={alchemist}></img>
    {/* {showBattlePage ?
      <div>ciao</div> :
      <div className='map'>
        <HiddenElement top='496px' left='401px' width='135px' height='206px' pickableItem='periodic_table' />
        <HiddenElement top='410px' left='820px' width='240px' height='300px' onClick={handleBossBattleGateClick} />
        <HiddenElement top='510px' left='1085px' width='50px' height='100px' onClick={handleMirrorClick} />
        <HiddenElement top='380px' left='1570px' width='84px' height='137px' onClick={handleFurnaceClick} />
        <HiddenElement top='511px' left='630px' width='39px' height='37px' onClick={handleSkullClick} />
        <HiddenElement top='778px' left='589px' width='79px' height='50px' pickableItem='principles_of_life' />
        <HiddenElement top='871px' left='170px' width='90px' height='50px' pickableItem='book_of_spells' />
      </div>
    } */}
  </div>
}

export default AlchemistBossBattle 