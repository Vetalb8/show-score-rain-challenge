import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { toggleField } from '../../modules/game'

import './Field.scss'

@connect(null, { toggleField })
export default class Field extends Component {

  static propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array,
    isActive: PropTypes.bool,
    isFloating: PropTypes.bool,
    setActiveField: PropTypes.func,
  }

  toggleField = () => {
    const { id, toggleField } = this.props

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

