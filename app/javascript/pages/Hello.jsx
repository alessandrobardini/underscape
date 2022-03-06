import React from 'react'
import PropTypes from 'prop-types'

import './Hello.scss'

const Hello = props => (
  <div className='Hello'>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

export default Hello