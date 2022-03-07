import React, { useState } from 'react'
import axios from 'axios'
import './Home.scss'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'

const Overview: React.FC = () => {
  return <>
    <div>This is the overview page of the game</div>
    <Button type='danger' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Button>
  </>
}

const signOut = () => axios.delete('/teams/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default Overview