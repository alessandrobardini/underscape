import PromiseWrap from 'components/Promise/PromiseWrap'
import Home from 'pages/Home/Home'
import Overview from 'pages/Overview/Overview'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import NotFound from 'pages/NotFound'

const basePath = '/app'

const appPath = (path: string) => `${basePath}${path}`

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path={appPath('/')} component={Home} />
      <Route render={() =>
        <PromiseWrap promise={getUser()} timeout={500}>
          { (props) => props.data ? <Routes data={props.data} /> : <div>You are not logged in!</div> }
        </PromiseWrap>
      } />
    </Switch>
  </Router>
)

export const SessionContext = React.createContext(null)

const Routes: React.FC<any> = ({ data }) => {
  const { data: { user, game_ends_at } } = data
  const sessionContext = { user, gameEndsAt: game_ends_at }
  return (
    <SessionContext.Provider value={sessionContext}>
      <Switch>
        <Route exact path={appPath('/overview')} component={Overview} />
        <Route component={NotFound} />
      </Switch>
    </SessionContext.Provider>
  )
}

export const getUser = () => {
  return axios.get('/users/sessions/signed_in')
}

export default App