import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_SESSION
} from '../constants'

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setSession
} from '../actions'

describe('Auth Actions', () => {
  describe('loginRequest', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGIN_REQUEST
      }
      expect(loginRequest()).toEqual(expectedResult)
    })
  })

  describe('loginSuccess', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGIN_SUCCESS
      }
      expect(loginSuccess()).toEqual(expectedResult)
    })
  })

  describe('loginFailure', () => {
    it('should return the correct type and the error', () => {
      const fixture = { msg: 'Something went wrong' }
      const expectedResult = {
        type: LOGIN_FAILURE,
        error: fixture
      }
      expect(loginFailure(fixture)).toEqual(expectedResult)
    })
  })

  describe('logout', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGOUT
      }
      expect(logout()).toEqual(expectedResult)
    })
  })

  describe('setSession', () => {
    it('should return the correct type and the authResult', () => {
      const fixture = {
        access_token: '123abc',
        id_token: '456def',
        expiresIn: 1234567890
      }
      const expectedResult = {
        type: SET_SESSION,
        authResult: fixture
      }
      expect(setSession(fixture)).toEqual(expectedResult)
    })
  })
})
