import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { toggleField, resetFloatFields } from '../../modules/game'

import './Field.scss'

@connect((state) => ({
  isGameRunning: state.game.isGameRunning,
}), { toggleField, resetFloatFields })
export default class Field extends Component {

  static propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array,
    isActive: PropTypes.bool,
    isFloating: PropTypes.bool,
    isGameRunning: PropTypes.bool,
    setActiveField: PropTypes.func,
  }

  toggleField = () => {
    const { id, toggleField, isGameRunning, resetFloatFields } = this.props

    if (isGameRunning) {
      resetFloatFields()
      return
    }

    toggleField(id)
  }

  render() {
    const { id, isActive, isFloating } = this.props

    const fieldStyleName = cx('field', {
      'active': isActive,
      'floating': isFloating,
    })

    return (
      <div className={fieldStyleName} onClick={this.toggleField} data-test={id} />
    )
  }
}

