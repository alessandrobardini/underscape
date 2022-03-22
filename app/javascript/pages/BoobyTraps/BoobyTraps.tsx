import React, {useContext, useEffect, useState} from 'react'

import './BoobyTraps.scss'
import {SessionContext} from "../../Game";
import HiddenElement from "../../components/Layout/HiddenElement";
import {generateCode} from "../../helpers/morseGenerator";

const BoobyTraps: React.FC = () => {

  const {setDialogueBarMessages, lives} = useContext(SessionContext)
  const [corridorLights, setCorridorLights] = useState(true)
  const [frontRightLight, setFrontRightLight] = useState(false)
  const [frontLeftLight, setFrontLeftLight] = useState(false)
  const [backLeftLight, setBackLeftLight] = useState(false)
  const [backRightLight, setBackRightLight] = useState(false)
  const [lastLight, setLastLight] = useState(false)
  const [lanternFrontRightClassName, setLanternFrontRightClassName] = useState('light')
  const [lanternFrontLeftClassName, setLanternFrontLeftClassName] = useState('light')
  const [lanternBackRightClassName, setLanternBackRightClassName] = useState('light')
  const [lanternBackLeftClassName, setLanternBackLeftClassName] = useState('light')
  const [lanternLastClassName, setLanternLastClassName] = useState('light')

  useEffect(() => {
    setDialogueBarMessages([
      // {character: 'alchemist', message: 'You are almost out of here'},
      // {character: 'alchemist', message: 'I am SANS, the master alchemist of Magaland and I hate being disturbed!'},
      // {character: 'alchemist', message: 'Moreover, I am the most appreciated comedian of the kingdom!'},
      // {character: 'alchemist', message: 'My bone jokes are the best of the best, they are so... HUMERUS!'},
    ])
  }, [])

  const morseL = (lanternClassName: string, setLanternClassName: any) => {
    setLanternClassName(lanternClassName.replace('short', ''))
    setLanternClassName(lanternClassName.replace('long', ''))
    setLanternClassName(lanternClassName.concat(' long'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('long', '')), 1200)
  }
  const morseS = (lanternClassName: string, setLanternClassName: any) => {
    setLanternClassName(lanternClassName.replace('long', ''))
    setLanternClassName(lanternClassName.concat(' short'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('short', '')), 400)
  }
  const morseN = (lanternClassName: string, setLanternClassName: any) => {
    setLanternClassName(lanternClassName.replace('short', ''))
    setLanternClassName(lanternClassName.replace('long', ''))
  }

  let i = 0
  let time = 0

  const playMorseCode = (phrase: string, lanternClassName: string, setLanternClassName: any, setLight: any) => {
    if (lanternClassName) {
      setTimeout(function () {
        console.log(phrase[i])
        if (phrase[i] === '-') {
          morseL(lanternClassName, setLanternClassName)
          time = 1400
        } else if (phrase[i] === '.') {
          morseS(lanternClassName, setLanternClassName)
          time = 800
        } else if (phrase[i] === ' ') {
          morseN(lanternClassName, setLanternClassName)

          time = 1200
        }

        i++

        if (i < phrase.length) {
          playMorseCode(phrase, lanternClassName, setLanternClassName, setLight)
        } else {
          i = 0
          setTimeout(() => playMorseCode, 5000)
          setTimeout(() => setLight(false), 1000)

        }

      }, time)
    }
  }

  const switchLanternLights = (word: string, lanternClassName: string, setLanternClassName: any, setLight: any) => {
    if (corridorLights == false) {
      setLight(true)
      const phrase = generateCode(word)
      playMorseCode(phrase, lanternClassName, setLanternClassName, setLight)
    }
  }

  const switchOffAllLanternLights = () => {
    setBackLeftLight(false)
    setBackRightLight(false)
    setFrontLeftLight(false)
    setFrontRightLight(false)
    setLastLight(false)
  }

  const switchCorridorLights = () => {
    setCorridorLights(!corridorLights)
    if (corridorLights) {
      setDialogueBarMessages([{
        message: 'Whoo, where did the light go? How can I see the way now?'
      }])
    } else {
      setDialogueBarMessages([{
        message: 'Whoo, much better now.'
      }])
      switchOffAllLanternLights()
    }
  }

  return <div className={'BoobyTraps'}>
    <div className={corridorLights ? 'corridor' : 'dark-corridor'}>
      <HiddenElement top='160px' left='900px' width='110px' height='40px' onClick={() => switchCorridorLights()}/>
      <HiddenElement extraClassName={backLeftLight ? lanternBackLeftClassName : 'light-off'} top='370px' left='825px' width='35px' height='35px'
                     onClick={() => switchLanternLights('l', lanternBackLeftClassName, setLanternBackLeftClassName, setBackLeftLight)}/>
      <HiddenElement extraClassName={lastLight ? lanternLastClassName : 'light-off'} top='390px' left='865px' width='25px' height='25px'
                     onClick={() => switchLanternLights('i', lanternLastClassName, setLanternLastClassName, setLastLight)}/>
      <HiddenElement extraClassName={backRightLight ? lanternBackRightClassName : 'light-off'} top='370px' left='1060px' width='35px' height='35px'
                     onClick={() => switchLanternLights('g', lanternBackRightClassName, setLanternBackRightClassName, setBackRightLight)}/>
      <HiddenElement extraClassName={frontLeftLight ? lanternFrontLeftClassName : 'light-off'} top='310px' left='700px' width='50px' height='60px'
                     onClick={() => switchLanternLights('h', lanternFrontLeftClassName, setLanternFrontLeftClassName, setFrontLeftLight)}/>
      <HiddenElement extraClassName={frontRightLight ? lanternFrontRightClassName : 'light-off'} top='310px' left='1160px' width='70px' height='60px'
                     onClick={() => switchLanternLights('t', lanternFrontRightClassName, setLanternFrontRightClassName, setFrontRightLight)}/>
    </div>
  </div>

}

export default BoobyTraps
