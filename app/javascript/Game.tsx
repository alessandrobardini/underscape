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
import textFile from 'images/text-file.jpg'
import Modal from 'components/Layout/Modal'

import './Game.scss'

export const ITEMS = {
  'periodic_table': {
    imageSrc: hydrogen,
    name: 'Periodic table of elements',
    message: 'Do yo want to create delightful cocktails?',
    action: () => window.open('https://storage.googleapis.com/escape-room-bucket/periodic_table.svg', '_blank')
  },
  'principles_of_life': {
    imageSrc: textFile,
    name: 'Principles of life',
    message: 'For your everyday living',
    action: () => window.open('https://storage.googleapis.com/escape-room-bucket/principles.txt', '_blank')
  },
}

export type SessionContextType = {
  user: {
    name: string
  },
  items: {
    name: string
  }[],
  gameEndsAt: string,
  setDialogueBarMessages: (messages: Array<DialogueBarMessageType>) => void
  setModalChildren: (children: JSX.Element) => void
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
  const [dialogueBarMessages, setDialogueBarMessages] = useState<Array<DialogueBarMessageType>>([])
  const [modalChildren, setModalChildren] = useState<JSX.Element>(null)
  const { data: { user, game_ends_at, items } } = data
  const refetch = () => {
    getUser().then((data) => setData(data))
  }
  const itemFound = (name: string) => {
    setDialogueBarMessages(messagesForItemFound(name))
    return axios.post(
      '/items',
      { item: { name }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => { refetch() })
  }
  const sessionContext = { user, gameEndsAt: game_ends_at, items, itemFound, setDialogueBarMessages, setModalChildren }

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
        { modalChildren && <Modal closeModal={() => setModalChildren(null)}>
          {modalChildren}
        </Modal> }
        <DialogueBar messages={dialogueBarMessages} closeDialogueBar={() => setDialogueBarMessages([])}/>
      </SessionContext.Provider>
  </div>
  )
}

const timeIsOver = (gameEndsAt: string) => (Date.parse(gameEndsAt) - Date.now()) < 0

export const bagContains = (itemName: string) => {
  const { items } = useContext(SessionContext)
  return items.map(({ name }) => name).includes(itemName)
}

export const messagesForItemFound = (itemName: string) => {
  const { imageSrc, name, message } = ITEMS[itemName]
  return [
    { message: 'You found an item!' }, 
    { imageSrc, title: name, message },
    { message: 'You put the item in your bag' }
  ]
}

export const checkAnswer = (riddle: string, answer: string) => {
  return axios.post(
    '/answers/check',
    {
      riddle,
      answer,
      authenticity_token: csrfToken()
    },
    {
      headers: { Accept: 'application/json' },
      responseType: 'json'
    }
  )
}

export default Game