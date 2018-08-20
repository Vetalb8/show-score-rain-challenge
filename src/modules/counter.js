import { createReducer, createAction } from 'redux-act'

// Actions
const name = '@@counter'
export const increment = createAction(`${name}/Add`)

// Reducers
const initialState = 0

const counter = createReducer({
  [increment]: (state, payload) => payload,
}, initialState)

export default counter
