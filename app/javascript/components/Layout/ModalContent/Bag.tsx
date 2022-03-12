import { ITEMS, SessionContext } from 'Game'
import React, { useContext } from 'react'
import Button from 'ui/Button'

import './Bag.scss'

const Bag: React.FC = () => {
  const { items } = useContext(SessionContext)
  return <div className='Bag'>
    <ul>{items.map(({ name }) =>
      <li key={name}>
        <img src={ITEMS[name].imageSrc} width='50px'/>
        <div className='m-l-sm'>{ITEMS[name].name}</div>
        <Button size='s' onClick={ITEMS[name].action}>USE</Button>
      </li>
    )}</ul>
  </div>
}

export default Bag