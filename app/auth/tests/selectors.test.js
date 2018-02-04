import { fromJS } from 'immutable'
import localStorage from 'localStorage'

import {
  selectAuth,
  makeSelectAuthResult,
  makeSelectIsAuthenticated,
  makeSelectExpiryTime
} from '../selectors'

describe('selectAuth', () => {
  it('should select the auth state', () => {
    const authState = fromJS({
      authResult: null
    })
    const mockedState = fromJS({
      auth: authState
    })
    expect(selectAuth(mockedState)).toEqual(authState)
  })
})

describe('makeSelectAuthResult', () => {
  const authResultSelector = makeSelectAuthResult()
  it('should select the authResult', () => {
    const authResult = fromJS({
      access_token: '123abc',
      id_token: '456def',
      expiresIn: 1234567890
    })
    const mockedState = fromJS({
      auth: {
        authResult
      }
    })
    expect(authResultSelector(mockedState)).toEqual(authResult)
  })
})

describe('makeSelectIsAuthenticated', () => {
  const isAuthenticatedSelector = makeSelectIsAuthenticated()
  it('should return true if expires_at time is valid', () => {
    const mockedState = fromJS({
      auth: {
        isAuthenticated: true
      }
    })
    localStorage.setItem('expires_at', JSON.stringify(7200 * 1000) + new Date().getTime())
    expect(isAuthenticatedSelector(mockedState)).toEqual(true)
  })

  it('should return false if expires_at time is invalid', () => {
    const mockedState = fromJS({
      auth: {
        isAuthenticated: true
      }
    })
    localStorage.setItem('expires_at', JSON.stringify(7200 * 1000) - new Date().getTime())
    expect(isAuthenticatedSelector(mockedState)).toEqual(false)
  })

  it('should return false if isAuthenticated is false', () => {
    const mockedState = fromJS({
      auth: {
        isAuthenticated: false
      }
    })
    localStorage.setItem('expires_at', JSON.stringify(7200 * 1000) + new Date().getTime())
    expect(isAuthenticatedSelector(mockedState)).toEqual(false)
  })
})

describe('makeSelectExpiryTime', () => {
  it('should return true if expires_at time is valid', () => {
    localStorage.setItem('expires_at', JSON.stringify(7200 * 1000) + new Date().getTime())
    expect(makeSelectExpiryTime()).toEqual(true)
  })

  it('should return false if expires_at time is invalid', () => {
    localStorage.setItem('expires_at', JSON.stringify(7200 * 1000) - new Date().getTime())
    expect(makeSelectExpiryTime()).toEqual(false)
  })

  it('should return false if expires_at does not exist', () => {
    expect(makeSelectExpiryTime()).toEqual(false)
  })
})
