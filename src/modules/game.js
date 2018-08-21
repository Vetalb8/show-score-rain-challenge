import { createReducer, createAction } from 'redux-act'

// Actions
const name = '@@game'

export const setFields = createAction(`${name}/SET_FIELDS`)

// Reducers
const initialState = {
  cols: 12,
  rows: 6,
  fields: [],
}

const game = createReducer({
  [setFields]: (state, fields) => ({ ...state, fields }),
}, initialState)

export default game
