import React from 'react'
import { ITEMS, ItemType } from 'Game'
import Button from 'ui/Button'
import './BagItemList.scss'

type BagItemListProps = {
  items: Array<{ name: string }>
  onItemClick: (item: ItemType) => void
}

const BagItemList: React.FC<BagItemListProps> = ({ items, onItemClick }) => (
  <div className='BagItemList'>
    {items.length === 0
    ? <div className='empty'>Your bag is empty</div>
    : (
      <ul>
      {items.map(({ name }) =>
        <li key={name}>
          <img src={ITEMS[name].imageSrc} width='50px'/>
          <div className='m-l-sm'>{ITEMS[name].name}</div>
          <Button size='s' onClick={() => onItemClick(ITEMS[name])}>USE</Button>
        </li>
      )}
      </ul>
    )}
  </div>
)

export default BagItemList
