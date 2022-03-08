import React, { useContext, useState } from 'react'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'
import { SessionContext } from 'App'
import TopBar, { signOut } from '../../components/Layout/TopBar'

import './Overview.scss'
import Link from 'ui/Link'

const Overview: React.FC = () => {
  const { user, gameEndsAt } = useContext(SessionContext)

  if(timeIsOver(gameEndsAt)) {
    return <>
    <div>YOU LOST!</div>
    <Link to='#' type='danger' size='xs' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Link>
    </>
  }
  // the game finises one hour after
  return <div className='Overview'>
    <TopBar />
    {/* <div> this is the progress</div>
    <div> this is the team name</div>
    <div> this is the timer</div>
    <div> this is the logout</div> */}
    {/* <div>This is the overview page of the game</div>
    <Button type='danger' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Button> */}
  </div>
}

const timeIsOver = (gameEndsAt: string) => (Date.parse(gameEndsAt) - Date.now()) < 0

export default Overview