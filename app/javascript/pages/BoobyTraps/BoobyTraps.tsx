import React, {useContext, useEffect, useState} from 'react'

import './BoobyTraps.scss'
import {SessionContext} from "../../Game";
import HiddenElement from "../../components/Layout/HiddenElement";
import {generateCode} from "../../helpers/morseGenerator";

const BoobyTraps: React.FC = () => {

  const {setDialogueBarMessages, lives} = useContext(SessionContext)
  const [corridorLights, setCorridorLights] = useState(true)
  const [lanternLight, setLanternLight] = useState(false)
  const [lanternClassName, setLanternClassName] = useState('light')

  useEffect(() => {
    setDialogueBarMessages([
      // {character: 'alchemist', message: 'You are almost out of here'},
      // {character: 'alchemist', message: 'I am SANS, the master alchemist of Magaland and I hate being disturbed!'},
      // {character: 'alchemist', message: 'Moreover, I am the most appreciated comedian of the kingdom!'},
      // {character: 'alchemist', message: 'My bone jokes are the best of the best, they are so... HUMERUS!'},
    ])
  }, [])

  const morseL = () => {
    setLanternClassName(lanternClassName.replace('short', ''))
    setLanternClassName(lanternClassName.replace('long', ''))
    setLanternClassName(lanternClassName.concat(' long'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('long', '')), 1200)
  }
  const morseS = () => {
    setLanternClassName(lanternClassName.replace('long', ''))
    setLanternClassName(lanternClassName.concat(' short'))
    setTimeout(() => setLanternClassName(lanternClassName.replace('short', '')), 400)
  }
  const morseN = () => {
    setLanternClassName(lanternClassName.replace('short', ''))
    setLanternClassName(lanternClassName.replace('long', ''))
  }

  let i = 0
  let time = 0

  const playMorseCode = (phrase) => {
    if (lanternClassName) {
      setTimeout(function () {
        console.log(phrase[i])
        if (phrase[i] === '-') {
          morseL()
          time = 1400
        } else if (phrase[i] === '.') {
          morseS()
          time = 800
        } else if (phrase[i] === ' ') {
          morseN()

          time = 1200
        }

        i++

        if (i < phrase.length) {
          playMorseCode(phrase)
        } else {
          i = 0
          setTimeout(() => playMorseCode, 5000)
        }

      }, time)
    }
  }

  const switchLanternLights = () => {
    if (corridorLights == false) {
      setLanternLight(true)
      const phrase = generateCode('light')
      playMorseCode(phrase)
    }
  }

  const switchCorridorLights = () => {
    setCorridorLights(!corridorLights)
    if (corridorLights) {
      setDialogueBarMessages([{
        message: 'Whoo, where did the light go?'
      }])
      setLanternLight(false)
    } else {
      setDialogueBarMessages([{
        message: 'Whoo, where did the light go?'
      }])
    }
  }

  return <div className={'BoobyTraps'}>
    <div className={corridorLights ? 'corridor' : 'dark-corridor'}>
      <HiddenElement top='160px' left='900px' width='110px' height='40px' onClick={() => switchCorridorLights()}/>
      <HiddenElement extraClassName={lanternLight ? lanternClassName : 'light-off'} top='370px' left='830px'
                     width='35px' height='35px' onClick={() => switchLanternLights()}/>
      <HiddenElement extraClassName={lanternLight ? lanternClassName : 'light-off'} top='380px' left='870px'
                     width='35px' height='35px' onClick={() => switchLanternLights()}/>
      <HiddenElement extraClassName={lanternLight ? lanternClassName : 'light-off'} top='370px' left='1060px'
                     width='35px' height='35px' />
      <HiddenElement extraClassName={lanternLight ? lanternClassName : 'light-off'} top='320px' left='700px'
                     width='35px' height='35px' onClick={() => switchLanternLights()}/>
      <HiddenElement extraClassName={lanternLight ? lanternClassName : 'light-off'} top='320px' left='1190px'
                     width='35px' height='35px' onClick={() => switchLanternLights()}/>
    </div>
  </div>

}

export default BoobyTraps
