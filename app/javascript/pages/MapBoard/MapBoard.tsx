import { appPath } from 'App'
import { SessionContext } from 'Game'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './MapBoard.scss'

const MapBoard: React.FC = () => {
  const history = useHistory()
  const { bosses } = useContext(SessionContext)

  const alchemistDefeated = bosses.map(({ name }) => name).includes('alchemist')
  const ghostDefeated = bosses.map(({ name }) => name).includes('ghost')
  const demiurgeDefeated = bosses.map(({ name }) => name).includes('demiurge')

  return <div className='MapBoard'>
    <div className='row'>
      <div className={`location ${alchemistDefeated ? 'done' : ''}`} {...(!alchemistDefeated && { onClick: () => history.push(appPath('/crypts'))})}>
        <i className='fa fa-magic'/>
        <span>Alchemist Alcove</span>
        {alchemistDefeated && <span className='done'>DONE!</span>}
      </div>
      <div className={`location ${!alchemistDefeated ? 'blocked' : ''} ${ghostDefeated ? 'done' : ''}`} {...((!ghostDefeated)  && { onClick: () => history.push(appPath('/crypts'))})}>
        <i className='fa fa-diamond'/>
        <span>Crystal Crypts</span>
        {/* {!alchemistDefeated && <span className='blocked'>LOCKED</span>} */}
        {ghostDefeated && <span className='done'>DONE!</span>}
      </div>
    </div>
    <div className='row'>
      <div className={`location ${!ghostDefeated ? 'blocked' : ''} ${demiurgeDefeated ? 'done' : ''}`} {...((!demiurgeDefeated)  && { onClick: () => history.push(appPath('/wall'))})}>
        <i className='fa fa-building'/>
        <span>(Fourth) Wall Breach</span>
        {/* {!ghostDefeated && <span className='blocked'>LOCKED</span>} */}
        {demiurgeDefeated && <span className='done'>DONE!</span>}
      </div>
      <div className='location' onClick={() => alert('TODO')}>
        <i className='fa fa-diamond'/>
        <span>TODO</span>
      </div>
    </div>
  </div>
}

export default MapBoard