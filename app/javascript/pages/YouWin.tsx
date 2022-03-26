import { signOut } from 'components/Layout/TopBar'
import React from 'react'
import Link from 'ui/Link'

import './YouLost.scss'

const YouWin: React.FC = () => {
  return <div className='YouLost'>
    <div>YOU WIN!</div>
    {/* <Link to='#' type='danger' size='xs' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Link> */}
  </div>
}

export default YouWin