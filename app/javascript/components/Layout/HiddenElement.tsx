import { bagContains, SessionContext } from 'Game'
import React, { MouseEventHandler, useContext } from 'react'

import './HiddenElement.scss'

type HiddenElementProps = {
  top: string
  left: string
  width: string
  height: string
  onClick?: MouseEventHandler<HTMLDivElement>
  pickableItem?: string
  extraClassName?: string
}

const HiddenElement: React.FC<HiddenElementProps> = ({
  top,
  left,
  width,
  height,
  onClick,
  pickableItem,
  extraClassName
}) => {
  const { pickUpItem  } = useContext(SessionContext)
  if (pickableItem) {
    return !bagContains(pickableItem) ? <div className={`HiddenElement ${extraClassName ? extraClassName : ''}`} style={{ top, left, width, height }} onClick={() => pickUpItem({ pickableItem })} /> : null
  }
  return <div className={`HiddenElement ${extraClassName ? extraClassName : ''}`} style={{ top, left, width, height }} {...(onClick && { onClick })} />
}

export default HiddenElement
