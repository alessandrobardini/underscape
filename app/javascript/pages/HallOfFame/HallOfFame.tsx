import React, { useEffect, useState } from 'react'
import logo from 'images/magaloop_logo_color.png'
import csrfToken from 'helpers/csrfToken'
import Form from 'components/Layout/Form'
import Input from 'ui/Input'
import Button from 'ui/Button'
import axios from 'axios'

import './HallOfFame.scss'
import { secondsToHms } from 'pages/YouWin'

const HallOfFame: React.FC = () => {
  const [winners, setWinners] = useState([])
  useEffect(() => {
    axios.get('/users/sessions/winners').then((data) => setWinners(data.data.winners as any))
  }, [])

    return <div className='HallOfFame'>
      <h1>Hall of Fame</h1>
      <h3>Who are the fastest players?</h3>
      {winners.length > 0 ? <div className='winners'>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Team name</th>
              <th>Game started at</th>
              <th>Game finished in</th>
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