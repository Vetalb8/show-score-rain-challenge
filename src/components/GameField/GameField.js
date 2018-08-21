import React, { Component } from 'react'

import './GameField.scss'

import Button from '../Button/Button'
import Fields from '../Fields/Fields'


export default class GameField extends Component {

  static propTypes = {}

  render() {
    return (
      <div className="gameField">
        <div className="fields">
          <Fields />
        </div>
        <div className="controls">
          <Button title="reset" />
          <Button title="run" isPrimary />
        </div>
      </div>
    )
  }
}
