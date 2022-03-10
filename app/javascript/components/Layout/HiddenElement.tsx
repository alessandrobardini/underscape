import React, { MouseEventHandler } from 'react'

import './HiddenElement.scss'

type HiddenElementProps = {
  top: string
  left: string
  width: string
  height: string
  onClick?: MouseEventHandler<HTMLDivElement>
  render?: boolean
}

const HiddenElement: React.FC<HiddenElementProps> = ({
  top,
  left,
  width,
  height,
  onClick,
  render = true
}) => {
  return render ? <div className='HiddenElement' style={{ top, left, width, height }} {...(onClick && { onClick })} /> : null
}

export default HiddenElement 
