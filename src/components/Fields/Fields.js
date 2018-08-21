import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setFields } from '../../modules/game'

import './Fields.scss'

import Field from '../Field/Field'


@connect(state => ({
  cols: state.game.cols,
  rows: state.game.rows,
  fields: state.game.fields,
}), { setFields })
export default class Fields extends Component {

  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        coordinates: PropTypes.array,
        isActive: PropTypes.bool,
        isFloating: PropTypes.bool,
      })
    ),
    setFields: PropTypes.func,
  }

  componentWillMount() {
    this.createFields()
  }

  createFields = () => {
    const { cols, rows, setFields } = this.props
    const fields = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        fields.push({
          id: `${row}-${col}`,
          coordinates: [row, col],
          isActive: false,
        })
      }
    }

    setFields(fields)
  }


  render() {
    const { fields } = this.props

    return (
      <div className="fields">
        {
          fields.map(field => (
            <Field key={field.id} {...field} />
          ))
        }
      </div>
    )
  }
}
