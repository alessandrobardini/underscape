import { signOut } from 'components/Layout/TopBar'
import { CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'ui/Link'
import demiurge from 'images/demiurge.png'
import ghost from 'images/ghost.png'
import alchemist from 'images/alchemist_boss.png'
import goat from 'images/asriel.png'

import './YouWin.scss'

type YouWinProps = {
  setDialogueBarMessages: (messages: Array<DialogueBarMessageType>) => void
  gameFinishedInSeconds: number
}

const YouWin: React.FC<YouWinProps> = ({ setDialogueBarMessages, gameFinishedInSeconds }) => {
  const [showYouWin, setShowYouWin] = useState(false)
  useEffect(() => {
    setDialogueBarMessages([
      { message: 'You finally enter the throne room...' },
      { message: '... but it\'s empty! Where is the king?' },
      { character: 'goat', message: 'Surprised, eh? Well, I think it\'s time for you to discover our secret!' },
      { character: 'goat', message: 'Let me gather my friends first...' },
      { character: 'ghost', message: 'Here I am! I ran to get here in time!' },
      { character: 'alchemist', message: 'BONE-jour! Did I lose something?' },
      { character: 'demiurge', message: 'Why do I have to witness this idiocy...' },
      { character: 'goat', message: 'The truth is that...' },
      { character: 'ghost', message: '... Magaland never had an evil king!' },
      { character: 'alchemist', message: 'To be more precise we never had a king!' },
      { character: 'demiurge', message: '... What an incredible discovery. Yeee. Yeee.' },
      { character: 'goat', message: `Come on, ${CHARACTERS['demiurge'].name}! Don't be annoying for this time! Don't start talking about your conspiracies!` },
      { character: 'demiurge', message: 'I told you a million times, we are not real! This is an online game! We do not exist!' },
      { character: 'ghost', message: 'Here we go again.' },
      { character: 'alchemist', message: `${CHARACTERS['demiurge'].name}, don't lie! We are born here in Magaland! You are my brother!` },
      { character: 'demiurge', message: 'Your brother?' },
      { character: 'alchemist', message: 'Of course, aren\'t you a skeleton? You are my bro. We are verteBROS, we always have each other back.' },
      { character: 'demiurge', message: 'Dear lord, why...' },
      { character: 'ghost', message: 'Magaland is a really peaceful land! No bad guys here! Only runners and Spooky Sprint champs!' },
      { character: 'goat', message: 'And maybe some weirdos like the four of us.' },
      { character: 'alchemist', message: 'Yeah, we are BONE to be good and friendly people!' },
      { character: 'ghost', message: 'We wouldn\'t hurt a fly!' },
      { character: 'demiurge', message: 'Speak for yourself, weirdos!' },
      { character: 'goat', message: 'Warrior of light, we were a bit bored so we made you come here to have fun with us!' },
      { character: 'ghost', message: 'Running with you has been great! And you are fast as hell!' },
      { character: 'alchemist', message: 'And you smiled at my SANS-tastic puns!' },
      { character: 'demiurge', message: 'Btw, the warrior of light prophecy is most idiot thing I ever heard.' },
      { character: 'goat', message: `But ${CHARACTERS['demiurge'].name}, you wrote that prophecy.` },
      { character: 'demiurge', message: 'Hold on a sec, the developers who created me MADE me write this stuff. I am a demiurge, I do not write prophecies.' },
      { character: 'ghost', message: 'A demiurge? I thought you were a jerk.' },
      { character: 'goat', message: 'The developers who created you?' },
      { character: 'demiurge', message: 'Of course! Instead of focusing on their work, they wasted time on this stuff! Unbelievable...' },
      { character: 'ghost', message: 'Well, I need to go now, I need to train for the next Spooky Sprint championship!' },
      { character: 'goat', message: 'I have to go buy a new pair of sunglasses.' },
      { character: 'alchemist', message: 'And my next stand-up comedy show is calling me!' },
      { character: 'goat', message: 'So, warrior of light...', onCloseMessage: () => setShowYouWin(true) },
    ])
  }, [])

  return <div className='YouWin'>
    {showYouWin ? <div className='win'>
      <div className='characters'>
        <div className='character'><img src={alchemist} /></div>
        <div className='character'><img src={ghost} /></div>
        <div className='character'><img src={demiurge} /></div>
        <div className='character'><img src={goat} /></div>
      </div>
      <span className='thanks'>THANKS FOR PLAYING!</span>
      <span className='finished'>{`Game finished in: ${secondsToHms(gameFinishedInSeconds)}`}</span>
      <Link to='/app'>Back to home</Link>
    </div> : <div className='throne'/>}
  </div>
}

const secondsToHms = (seconds) => {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return (hDisplay + mDisplay + sDisplay) 
}

export default YouWin