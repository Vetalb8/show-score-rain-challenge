import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { setActiveField } from '../../modules/game'

import './Field.scss'

@connect(null, { setActiveField })
export default class Field extends Component {

  static propTypes = {
    id: PropTypes.string,
    coordinates: PropTypes.array,
    isActive: PropTypes.bool,
    setActiveField: PropTypes.func,
  }

  setActive = () => {
    const { id, setActiveField } = this.props

    setActiveField(id)
  }

  render() {
    const { id, isActive } = this.props

    const fieldStyleName = cx('field', {
      'active': isActive
    })

    return (
      <div className={fieldStyleName} onClick={this.setActive} data-testId={id} />
    )
  }
}

