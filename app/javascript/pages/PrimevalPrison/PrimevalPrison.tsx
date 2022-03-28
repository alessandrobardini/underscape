import React, {useContext, useEffect, useState} from 'react'

import './PrimevalPrison.scss'
import {bagContains, CHARACTERS, riddleSolved, SessionContext} from "../../Game";
import HiddenElement from "../../components/Layout/HiddenElement";
import {generateCode} from "../../helpers/morseGenerator";
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission';
import GoatBossBattle from 'components/PrimevalPrison/GoatBossBattle';
import { appPath } from 'App';
import { useHistory } from 'react-router-dom';

const PrimevalPrison: React.FC = () => {

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
    history.replace(appPath('/map'))
  }

  useEffect(() => {
    if(!bagContainsMorse) {
      setDialogueBarMessages([
        {message: 'The prison is completely shrouded in the dark... You see nothing...'},
        {message: 'You take your smarpthone and turn on the torch...', onCloseMessage: () => setIsCompletelyDark(false)},
        {character: 'goat', message: 'WHAT ARE YOU DOING???'},
        {character: 'goat', message: 'What is this bright light?'},
        {character: 'goat', message: '...'},
        {character: 'goat', message: 'Oh, the prophecy was right! "One day, a noble warrior of light will come to brighten the kingdom of Magaland..."'},
        {character: 'goat', message: 'The day has come! YOU are the warrior of light!'},
        {character: 'goat', message: '...'},
        {character: 'goat', message: 'What? Why I hate light?'},
        {character: 'goat', message: 'Well, when I was a small goat, I\'ve been staring at the sun too long. From that day, I strongly hate light!'},
        {character: 'goat', message: 'Better to live inside these dark and welcoming prisons...'},
        {character: 'goat', message: 'Btw, go away, warrior of light! I care about my eyes and I forgot the sunglasses today!'},
        {character: 'goat', message: 'Luckily, I have a dear friend who will block you from reaching me at the end of the corridor!'},
        {character: 'goat', message: 'Deadly Fog, my dear friend! You must block this shiny knight!'},
        {character: 'goat', message: 'Goodbye, warrior of light! See you never!', onCloseMessage: () => setShowFog(true)},
      ])
    }
  }, [])

  useEffect(() => {
    if(canProceedToBossBattle) {
      setDialogueBarMessages([
        { character: 'goat', message: 'Deadly Fog! Why did you allow this noble heart to reach me!' },
        { character: 'goat', message: 'Please, go away! I cannot stand your pure light!'},
        { character: 'goat', message: 'I am the last obstacle before the king, but I have some tricks up my sleeve yet!'},
        { character: 'goat', message: 'Colored Fogs! Debriefing!'},
        { character: 'goat', message: 'Protect me and block the path to the warrior of light! Move on!', onCloseMessage: () => setShowBattlePage(true)}
      ])
    }
  }, [canProceedToBossBattle])

  const morseL = (lanternClassName: string, setLanternClassName: any) => {
    setLanternClassName(lanternClassName.replace('light-off', 'light'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('light', 'light-off')), 3000)
  }
  const morseS = (lanternClassName: string, setLanternClassName: any) => {
    setLanternClassName(lanternClassName.replace('light-off', 'light'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('light', 'light-off')), 500)
  }

  let i = 0
  let time = 0

  const playMorseCode = (phrase: string, lanternClassName: string, setLanternClassName: any, setLight: any) => {
    if (lanternClassName) {
      setTimeout(function () {
        if (phrase[i] === '-') {
          morseL(lanternClassName, setLanternClassName)
          time = 3200
        } else if (phrase[i] === '.') {
          morseS(lanternClassName, setLanternClassName)
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
        message: `Let\'s turn off the light. ${CHARACTERS['goat'].name} will be happy. You are a selfless warrior of light!`
      }])
    } else {
      setDialogueBarMessages([{
        message: `Let\'s turn on the light. ${CHARACTERS['goat'].name} will be sad, but honestly who cares. What a selfish warrior of light you are!`
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
    errorMessage='The password is wrong...' 
    explanations={[
      'With best regards, warrior of light!',
      'I am the Deadly Fog!',
      'You need to provide a four letters word in order to pass.'
    ]}
    onCorrectAnswerSubmission={closeModal}
  />

  const handleBossBattleGateClick = () => {
    if(morseRiddleSolved) {
      // the items are needed to beat the boss!
      if(!bagContainsAllItems) {
        setDialogueBarMessages([
          { message: 'Well done, the Deadly Fog lets you pass!' },
          { message: 'Are you sure you found all the items in the area though?' }
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
                     onClick={() => handleLanternClick({ itemMessage: 'With the lights on, you found an item inside the lantern!', item: 'morse', bagContains: bagContainsMorse, letter:  's', lanternClassName: lanternBackLeftClassName,  setLanternClassName: setLanternBackLeftClassName, setLight: setBackLeftLight } )}/>
      <HiddenElement extraClassName={backRightLight ? lanternBackRightClassName : 'light-off'} top='370px' left='1060px'
                     width='35px' height='35px'
                     onClick={() => handleLanternClick({ itemMessage: 'With the lights on, you found an item inside the lantern!', item: 'prison_keeper', bagContains: bagContainsKeeperNote, letter:  'a', lanternClassName: lanternBackRightClassName,  setLanternClassName: setLanternBackRightClassName, setLight: setBackRightLight } )}/>
      <HiddenElement extraClassName={frontLeftLight ? lanternFrontLeftClassName : 'light-off'} top='310px' left='700px'
                     width='50px' height='60px'
                     onClick={() => handleLanternClick({ itemMessage: 'With the lights on, you found an item inside the lantern!', item: 'ode', bagContains: bagContainsOde, letter:  't', lanternClassName: lanternFrontLeftClassName,  setLanternClassName: setLanternFrontLeftClassName, setLight: setFrontLeftLight } )}/>
      <HiddenElement extraClassName={frontRightLight ? lanternFrontRightClassName : 'light-off'} top='310px'
                     left='1160px' width='70px' height='60px'
                     onClick={() => handleLanternClick({ itemMessage: 'With the lights on, you found an item inside the lantern!', item: 'rainbow', bagContains: bagContainsRainbow, letter:  'p', lanternClassName: lanternFrontRightClassName,  setLanternClassName: setLanternFrontRightClassName, setLight: setFrontRightLight } )}/>
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
