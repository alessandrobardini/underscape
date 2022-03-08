import React, { useContext } from 'react'
import { SessionContext } from 'App'
import TopBar from '../../components/Layout/TopBar'
import YouLost from 'pages/YouLost'
import MapBoard from 'components/Overview/MapBoard'

import './Overview.scss'

const Overview: React.FC = () => {
  const { user, gameEndsAt } = useContext(SessionContext)

  if(timeIsOver(gameEndsAt)) {
    return <YouLost />
  }

  return <div className='Overview'>
    <TopBar />
    <MapBoard />
  </div>
}

const timeIsOver = (gameEndsAt: string) => (Date.parse(gameEndsAt) - Date.now()) < 0

export default Overview