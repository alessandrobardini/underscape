import { SessionContext } from 'App'
import React, { useContext } from 'react'
import CountdownTimer from './Countdown'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'

import './TopBar.scss'
import Link from 'ui/Link'

const TopBar: React.FC = () => {
  const { user, gameEndsAt } = useContext(SessionContext)
  return (
    <div className='TopBar'>
      <div>Progress: 60%</div>
      <div>{ user.name }</div>
      <div>
        <CountdownTimer targetDate={Date.parse(gameEndsAt)}/>
        <Link to='#' type='danger' size='xs' onClick={() => window.confirm('Are you sure? The timer will not be stopped!') && signOut().then(() => window.location.replace('/app'))}>Logout</Link>
      </div>
    </div>
  )
}

export const signOut = () => axios.delete('/users/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default TopBar
