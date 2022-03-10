import React, { useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from 'pages/NotFound'
import AlchemistAlcove from 'pages/AlchemistAlcove/AlchemistAlcove'
import TopBar from 'components/Layout/TopBar'
import YouLost from 'pages/YouLost'
import MapBoard from 'pages/MapBoard/MapBoard'
import { appPath, getUser } from 'App'
import DialogueBar from 'components/Layout/DialogueBar'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import hydrogen from 'images/hydrogen.jpg'

import './Game.scss'

export const ITEMS = {
  'periodic_table': {
    imageSrc: hydrogen,
    name: 'Periodic table of elements',
    message: 'Do yo want to create delightful cocktails?',
    action: () => window.open('https://storage.googleapis.com/escape-room-bucket/periodic_table.svg', '_blank')
  }
}

export type SessionContextType = {
  user: {
    name: string
  },
  items: {
    name: string
  }[],
  gameEndsAt: string,
  itemFound: (itemName: string) => void
}

export const SessionContext = React.createContext<SessionContextType>(null)

export type DialogueBarMessageType = {
  imageSrc?: string
  title?: string
  message: string
}

type GameProps = {
  data: {
    data: {
      user: {
        name: string
      },
      items: {
        name: string
      }[],
      game_ends_at: string
    }
  }
}

const Game: React.FC<GameProps> = (props) => {
  const [data, setData] = useState(props.data)
  const { data: { user, game_ends_at, items } } = data
  const refetch = () => {
    getUser().then((data) => setData(data))
  }
  const itemFound = (name: string) => {
    return axios.post(
      '/items',
      { item: { name }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => { refetch() })
  }
  const sessionContext = { user, gameEndsAt: game_ends_at, items, itemFound }

  if(timeIsOver(game_ends_at)) {
    return <YouLost />
  }

  return (
    <div className='Game'>
      <SessionContext.Provider value={sessionContext}>
        <TopBar />
        <Switch>
          <Route exact path={appPath('/map')} component={MapBoard} />
          <Route exact path={appPath('/alchemist')} component={AlchemistAlcove} />
          <Route component={NotFound} />
        </Switch>
      </SessionContext.Provider>
  </div>
  )
}

const timeIsOver = (gameEndsAt: string) => (Date.parse(gameEndsAt) - Date.now()) < 0

export const bagContains = (itemName: string) => {
  const { items } = useContext(SessionContext)
  return items.map(({ name }) => name).includes(itemName)
}

export default Game