import React, { useState, useEffect } from 'react'
import PromiseWrap from 'components/Promise/PromiseWrap'
import { getUser } from 'App'
import BagItemList from 'components/BagItemList/BagItemList'
import { ItemType } from 'Game'

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
  const [selectedItem, setSelectedItem] = useState<ItemType>(null)
  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    const timer = setInterval(refetch, 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='BagPage'>
      <div className='list'>
        <header>
          Your bag
        </header>
        <BagItemList items={data.data.items} onItemClick={handleItemClick} selected={selectedItem} />
      </div>
      {selectedItem && <div className='selectedItem'>
        <header>
          {selectedItem.name}
        </header>
        {<div className='content'>{selectedItem.markdown}</div>}
      </div>}
    </div>
  )
}

export default Bag
