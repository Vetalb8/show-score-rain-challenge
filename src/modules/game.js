import { createReducer, createAction } from 'redux-act'

// Actions
const name = '@@game'

export const setFields = createAction(`${name}/SET_FIELDS`)

export const toggleField = createAction(`${name}/TOGGLE_FIELD`)

export const setFloatFields = createAction(`${name}/SET_FLOAT_FIELDS`)

export const createFields = createAction(`${name}/CREATE_FIELDS`)


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

    const bottomField = currentFieldsToUpdate[indexToUpdate + state.cols]
    const upField = currentFieldsToUpdate[indexToUpdate - state.cols]


    let isActiveCurrentField = false

    if (currentFieldToUpdate.isActive) {
      isActiveCurrentField = upField && upField.isActive
    }
    else {
      isActiveCurrentField = (
        currentFieldToUpdate.coordinates[0] === lastRow
        || (
          currentFieldToUpdate.coordinates[0] !== lastRow
          && bottomField
          && bottomField.isActive
          && (upField && !upField.isActive)
        )
      )
    }

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
  },
  [createFields]: (state) => {
    const fields = []

    for (let row = 0; row < state.rows; row++) {
      for (let col = 0; col < state.cols; col++) {
        fields.push({
          id: `${row}-${col}`,
          coordinates: [row, col],
          isActive: false,
        })
      }
    }

    return {
      ...state,
      fields,
    }
  },
}, initialState)

export default game
