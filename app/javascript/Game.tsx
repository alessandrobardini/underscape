import React, { useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from 'pages/NotFound'
import AlchemistAlcove from 'pages/AlchemistAlcove/AlchemistAlcove'
import TopBar from 'components/Layout/TopBar'
import YouLost from 'pages/YouLost'
import MapBoard from 'pages/MapBoard/MapBoard'
import { appPath, getUser } from 'App'
import DialogueBar from 'components/Layout/DialogueBar'
import alchemist from 'images/alchemist_boss.png'
import ghost from 'images/ghost.png'
import demiurge from 'images/demiurge.png'
import goat from 'images/asriel.png'
import cat from 'images/kitty.jpeg'
import Modal from 'components/Layout/Modal'
import CrystalCrypts from 'pages/CrystalCrypts/CrystalCrypts'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import PrimevalPrison from "./pages/PrimevalPrison/PrimevalPrison";
import WallBreach from 'pages/WallBreach/WallBreach'
import DemiurgeBattle from 'pages/DemiurgeBattle/DemiurgeBattle'
import YouWin from 'pages/YouWin'
import { BagItemsContext } from 'containers/BagItemsLoader'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './Game.scss'

export const CHARACTERS = {
  'alchemist' : {
    imageSrc: alchemist,
    name: 'Sans'
  },
  'ghost' : {
    imageSrc: ghost,
    name: 'Napstablook'
  },
  'demiurge' : {
    imageSrc: demiurge,
    name: 'Papyrus'
  },
  'cat' : {
    imageSrc: cat,
    name: 'Kitty'
  },
  'goat' : {
    imageSrc: goat,
    name: 'Asriel'
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
  gameFinishedInSeconds: number,
  progress: string,
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
      progress: string,
      game_ends_at: string
      game_finished_in_seconds: number
    }
  }
}

const Game: React.FC<GameProps> = (props) => {
  const [data, setData] = useState(props.data)
  const [dialogueBarMessages, setDialogueBarMessages] = useState<Array<DialogueBarMessageType>>([])
  const [modalChildren, setModalChildren] = useState<JSX.Element>(null)
  const { data: { user, game_ends_at, items, answers, bosses, progress, game_finished_in_seconds } } = data
  const bagItems = useContext(BagItemsContext)
  const i18n = useContext(TranslatorContext)

  const refetch = () => {
    getUser().then((data) => setData(data))
  }

  const pickUpItem = ({ pickableItem, firstMessage = null, lastMessage = null }) => {
    const { imageSrc, name, message } = bagItems[pickableItem]
    setDialogueBarMessages([
      { message: firstMessage || i18n.t('bag.you_found_an_item') },
      { imageSrc, title: name, message },
      { message: lastMessage || i18n.t('bag.you_put_the_item'), onCloseMessage: () =>
        axios.post(
          '/items',
          { item: { name: pickableItem }, authenticity_token: csrfToken() },
          { headers: { Accept: 'application/json' }, responseType: 'json' }
      ).then(() => refetch())}
    ])
  }

  const closeModal= () => setModalChildren(null)

  const sessionContext = { user, gameEndsAt: game_ends_at, items, answers, bosses, setDialogueBarMessages, setModalChildren, closeModal, refetch, pickUpItem, progress, gameFinishedInSeconds: game_finished_in_seconds }

  if(!!game_finished_in_seconds) {
    return <>
      <YouWin setDialogueBarMessages={setDialogueBarMessages} gameFinishedInSeconds={game_finished_in_seconds}/>
      <DialogueBar messages={dialogueBarMessages} closeDialogueBar={() => setDialogueBarMessages([])}/>
    </>
  }

  if(timeIsOver(game_ends_at) && !game_finished_in_seconds) {
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
          <Route exact path={appPath('/wall')} component={WallBreach} />
          <Route exact path={appPath('/MIAOOOOW789ASDFGHJKL')} component={DemiurgeBattle} />
          <Route exact path={appPath('/prison')} component={PrimevalPrison} />
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
