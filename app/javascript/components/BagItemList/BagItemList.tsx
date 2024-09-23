import React, { useContext } from 'react'
import Button from 'ui/Button'
import './BagItemList.scss'
import { BagItemsContext, ItemType } from 'containers/BagItemsLoader'

type BagItemListProps = {
  items: Array<{ name: string }>
  onItemClick: (item: ItemType) => void
  selected: ItemType
}

const BagItemList: React.FC<BagItemListProps> = ({ items, onItemClick, selected }) => {
  const bagItems = useContext(BagItemsContext)
  return (
    <div className='BagItemList'>
      {items.length === 0
        ? <div className='empty'>Your bag is empty</div>
        : (
          <ul>
            {items.map(({ name }) => <li key={name} className={(selected && bagItems[name].name === selected.name) ? 'selected' : ''}>
              <img src={bagItems[name].imageSrc} width='50px' />
              <div className='m-l-sm'>{bagItems[name].name}</div>
              <Button size='s' className='m-l-sm' onClick={() => onItemClick(bagItems[name])}>USE</Button>
            </li>
            )}
          </ul>
        )}
    </div>
  )
}

export default BagItemList
