'use strict'

import React from 'react'

export default class TipContent extends React.Component {
  render() {
    return (
      <div className='tip_container'>
        <p className='tip_text'>"{this.props.tiptext}"</p>
      </div>
    )
  }
}
