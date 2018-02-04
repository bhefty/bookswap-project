import { fromJS } from 'immutable'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_SESSION
} from './constants'

import { makeSelectExpiryTime } from 'auth/selectors'

const isAuthenticated = makeSelectExpiryTime()

const initialState = fromJS({
  isLoggingIn: false,
  isAuthenticated,
  error: null,
  authResult: null
})

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('isLoggingIn', true)
    case LOGIN_SUCCESS:
      return state
        .set('isLoggingIn', false)
        .set('isAuthenticated', true)
        .set('error', null)
    case LOGIN_FAILURE:
      return state
        .set('isLoggingIn', false)
        .set('error', action.error)
    case LOGOUT:
      return initialState
        .set('isAuthenticated', false)
    case SET_SESSION:
      return state
        .set('authResult', action.authResult)
    default:
      return state
  }
}
