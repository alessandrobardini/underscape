import {ItemType, SessionContext} from 'Game'
import React, { useContext } from 'react'
import CountdownTimer from './Countdown'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'
import Link from 'ui/Link'
import Bag from './ModalContent/Bag'

import './TopBar.scss'
import { useHistory } from 'react-router-dom'

const TopBar: React.FC = () => {
  const { user, gameEndsAt, setModalChildren } = useContext(SessionContext)
  const history = useHistory()
  const onHomeClick = () => {
    window.confirm('Do you want to go back to the main map? Some progress could not be saved!') && history.push('/app/map')
  }
  return (
    <div className='TopBar'>
      <div className='container top-left'>
        <div>Progress: 60%</div>
        <div><Button icon iconLeft='fa fa-suitcase' onClick={() => setModalChildren(<Bag />)} /></div>
        <div><Button icon iconLeft='fa fa-home' onClick={onHomeClick} /></div>
      </div>
      <div className='username container'>
        <span>{ user.name }</span>
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

export const signOut = () => axios.delete('/users/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default TopBar
