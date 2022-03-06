import React from 'react'
import './Hello.scss'

type HelloProps = {
  name: string
}

const Hello: React.FC<HelloProps> = ({ name }) => (
  <div className='Hello'>Hello {name}!</div>
)

export default Hello