import React, {useContext, useEffect, useState} from 'react'

import './PrimevalPrison.scss'
import {bagContains, CHARACTERS, riddleSolved, SessionContext} from "../../Game";
import HiddenElement from "../../components/Layout/HiddenElement";
import {generateCode} from "../../helpers/morseGenerator";
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission';
import GoatBossBattle from 'components/PrimevalPrison/GoatBossBattle';
import { useHistory } from 'react-router-dom';
import { TranslatorContext } from 'containers/TranslatorLoader';

const PrimevalPrison: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages, pickUpItem, setModalChildren, closeModal, bosses } = useContext(SessionContext)
  const history = useHistory()
  const bagContainsMorse = bagContains('morse')
  const bagContainsOde = bagContains('ode')
  const bagContainsRainbow = bagContains('rainbow')
  const bagContainsKeeperNote = bagContains('prison_keeper')
  const bagContainsAtLeastOneItem = bagContainsMorse || bagContainsOde || bagContainsRainbow || bagContainsKeeperNote
  const bagContainsAllItems = bagContainsMorse && bagContainsOde && bagContainsRainbow && bagContainsKeeperNote
  const [corridorLights, setCorridorLights] = useState(true)
  const [frontRightLight, setFrontRightLight] = useState(false)
  const [frontLeftLight, setFrontLeftLight] = useState(false)
  const [backLeftLight, setBackLeftLight] = useState(false)
  const [backRightLight, setBackRightLight] = useState(false)
  const [lanternFrontRightClassName, setLanternFrontRightClassName] = useState('light')
  const [lanternFrontLeftClassName, setLanternFrontLeftClassName] = useState('light')
  const [lanternBackRightClassName, setLanternBackRightClassName] = useState('light')
  const [lanternBackLeftClassName, setLanternBackLeftClassName] = useState('light')
  const [isCompletelyDark, setIsCompletelyDark] = useState(true && !bagContainsAtLeastOneItem)
  const [showFog, setShowFog] = useState(false || bagContainsAtLeastOneItem)
  const [showBattlePage, setShowBattlePage] = useState<boolean>(false)
  const [canClickOnLamps, setCanClickOnLamps] = useState(true)

  const morseRiddleSolved = riddleSolved('morse')

  const canProceedToBossBattle = morseRiddleSolved && bagContainsAllItems

  if(bosses.map(({ name }) => name).includes('goat')) {
    history.replace(`/app/${i18n.locale}/map`)
  }

  useEffect(() => {
    if(!bagContainsMorse) {
      setDialogueBarMessages([
        {message: i18n.t('goat.dialogues.1')},
        {message: i18n.t('goat.dialogues.2'), onCloseMessage: () => setIsCompletelyDark(false)},
        {character: 'goat', message: i18n.t('goat.dialogues.3')},
        {character: 'goat', message: i18n.t('goat.dialogues.4')},
        {character: 'goat', message: i18n.t('goat.dialogues.5')},
        {character: 'goat', message: i18n.t('goat.dialogues.6')},
        {character: 'goat', message: i18n.t('goat.dialogues.7')},
        {character: 'goat', message: i18n.t('goat.dialogues.8')},
        {character: 'goat', message: i18n.t('goat.dialogues.9')},
        {character: 'goat', message: i18n.t('goat.dialogues.10')},
        {character: 'goat', message: i18n.t('goat.dialogues.11')},
        {character: 'goat', message: i18n.t('goat.dialogues.12')},
        {character: 'goat', message: i18n.t('goat.dialogues.13')},
        {character: 'goat', message: i18n.t('goat.dialogues.14')},
        {character: 'goat', message: i18n.t('goat.dialogues.15'), onCloseMessage: () => setShowFog(true)},
      ])
    }
  }, [])

  useEffect(() => {
    if(canProceedToBossBattle) {
      setDialogueBarMessages([
        { character: 'goat', message: i18n.t('goat.dialogues.16') },
        { character: 'goat', message: i18n.t('goat.dialogues.17')},
        { character: 'goat', message: i18n.t('goat.dialogues.18')},
        { character: 'goat', message: i18n.t('goat.dialogues.19')},
        { character: 'goat', message: i18n.t('goat.dialogues.20'), onCloseMessage: () => setShowBattlePage(true)}
      ])
    }
  }, [canProceedToBossBattle])

  const morseL = (setLanternClassName: any) => {
    setLanternClassName(l => l.replace('light-off', 'light'))
    setTimeout(() => setLanternClassName(l => l.replace('light', 'light-off')), 3000)
  }
  const morseS = (setLanternClassName: any) => {
    setLanternClassName(l => l.replace('light-off', 'light'))
    setTimeout(() => setLanternClassName(l => l.replace('light', 'light-off')), 500)
  }

  let i = 0
  let time = 0

  const playMorseCode = (phrase: string, lanternClassName: string, setLanternClassName: any, setLight: any) => {
    if (lanternClassName) {
      setTimeout(function () {
        if (phrase[i] === '-') {
          morseL(setLanternClassName)
          time = 3200
        } else if (phrase[i] === '.') {
          morseS(setLanternClassName)
          time = 700
        } 
        i++

        if (i < phrase.length) {
          playMorseCode(phrase, lanternClassName, setLanternClassName, setLight)
        } else {
          i = 0
          setTimeout(() => { setLight(false); setCanClickOnLamps(true) }, time)
        }
      }, time)
    }
  }

  const switchOffAllLanternLights = () => {
    setBackLeftLight(false)
    setBackRightLight(false)
    setFrontLeftLight(false)
    setFrontRightLight(false)
  }

  const switchCorridorLights = () => {
    setCorridorLights(!corridorLights)
    if (corridorLights) {
      setDialogueBarMessages([{
        message: i18n.t('goat.dialogues.21', { name: CHARACTERS['goat'].name})
      }])
    } else {
      setDialogueBarMessages([{
        message: i18n.t('goat.dialogues.22', { name: CHARACTERS['goat'].name})
      }])
      switchOffAllLanternLights()
    }
  }

  const handleLanternClick = ({ item, itemMessage, letter, lanternClassName, setLanternClassName, setLight, bagContains } ) => {
    if(canClickOnLamps) {
      if(corridorLights) {
        if(!bagContains) {
          pickUpItem({ firstMessage: itemMessage, pickableItem: item })
        }
      } else {
        setLight(true)
        const phrase = generateCode(letter)
        setCanClickOnLamps(false)
        playMorseCode(phrase, lanternClassName, setLanternClassName, setLight)
      }
    }
  }

  const answerSubmissionComponent = <AnswerSubmission
    riddle='morse'
    errorMessage={i18n.t('goat.objects.fog.error')}
    explanations={[
      i18n.t('goat.objects.fog.content.1'),
      i18n.t('goat.objects.fog.content.2'),
      i18n.t('goat.objects.fog.content.3')
    ]}
    onCorrectAnswerSubmission={closeModal}
  />

  const handleBossBattleGateClick = () => {
    if(morseRiddleSolved) {
      // the items are needed to beat the boss!
      if(!bagContainsAllItems) {
        setDialogueBarMessages([
          { message: i18n.t('goat.dialogues.23') },
          { message: i18n.t('goat.dialogues.24') }
        ])
      }
    } else {
      setModalChildren(answerSubmissionComponent)
    }
  }

  return showBattlePage ? <GoatBossBattle /> : <div className={`PrimevalPrison`}>
    <div className={isCompletelyDark ? 'dark' : corridorLights ? 'corridor' : 'dark-corridor'}>
      <HiddenElement top='160px' left='900px' width='110px' height='40px' onClick={() => switchCorridorLights()}/>
      <HiddenElement extraClassName={backLeftLight ? lanternBackLeftClassName : 'light-off'} top='370px' left='825px'
                     width='35px' height='35px'
                     onClick={() => handleLanternClick({ itemMessage: i18n.t('bag.you_found_an_item_lights_on'), item: 'morse', bagContains: bagContainsMorse, letter: 's', lanternClassName: lanternBackLeftClassName,  setLanternClassName: setLanternBackLeftClassName, setLight: setBackLeftLight } )}/>
      <HiddenElement extraClassName={backRightLight ? lanternBackRightClassName : 'light-off'} top='370px' left='1060px'
                     width='35px' height='35px'
                     onClick={() => handleLanternClick({ itemMessage: i18n.t('bag.you_found_an_item_lights_on'), item: 'prison_keeper', bagContains: bagContainsKeeperNote, letter: 'a', lanternClassName: lanternBackRightClassName,  setLanternClassName: setLanternBackRightClassName, setLight: setBackRightLight } )}/>
      <HiddenElement extraClassName={frontLeftLight ? lanternFrontLeftClassName : 'light-off'} top='310px' left='700px'
                     width='50px' height='60px'
                     onClick={() => handleLanternClick({ itemMessage: i18n.t('bag.you_found_an_item_lights_on'), item: 'ode', bagContains: bagContainsOde, letter: 't', lanternClassName: lanternFrontLeftClassName,  setLanternClassName: setLanternFrontLeftClassName, setLight: setFrontLeftLight } )}/>
      <HiddenElement extraClassName={frontRightLight ? lanternFrontRightClassName : 'light-off'} top='310px'
                     left='1160px' width='70px' height='60px'
                     onClick={() => handleLanternClick({ itemMessage: i18n.t('bag.you_found_an_item_lights_on'), item: 'rainbow', bagContains: bagContainsRainbow, letter: 'p', lanternClassName: lanternFrontRightClassName,  setLanternClassName: setLanternFrontRightClassName, setLight: setFrontRightLight } )}/>
        {showFog && <div className='fogwrapper' onClick={handleBossBattleGateClick}>
          <div id="foglayer_01" className="fog">
            <div className="image01"/>
            <div className="image02"/>
          </div>
          <div id="foglayer_02" className="fog">
            <div className="image01"/>
            <div className="image02"/>
          </div>
          <div id="foglayer_03" className="fog">
            <div className="image01"/>
            <div className="image02"/>
          </div>
        </div>}
    </div>
  </div>

}

export default PrimevalPrison
