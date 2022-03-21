import {ItemType, SessionContext} from 'Game'
import React, { useContext } from 'react'
import CountdownTimer from './Countdown'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'
import Link from 'ui/Link'
import Bag from './ModalContent/Bag'

import './TopBar.scss'

const TopBar: React.FC = () => {
  const { user, gameEndsAt, setModalChildren } = useContext(SessionContext)
  const lives = 1
  return (
    <div className='TopBar'>
      <div className='container top-left'>
        <div>Progress: 60%</div>
        <div><Button icon iconLeft='fa fa-suitcase' onClick={() => setModalChildren(<Bag />)} /></div>
      </div>
      <div className='username container'>
        <span>{ user.name }</span>
      </div>
      <div className='container'>
        <Heart lives={lives}/>
      </div>
      <div className='container countdown'>
        <CountdownTimer targetDate={Date.parse(gameEndsAt)}/>
        <Link to='#' type='danger' size='xs' onClick={() => window.confirm('Are you sure? The timer will not be stopped!') && signOut().then(() => window.location.replace('/app'))}>Logout</Link>
      </div>
    </div>
  )
}

type HeartProps = {
  lives: number
}

const Heart: React.FC<HeartProps> = ({lives}) =>
  <svg className={`${lives >= 2 ? `strong-heart` : lives == 1 ? `weak-heart` : `dead-heart`}`} viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>

export const signOut = () => axios.delete('/users/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default TopBar
