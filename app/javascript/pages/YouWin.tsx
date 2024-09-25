import { signOut } from 'components/Layout/TopBar'
import { CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'ui/Link'
import demiurge from 'images/demiurge.png'
import ghost from 'images/ghost.png'
import alchemist from 'images/alchemist_boss.png'
import goat from 'images/asriel.png'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './YouWin.scss'

type YouWinProps = {
  setDialogueBarMessages: (messages: Array<DialogueBarMessageType>) => void
  gameFinishedInSeconds: number
}

const YouWin: React.FC<YouWinProps> = ({ setDialogueBarMessages, gameFinishedInSeconds }) => {
  const i18n = useContext(TranslatorContext)
  const [showYouWin, setShowYouWin] = useState(false)
  useEffect(() => {
    setDialogueBarMessages([
      { message: i18n.t('throne.dialogues.1') },
      { message: i18n.t('throne.dialogues.2') },
      { character: 'goat', message: i18n.t('throne.dialogues.3') },
      { character: 'goat', message: i18n.t('throne.dialogues.4') },
      { character: 'ghost', message: i18n.t('throne.dialogues.5') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.6') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.7') },
      { character: 'goat', message: i18n.t('throne.dialogues.8') },
      { character: 'ghost', message: i18n.t('throne.dialogues.9') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.10') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.11') },
      { character: 'goat', message: i18n.t('throne.dialogues.12', {name: CHARACTERS['demiurge'].name}) },
      { character: 'demiurge', message: i18n.t('throne.dialogues.13') },
      { character: 'ghost', message: i18n.t('throne.dialogues.14') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.15', {name: CHARACTERS['demiurge'].name}) },
      { character: 'demiurge', message: i18n.t('throne.dialogues.16') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.17') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.18') },
      { character: 'ghost', message: i18n.t('throne.dialogues.19') },
      { character: 'goat', message: i18n.t('throne.dialogues.20') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.21') },
      { character: 'ghost', message: i18n.t('throne.dialogues.22') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.23') },
      { character: 'goat', message: i18n.t('throne.dialogues.24') },
      { character: 'ghost', message: i18n.t('throne.dialogues.25') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.26') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.27') },
      { character: 'goat', message: i18n.t('throne.dialogues.28', {name: CHARACTERS['demiurge'].name}) },
      { character: 'demiurge', message: i18n.t('throne.dialogues.29') },
      { character: 'ghost', message: i18n.t('throne.dialogues.30') },
      { character: 'goat', message: i18n.t('throne.dialogues.31') },
      { character: 'demiurge', message: i18n.t('throne.dialogues.32') },
      { character: 'ghost', message: i18n.t('throne.dialogues.33') },
      { character: 'goat', message: i18n.t('throne.dialogues.34') },
      { character: 'alchemist', message: i18n.t('throne.dialogues.35') },
      { character: 'goat', message: i18n.t('throne.dialogues.36'), onCloseMessage: () => setShowYouWin(true) },
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
      <span className='thanks'>{i18n.t('thanks_for_playing')}</span>
      <span className='finished'>{i18n.t('game_finished_in', { time: secondsToHms(gameFinishedInSeconds)})}</span>
      <Link to='#' onClick={() => signOut().then(() => window.location.replace(`/app/${i18n.locale}/map`))}>{i18n.t('back_home')}</Link>
    </div> : <div className='throne'/>}
  </div>
}

export const secondsToHms = (seconds) => {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return (hDisplay + mDisplay + sDisplay) 
}

export default YouWin