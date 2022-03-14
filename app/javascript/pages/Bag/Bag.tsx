import React, { useState, useEffect } from 'react'
import PromiseWrap from 'components/Promise/PromiseWrap'
import { getUser } from 'App'
import BagItemList from 'components/BagItemList/BagItemList'
import Link from 'ui/Link'
import { signOut } from 'components/Layout/TopBar'

import './Bag.scss'

const Bag = () => {
  const [promise, setPromise] = useState(null)

  const refetch = () => {
    setPromise(getUser())
  }

  useEffect(refetch, [])
  
  return (
    <PromiseWrap promise={promise} timeout={500} staleWhileLoading>
      {props => props.data ? <BagPage refetch={refetch} data={props.data} /> : (!props.loading ? <div>You are not logged in!</div>: null)}
    </PromiseWrap>
  )
}

const BagPage = ({ data, refetch } ) => {
  const [frameSource, setFrameSource] = useState(null)
  const handleItemClick = (item) => {
    if (item.href) {
      setFrameSource(item.href)
    }
  }

  useEffect(() => {
    const timer = setInterval(refetch, 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='BagPage'>
      <div className='list'>
        <header>
          <i className='fa fa-suitcase' />
          {data.data.user.name}
          <Link to='#' type='danger' size='xs' onClick={() => window.confirm('Are you sure? The timer will not be stopped!') && signOut().then(() => window.location.replace('/app'))}>Logout</Link>
        </header>
        <BagItemList items={data.data.items} onItemClick={handleItemClick} />
      </div>
      {frameSource ? <iframe src={frameSource} /> : null}
    </div>
  )
}

export default Bag
