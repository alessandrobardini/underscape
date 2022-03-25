import { signOut } from 'components/Layout/TopBar'
import React from 'react'
import Link from 'ui/Link'

import './YouLost.scss'

const YouLost: React.FC = () => {
  return <div className='YouLost'>
    <div>YOU LOST!</div>
    <Link to='#' type='danger' size='xs' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Link>
  </div>
}

export default YouLost