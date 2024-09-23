import React, { useState, useEffect, useContext } from 'react'
import PromiseWrap from 'components/Promise/PromiseWrap'
import { NotLoggedIn, getUser } from 'App'
import BagItemList from 'components/BagItemList/BagItemList'
import { TranslatorContext } from 'containers/TranslatorLoader'
import { ItemType } from 'containers/BagItemsLoader'

import './Bag.scss'

const Bag = () => {
  const [promise, setPromise] = useState(null)

  const refetch = () => {
    setPromise(getUser())
  }

  useEffect(refetch, [])

  return (
    <PromiseWrap promise={promise} timeout={500} staleWhileLoading>
      {props => props.data ? <BagPage refetch={refetch} data={props.data} /> : (!props.loading ? <NotLoggedIn />: null)}
    </PromiseWrap>
  )
}

const BagPage = ({ data, refetch } ) => {
  const [selectedItem, setSelectedItem] = useState<ItemType>(null)
  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const i18n = useContext(TranslatorContext)

  useEffect(() => {
    const timer = setInterval(refetch, 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='BagPage'>
      <div className='list'>
        <header>
          {i18n.t('bag.title')}
        </header>
        <BagItemList items={data.data.items} onItemClick={handleItemClick} selected={selectedItem} />
      </div>
      {selectedItem && <div className='selectedItem'>
        <header>
          {selectedItem.name}
        </header>
        {<div className='content'>{selectedItem.element}</div>}
      </div>}
    </div>
  )
}

export default Bag
