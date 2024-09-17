import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { secondsToHms } from 'pages/YouWin'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './HallOfFame.scss'

const HallOfFame: React.FC = () => {
  const [winners, setWinners] = useState([])
  useEffect(() => {
    axios.get('/users/sessions/winners').then((data) => setWinners(data.data.winners as any))
  }, [])

  const i18n = useContext(TranslatorContext)

    return <div className='HallOfFame'>
      <h1>{i18n.t('hall_of_fame.title')}</h1>
      <h3>{i18n.t('hall_of_fame.subtitle')}</h3>
      {winners.length > 0 ? <div className='winners'>
        <table>
          <thead>
            <tr>
              <th>{i18n.t('hall_of_fame.position')}</th>
              <th>{i18n.t('hall_of_fame.team_name')}</th>
              <th>{i18n.t('hall_of_fame.game_started_at')}</th>
              <th>{i18n.t('hall_of_fame.game_finished_in')}</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => {
              return <tr key={index}>
              <td>{index + 1}</td>
              <td>{winner.name}</td>
              <td>{new Date(winner.created_at).toString().split('GMT')[0]}</td>
              <td>{secondsToHms(winner.game_finished_in_seconds)}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div> : <span>Oh no! No winners so far!</span>}
    </div>
}

export default HallOfFame