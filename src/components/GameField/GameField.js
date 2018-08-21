import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createFields, setFloatFields } from '../../modules/game'

import './GameField.scss'

import Button from '../Button/Button'
import Fields from '../Fields/Fields'


@connect(null, { createFields, setFloatFields })
export default class GameField extends Component {

  static propTypes = {
    resetGame: PropTypes.func,
    setFloatFields: PropTypes.func,
  }

  render() {
    const { createFields, setFloatFields } = this.props
    return (
      <div className="gameField">
        <div className="fields">
          <Fields />
        </div>
        <div className="controls">
          <Button title="reset" onClick={createFields} />
          <Button title="run" isPrimary onClick={setFloatFields} />
        </div>
      </div>
    )
  }
}
