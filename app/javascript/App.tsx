import PromiseWrap from 'components/Promise/PromiseWrap'
import Bag from 'pages/Bag/Bag'
import Home from 'pages/Home/Home'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Game from 'Game'
import HallOfFame from 'pages/HallOfFame/HallOfFame'
import { TranslatorLoader } from 'containers/TranslatorLoader'

export const basePath = '/app/:locale'

export const appPath = (path: string) => `${basePath}${path}`

const App: React.FC = () => {
  return (
    <Router>
      <TranslatorLoader>
        <Switch>
          <Route exact path={appPath('/')} component={Home} />
          <Route exact path={appPath('/hall_of_fame')} component={HallOfFame} />
          <Route exact path={appPath('/bag')} component={Bag} />
          <Route render={() => <PromiseWrap promise={getUser()} timeout={500}>
            {(props) => props.data ? <Game data={props.data} /> : (!props.loading ? <div>You are not logged in!</div> : null)}
          </PromiseWrap>} />
        </Switch>
      </TranslatorLoader>
    </Router>
  )
}

export const getUser = () => {
  return axios.get('/users/sessions/signed_in')
}

export default App
