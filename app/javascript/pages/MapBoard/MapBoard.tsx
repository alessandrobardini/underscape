import { appPath } from 'App'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'ui/Button'
import './MapBoard.scss'

const MapBoard: React.FC = () => {
  const history = useHistory()
  return <div className='MapBoard'>
    <Button onClick={() => history.push(appPath('/alchemist'))}>Alchemist Alcove</Button>
    <Button onClick={() => history.push(appPath('/crypts'))}>Crystal Crypts</Button>
  </div>
}

export default MapBoard