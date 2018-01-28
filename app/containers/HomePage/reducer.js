import { fromJS } from 'immutable'
import * as types from './constants'

const initialState = fromJS({
  text: '',
  count: 0
})

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_TEXT:
      return state
        .set('text', action.text)
    case types.INCREMENT:
      return state
        .update('count', n => n + 1)
    case types.DECREMENT:
      return state
        .update('count', n => n - 1)
    default:
      return state
  }
}

export default homeReducer
