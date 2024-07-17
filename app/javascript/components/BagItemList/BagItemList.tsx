import React from 'react'
import { ITEMS, ItemType } from 'Game'
import Button from 'ui/Button'
import './BagItemList.scss'

type BagItemListProps = {
  items: Array<{ name: string }>
  onItemClick: (item: ItemType) => void
  selected: ItemType
}

const BagItemList: React.FC<BagItemListProps> = ({ items, onItemClick, selected }) => (
  <div className='BagItemList'>
    {items.length === 0
    ? <div className='empty'>Your bag is empty</div>
    : (
      <ul>
      {items.map(({ name }) =>
        <li key={name} className={(selected && ITEMS[name].name === selected.name) ? 'selected' : ''}>
          <img src={ITEMS[name].imageSrc} width='50px'/>
          <div className='m-l-sm'>{ITEMS[name].name}</div>
          <Button size='s' className='m-l-sm' onClick={() => onItemClick(ITEMS[name])}>USE</Button>
        </li>
      )}
      </ul>
    )}
  </div>
)

export default BagItemList
