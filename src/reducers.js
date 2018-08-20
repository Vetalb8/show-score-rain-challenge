import { combineReducers } from 'redux'
import counter from './modules/counter'

const reducers = combineReducers({
  counter,
})

export default reducers
