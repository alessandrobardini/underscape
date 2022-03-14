import React, { useContext } from 'react'
import { SessionContext, ItemType } from 'Game'
import BagItemList from 'components/BagItemList/BagItemList'

import './Bag.scss'

const Bag: React.FC = () => {
  const { items, user: { bag_code: bagCode } } = useContext(SessionContext)
  const shareBagUrl = `${document.location.origin}/bag/${bagCode}`

  const activateItem = (item: ItemType) => {
    if (item.action) {
      item.action()
    } else if (item.href) {
      window.open(item.href, '_blank')
    } else {
      throw new Error(`Don't know how to activate item ${JSON.stringify(item)}`)
    }
  }

  return <div className='Bag'>
    <label className='share'>Share this bag with your teammates <code>{shareBagUrl}</code></label>
    <BagItemList items={items} onItemClick={activateItem} />
  </div>
}

export default Bag
