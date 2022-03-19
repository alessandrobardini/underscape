import React, { useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from 'pages/NotFound'
import AlchemistAlcove from 'pages/AlchemistAlcove/AlchemistAlcove'
import TopBar from 'components/Layout/TopBar'
import YouLost from 'pages/YouLost'
import MapBoard from 'pages/MapBoard/MapBoard'
import { appPath, getUser } from 'App'
import DialogueBar from 'components/Layout/DialogueBar'
import hydrogen from 'images/hydrogen.jpg'
import textFile from 'images/text-file.jpg'
import spells from 'images/spells.jpg'
import maze from 'images/maze.png'
import alchemist from 'images/alchemist_boss.png'
import ghost from 'images/ghost.png'
import sprint from 'images/spooky.png'
import Modal from 'components/Layout/Modal'

import './Game.scss'
import CrystalCrypts from 'pages/CrystalCrypts/CrystalCrypts'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'

export type ItemType = {
  imageSrc: string
  name: string
  message: string
  href?: string
  action?: () => void
}

export const ITEMS: { [key: string]: ItemType } = {
  'periodic_table': {
    imageSrc: hydrogen,
    name: 'Periodic table of elements',
    message: 'Do yo want to create delightful cocktails?',
    href: 'https://storage.googleapis.com/escape-room-bucket/periodic_table.svg'
  },
  'principles_of_life': {
    imageSrc: textFile,
    name: 'Principles of life',
    message: 'For your everyday living',
    href: 'https://storage.googleapis.com/escape-room-bucket/principles.txt'
  },
  'book_of_spells': {
    imageSrc: spells,
    name: 'The book of spells',
    message: 'Bestseller of the year!',
    href: 'https://storage.googleapis.com/escape-room-bucket/spells.txt'
  },
  'maze_map_1': {
    imageSrc: maze,
    name: 'How to exit a maze - Chapter 1',
    message: 'When you feel lost...',
    href: 'https://storage.googleapis.com/escape-room-bucket/maze_1.txt'
  },
  'maze_map_2': {
    imageSrc: maze,
    name: 'How to exit a maze - Chapter 2',
    message: 'When you feel loster...',
    href: 'https://storage.googleapis.com/escape-room-bucket/maze_2.txt'
  },
  'maze_map_3': {
    imageSrc: maze,
    name: 'How to exit a maze - Chapter 3',
    message: 'When you feel the lostest...',
    href: 'https://storage.googleapis.com/escape-room-bucket/maze_3.txt'
  },
  'maze_map_4': {
    imageSrc: maze,
    name: 'How to exit a maze - Chapter 4',
    message: 'When you feel the lostest among the lostest...',
    href: 'https://storage.googleapis.com/escape-room-bucket/maze_4.txt'
  },
  'spooky_sprint': {
    imageSrc: sprint,
    name: 'How to play Spooky Sprint',
    message: 'Better than the Squid Game',
    href: 'https://storage.googleapis.com/escape-room-bucket/spooky_sprint.txt'
  }
}

export const CHARACTERS = {
  'alchemist' : {
    imageSrc: alchemist,
    name: 'Sans'
  },
  'ghost' : {
    imageSrc: ghost,
    name: 'Napstablook'
  }
}

export type SessionContextType = {
  user: {
    name: string
    bag_code: string
  },
  items: {
    name: string
  }[],
  answers: {
    riddle: string
  }[],
  bosses: {
    name: string
  }[],
  gameEndsAt: string,
  setDialogueBarMessages: (messages: Array<DialogueBarMessageType>) => void
  setModalChildren: (children: JSX.Element) => void
  closeModal: () => void
  refetch: () => void
  pickUpItem: ({ pickableItem, firstMessage, lastMessage }: { pickableItem: string, firstMessage?: string, lastMessage?: string }) => void
}

export const SessionContext = React.createContext<SessionContextType>(null)

export type DialogueBarMessageType = {
  character? : string
  imageSrc?: string
  title?: string
  message: string
  onCloseMessage?: Function
  disappearAfterSeconds?: number
  notClosable?: boolean
}

type GameProps = {
  data: {
    data: {
      user: {
        name: string
        bag_code: string
      },
      items: {
        name: string
      }[],
      answers: {
        riddle: string
      }[],
      bosses: {
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
  const { data: { user, game_ends_at, items, answers, bosses } } = data

  const refetch = () => {
    getUser().then((data) => setData(data))
  }

  const pickUpItem = ({ pickableItem, firstMessage = null, lastMessage = null }) => {
    const { imageSrc, name, message } = ITEMS[pickableItem]
    setDialogueBarMessages([
      { message: firstMessage || 'You found an item!' }, 
      { imageSrc, title: name, message },
      { message: lastMessage || 'You put the item in your bag', onCloseMessage: () =>
        axios.post(
          '/items',
          { item: { name: pickableItem }, authenticity_token: csrfToken() },
          { headers: { Accept: 'application/json' }, responseType: 'json' }
      ).then(() => refetch())}
    ])
  }

  const closeModal= () => setModalChildren(null)

  const sessionContext = { user, gameEndsAt: game_ends_at, items, answers, bosses, setDialogueBarMessages, setModalChildren, closeModal, refetch, pickUpItem }

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
          <Route exact path={appPath('/crypts')} component={CrystalCrypts} />
          <Route component={NotFound} />
        </Switch>
        { modalChildren && <Modal closeModal={closeModal}>
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

export const riddleSolved = (riddleName: string) => {
  const { answers } = useContext(SessionContext)
  return answers.map(({ riddle }) => riddle).includes(riddleName)
}

export default Game
