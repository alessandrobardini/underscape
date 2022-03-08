import { signOut } from 'components/Layout/TopBar'
import React from 'react'
import Link from 'ui/Link'

const YouLost: React.FC = () => {
  return <>
    <div>YOU LOST!</div>
    <Link to='#' type='danger' size='xs' onClick={() => signOut().then(() => window.location.replace('/app'))}>Logout</Link>
  </>
}

export default YouLost