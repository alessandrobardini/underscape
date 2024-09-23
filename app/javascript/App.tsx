import PromiseWrap from 'components/Promise/PromiseWrap'
import Bag from 'pages/Bag/Bag'
import Home from 'pages/Home/Home'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Game from 'Game'
import HallOfFame from 'pages/HallOfFame/HallOfFame'
import { TranslatorContext, TranslatorLoader } from 'containers/TranslatorLoader'
import { BagItemsLoader } from 'containers/BagItemsLoader'

export const basePath = '/app/:locale'

export const appPath = (path: string) => `${basePath}${path}`

const App: React.FC = () => {
  return (
      <Router>
        <Route render={() =>
          <TranslatorLoader>
            <BagItemsLoader>
              <Switch>
                <Route exact path={appPath('/')} component={Home} />
                <Route exact path={appPath('/hall_of_fame')} component={HallOfFame} />
                <Route exact path={appPath('/bag')} component={Bag} />
                <Route render={() => <PromiseWrap promise={getUser()} timeout={500}>
                  {(props) => props.data ? <Game data={props.data} /> : (!props.loading ? <NotLoggedIn /> : null)}
                </PromiseWrap>} />
              </Switch>
            </BagItemsLoader>
          </TranslatorLoader>
        }/>
      </Router>
  )
}

export const getUser = () => {
  return axios.get('/users/sessions/signed_in')
}

export const NotLoggedIn: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  return <div>{i18n.t('not_logged_in')}</div>
}

export default App
