import { createReducer, createAction } from 'redux-act'

// Actions
const name = '@@game'

export const setFields = createAction(`${name}/SET_FIELDS`)

export const toggleField = createAction(`${name}/TOGGLE_FIELD`)

export const setFloatFields = createAction(`${name}/SET_FLOAT_FIELDS`)

// Reducers
const initialState = {
  rows: 6,
  cols: 12,
  fields: [],
}

const game = createReducer({
  [setFields]: (state, fields) => ({ ...state, fields }),
  [toggleField]: (state, id) => {
    const lastRow = state.rows - 1
    const currentFieldsToUpdate = [...state.fields]

    const indexToUpdate = currentFieldsToUpdate.findIndex((field) => field.id === id)
    const currentFieldToUpdate = currentFieldsToUpdate[indexToUpdate]

    const nextBottomField = currentFieldsToUpdate[indexToUpdate + state.cols]


    const isActiveCurrentField = (
      !currentFieldToUpdate.isActive
      && (
        currentFieldToUpdate.coordinates[0] === lastRow
        || (currentFieldToUpdate.coordinates[0] !== lastRow && nextBottomField.isActive)
      )
    )

    const updatedField = {
      ...currentFieldToUpdate,
      isActive: isActiveCurrentField,
    }


    return {
      ...state,
      fields: [
        ...currentFieldsToUpdate.slice(0, indexToUpdate),
        updatedField,
        ...currentFieldsToUpdate.slice(indexToUpdate + 1),
      ]
    }
  },
  [setFloatFields]: (state) => {
    return {
      ...state,
    }
  }
}, initialState)

export default game
