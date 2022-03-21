import React, {useContext, useEffect, useState} from 'react'

import './BoobyTraps.scss'
import {SessionContext} from "../../Game";
import HiddenElement from "../../components/Layout/HiddenElement";

const BoobyTraps: React.FC = () => {

  const {setDialogueBarMessages, lives} = useContext(SessionContext)
  const [corridorLights, setCorridorLights] = useState(true)
  const [lanternLight, setLanternLight] = useState(false)
  const [lanternClassName, setLanternClassName] = useState('light')

  let phrase = 'Light'
  phrase = phrase.toLowerCase().replace(/[^a-z]/g, '')

  const alphabet = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
    'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
    'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
    'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
    'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
    'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
    'y': '-.--', 'z': '--..', ' ': '/',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----',
  }

  phrase = phrase
    .split('')            // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map(function (e) {     // Replace each character with a morse "letter"
      return alphabet[e.toLowerCase()] || '' // Lowercase only, ignore unknown characters.
    })
    .join(' ')

  const phraseArray = phrase.split('')

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

  const playMorseCode = () => {
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
          playMorseCode()
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
      playMorseCode()
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
    </div>
  </div>

}

export default BoobyTraps
