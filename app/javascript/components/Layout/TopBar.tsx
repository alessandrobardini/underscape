import { ITEMS, SessionContext } from 'Game'
import React, { useContext, useState } from 'react'
import CountdownTimer from './Countdown'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'

import './TopBar.scss'
import Link from 'ui/Link'
import Modal from './Modal'

const TopBar: React.FC = () => {
  const { user, gameEndsAt, items } = useContext(SessionContext)
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div className='TopBar'>
      <div className='container top-left'>
        <div>Progress: 60%</div>
        <div><Button icon iconLeft='fa fa-suitcase' onClick={() => setShowModal(true)} /></div>
      </div>
      <div className='username container'>
        <span>{ user.name }</span>
      </div>
      <div className='container countdown'>
        <CountdownTimer targetDate={Date.parse(gameEndsAt)}/>
        <Link to='#' type='danger' size='xs' onClick={() => window.confirm('Are you sure? The timer will not be stopped!') && signOut().then(() => window.location.replace('/app'))}>Logout</Link>
      </div>
      {showModal && 
      <Modal closeModal={() => setShowModal(false)}>
        {<ul>{items.map(({ name }) =>
        <li key={name}>
          <img src={ITEMS[name].imageSrc} width='50px'/>
          <div className='m-l-sm'>{ITEMS[name].name}</div>
          <Button size='s' onClick={ITEMS[name].action}>USE</Button>
          </li>
        )}</ul>}
      </Modal>
      }
    </div>
  )
}

export const signOut = () => axios.delete('/users/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default TopBar
