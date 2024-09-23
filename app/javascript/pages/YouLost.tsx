import { signOut } from 'components/Layout/TopBar'
import React, { useContext } from 'react'
import Link from 'ui/Link'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './YouLost.scss'

const YouLost: React.FC = () => {
  const i18n = useContext(TranslatorContext)

  return <div className='YouLost'>
    <div>{i18n.t('you_lost')}</div>
    <Link to='#' type='danger' size='xs' onClick={() => signOut().then(() => window.location.replace(`/app/${i18n.locale}`))}>{i18n.t('logout')}</Link>
  </div>
}

export default YouLost