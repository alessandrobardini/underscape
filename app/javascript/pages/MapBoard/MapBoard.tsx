import { SessionContext } from 'Game'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TranslatorContext } from 'containers/TranslatorLoader'
import './MapBoard.scss'

const MapBoard: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  // NB: if you want to quickly test an area without going through the previous ones, simply remove the previousBoss prop from Location
  return <div className='MapBoard'>
    <div className='row'>
      <Location title={i18n.t('map_board.location_1')} icon='fa-magic' currentBoss='alchemist' path='/alchemist'/>
      <Location title={i18n.t('map_board.location_2')} icon='fa-diamond' currentBoss='ghost' path='/crypts'/>
    </div>
    <div className='row'>
      <Location title={i18n.t('map_board.location_3')} icon='fa-building' currentBoss='demiurge' path='/wall'/>
      <Location title={i18n.t('map_board.location_4')} icon='fa-eye-slash' currentBoss='goat' path='/prison'/>
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

  const i18n = useContext(TranslatorContext)

  return <div className={`location ${!previousBossDefeated ? 'blocked' : ''} ${currentBossDefeated ? 'done' : ''}`} {...((!currentBossDefeated && previousBossDefeated) && { onClick: () => history.push(`/app/${i18n.locale}${path}`)})}>
    <i className={`fa ${icon}`}/>
    <span>{title}</span>
    {!previousBossDefeated && <span className='blocked'>{i18n.t('map_board.locked')}</span>}
    {currentBossDefeated && <span className='done'>{i18n.t('map_board.done')}</span>}
  </div>
}

export default MapBoard
