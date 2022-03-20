import { appPath } from 'App'
import { SessionContext } from 'Game'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './MapBoard.scss'

const MapBoard: React.FC = () => {
  return <div className='MapBoard'>
    <div className='row'>
      <Location title='Alchemist Alcove' icon='fa-magic' currentBoss='alchemist' path='/alchemist'/>
      <Location title='Crystal Crypts' icon='fa-diamond' currentBoss='ghost' previousBoss='alchemist' path='/crypts'/>
    </div>
    <div className='row'>
      <Location title='(Fourth) Wall Breach' icon='fa-building' currentBoss='demiurge' previousBoss='ghost' path='/wall'/>
      <div className='location' onClick={() => alert('TODO')}>
        <i className='fa fa-diamond'/>
        <span>TODO</span>
      </div>
    </div>
  </div>
}

type LocationProps = {
  icon: string
  title: string
  path: string
  previousBoss?: string 
  currentBoss: string
}

const Location: React.FC<LocationProps> = ({ previousBoss = null, currentBoss, title, icon, path }) => {
  const { bosses } = useContext(SessionContext)
  const history = useHistory()
  const previousBossDefeated = previousBoss === null ? true: bosses.map(({ name }) => name).includes(previousBoss)
  const currentBossDefeated = bosses.map(({ name }) => name).includes(currentBoss)

  return <div className={`location ${!previousBossDefeated ? 'blocked' : ''} ${currentBossDefeated ? 'done' : ''}`} {...((!currentBossDefeated && previousBossDefeated) && { onClick: () => history.push(appPath(path))})}>
    <i className={`fa ${icon}`}/>
    <span>{title}</span>
    {!previousBossDefeated && <span className='blocked'>LOCKED</span>}
    {currentBossDefeated && <span className='done'>DONE!</span>}
  </div>
}

export default MapBoard