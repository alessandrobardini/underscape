import React, { useContext } from 'react'
import Button from 'ui/Button'
import { BagItemsContext, ItemType } from 'containers/BagItemsLoader'
import { TranslatorContext } from 'containers/TranslatorLoader'
import './BagItemList.scss'

type BagItemListProps = {
  items: Array<{ name: string }>
  onItemClick: (item: ItemType) => void
  selected: ItemType
}

const BagItemList: React.FC<BagItemListProps> = ({ items, onItemClick, selected }) => {
  const i18n = useContext(TranslatorContext)
  const bagItems = useContext(BagItemsContext)
  return (
    <div className='BagItemList'>
      {items.length === 0
        ? <div className='empty'>{i18n.t('bag.empty')}</div>
        : (
          <ul>
            {items.map(({ name }) => <li key={name} className={(selected && bagItems[name].name === selected.name) ? 'selected' : ''}>
              <img src={bagItems[name].imageSrc} width='50px' />
              <div className='m-l-sm'>{bagItems[name].name}</div>
              <Button size='s' className='m-l-sm' onClick={() => onItemClick(bagItems[name])}>{i18n.t('bag.use')}</Button>
            </li>
            )}
          </ul>
        )}
    </div>
  )
}

export default BagItemList
