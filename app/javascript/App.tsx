import PromiseWrap from 'components/Promise/PromiseWrap'
import Bag from 'pages/Bag/Bag'
import Home from 'pages/Home/Home'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Game from 'Game'

const basePath = '/app'

export const appPath = (path: string) => `${basePath}${path}`

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path={appPath('/')} component={Home} />
      <Route exact path={appPath('/bag')} component={Bag} />
      <Route render={() =>
        <PromiseWrap promise={getUser()} timeout={500}>
          { (props) => props.data ? <Game data={props.data} /> : (!props.loading ? <div>You are not logged in!</div>: null) }
        </PromiseWrap>
      } />
    </Switch>
  </Router>
)

export const getUser = () => {
  return axios.get('/users/sessions/signed_in')
}

export default App
