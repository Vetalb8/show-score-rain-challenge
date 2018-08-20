import React, { Component } from 'react'

import './GameField.scss'


export default class GameField extends Component {

  static propTypes = {}

  render() {
    return (
      <div className="gameField">
        <div className="fields">Fields</div>
        <div className="controls">

        </div>
      </div>
    )
  }
}
