import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import authReducer from 'auth/reducer'

const routeInitialState = fromJS({
  location: null
})

function routeReducer (state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      })
    default:
      return state
  }
}

// Creates main reducer with async loaded ones
export default function createReducer (injectedReducers) {
  return combineReducers({
    route: routeReducer,
    auth: authReducer,
    ...injectedReducers
  })
}
