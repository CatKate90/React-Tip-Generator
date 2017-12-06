'use strict'

import React from 'react'
import TipContent from './tipContent'
import axios from 'axios'

const baseUri = 'http://localhost:3001'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      tip: '',
      add: '',
      value: ''
    }
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getRandomTip() {
    axios
      .get(`${baseUri}/tip`)
      .then(res => {
        this.setState({ tip: res.data.tip.tip })
      })
      .catch(error => {
        throw error
      })
  }

  componentDidMount() {
    this.getRandomTip()
  }

  handleNextClick(e) {
    this.getRandomTip()
  }

  handleAddClick(e) {
    this.setState({ add: true })
  }

  handleSaveClick(e) {
    this.setState({ add: false })

    axios
      .post(`${baseUri}/tip`, { tip: this.state.value })
      .then(res => {
        this.setState({ tip: res.data.tip.tip })
      })
      .catch(error => {
        throw error
      })
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    const isAdd = this.state.add
    let content = null
    let buttonLeft = null
    let buttonRight = null

    if (isAdd) {
      content = [
        <TipContent tiptext={this.state.tip} />,
        <form>
          <textarea
            name='textarea'
            placeholder='Tipp eingeben'
            rows='10'
            cols='50'
            ref='createInput'
            onChange={this.handleChange}
          />
        </form>
      ]
      buttonLeft = (
        <button className='button button-next disabled'>Noch ein Tipp!</button>
      )
      buttonRight = (
        <button onClick={this.handleSaveClick} className='button button-save'>
          Tipp teilen
        </button>
      )
    } else {
      content = <TipContent tiptext={this.state.tip} />
      buttonLeft = (
        <button onClick={this.handleNextClick} className='button button-next'>
          Noch ein Tipp!
        </button>
      )
      buttonRight = (
        <button onClick={this.handleAddClick} className='button button-add'>
          Tipp abgeben
        </button>
      )
    }

    return (
      <main>
        {content}
        {buttonLeft}
        {buttonRight}
      </main>
    )
  }
}
