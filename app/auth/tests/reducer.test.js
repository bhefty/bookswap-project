import { fromJS } from 'immutable'

import authReducer from '../reducer'

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setSession
} from '../actions'

import { makeSelectExpiryTime } from 'auth/selectors'

const isAuthenticated = makeSelectExpiryTime()

describe('authReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      isLoggingIn: false,
      isAuthenticated,
      error: null,
      authResult: null
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(authReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the loginRequest action correctly', () => {
    const expectedResult = state
      .set('isLoggingIn', true)

    expect(authReducer(state, loginRequest())).toEqual(expectedResult)
  })

  it('should handle the loginSuccess action correctly', () => {
    const expectedResult = state
      .set('isAuthenticated', true)
    expect(authReducer(state, loginSuccess())).toEqual(expectedResult)
  })

  it('should handle the loginFailure action correctly', () => {
    const fixture = { msg: 'Something went wrong' }
    const expectedResult = state
      .set('error', fixture)

    expect(authReducer(state, loginFailure(fixture))).toEqual(expectedResult)
  })

  it('should handle the logout action correctly', () => {
    const expectedResult = state
      .set('isAuthenticated', false)
    expect(authReducer(state, logout())).toEqual(expectedResult)
  })

  it('should handle the setSession action correctly', () => {
    const fixture = {
      access_token: '123abc',
      id_token: '456def',
      expiresIn: 1234567890
    }
    const expectedResult = state
      .set('authResult', fixture)

    expect(authReducer(state, setSession(fixture))).toEqual(expectedResult)
  })
})
