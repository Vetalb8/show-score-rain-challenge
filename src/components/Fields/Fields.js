import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createFields } from '../../modules/game'

import './Fields.scss'

import Field from '../Field/Field'


@connect(state => ({
  cols: state.game.cols,
  rows: state.game.rows,
  fields: state.game.fields,
}), { createFields })
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
    createFields: PropTypes.func,
  }

  componentWillMount() {
    const { createFields } = this.props
    createFields()
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
