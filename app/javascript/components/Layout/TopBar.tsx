import {SessionContext} from 'Game'
import React, { useContext } from 'react'
import CountdownTimer from './Countdown'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Button from 'ui/Button'
import Link from 'ui/Link'
import { useHistory } from 'react-router-dom'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './TopBar.scss'

const TopBar: React.FC = () => {
  const { user, gameEndsAt, progress } = useContext(SessionContext)
  const i18n = useContext(TranslatorContext)
  const history = useHistory()
  const onHomeClick = () => {
    window.confirm(i18n.t('top_bar.back_to_home_alert')) && history.push(`/app/${i18n.locale}/map`)
  }
  return (
    <div className='TopBar'>
      <div className='container top-left'>
        <div>{`${i18n.t('top_bar.progress')}: ${progress}%`}</div>
        <div><Button icon iconLeft='fa fa-suitcase' to={`/app/${i18n.locale}/bag`} target='_blank' /></div>
        <div><Button icon iconLeft='fa fa-home' onClick={onHomeClick} /></div>
      </div>
      <div className='username container'>
        <span>{ user.name }</span>
      </div>
      <div className='container countdown'>
        <CountdownTimer targetDate={Date.parse(gameEndsAt)}/>
        <Link to='#' type='danger' size='xs' onClick={() => window.confirm(i18n.t('top_bar.logout_alert')) && signOut().then(() => window.location.replace(`/app/${i18n.locale}`))}>
          {i18n.t('top_bar.logout')}
        </Link>
      </div>
    </div>
  )
}

export const signOut = () => axios.delete('/users/sign_out', {
  headers: { Accept: 'application/json' },
  data: { authenticity_token: csrfToken() }
})

export default TopBar
