import sagaHelper from 'redux-saga-testing'
import { call, put, take } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import localStorage from 'localStorage'

import {
  loginRequestSaga,
  logoutSaga,
  watchLoginRequest,
  watchLoginSuccess,
  watchLoginFailure,
  watchLogout,
  watchSetSession,
  setSessionSaga
} from '../saga'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_SESSION
} from '../constants'

import { loginSuccess, loginFailure } from '../actions'

const auth = {
  login: jest.fn(),
  logout: jest.fn()
}

const mockApiData = {
  access_token: '123abc',
  id_token: '456def',
  expiresIn: 1234567890
}

describe('authSagas', () => {
  describe('loginRequestSaga', () => {
    const it = sagaHelper(loginRequestSaga())

    it('should call auth.login', result => {
      const resultJSON = JSON.stringify(result)
      expect(resultJSON).toEqual(JSON.stringify(call(auth.login)))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('loginRequestSaga - Error handling', () => {
    const it = sagaHelper(loginRequestSaga())

    it('should call auth.login', result => {
      const resultJSON = JSON.stringify(result)
      expect(resultJSON).toEqual(JSON.stringify(call(auth.login)))
      return new Error('Something went wrong')
    })

    it('should trigger loginFailure action with the error message', result => {
      expect(result).toEqual(put(loginFailure(new Error('Something went wrong'))))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('setSessionSaga', () => {
    const generator = setSessionSaga()
    const selectDescriptor = generator.next().value

    it('should select authResult from state', () => {
      expect(selectDescriptor).toMatchSnapshot()
    })

    const putDescriptor = generator.next(mockApiData).value

    it('should trigger loginSuccess', () => {
      expect(putDescriptor).toEqual(put(loginSuccess()))
    })

    const endDescriptor = generator.next().value

    it('should do nothing', () => {
      expect(endDescriptor).toBeUndefined()
    })
  })

  describe('logoutSaga', () => {
    it('should remove tokens from local storage', () => {
      localStorage.setItem('access_token', 'abc123')
      localStorage.setItem('id_token', '123abc')
      localStorage.setItem('expires_at', '7200')

      expect(localStorage.getItem('access_token')).toEqual('abc123')
      expect(localStorage.getItem('id_token')).toEqual('123abc')
      expect(localStorage.getItem('expires_at')).toEqual('7200')

      const generator = logoutSaga()
      generator.next()

      expect(localStorage.getItem('access_token')).toEqual(null)
      expect(localStorage.getItem('id_token')).toEqual(null)
      expect(localStorage.getItem('expires_at')).toEqual(null)
    })
  })

  describe('watchLoginRequest', () => {
    const it = sagaHelper(watchLoginRequest())

    it('should take LOGIN_REQUEST', result => {
      expect(result).toEqual(take(LOGIN_REQUEST))
    })

    it('should call loginRequestSaga', result => {
      expect(result).toEqual(call(loginRequestSaga))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('watchLoginSuccess', () => {
    const it = sagaHelper(watchLoginSuccess())

    it('should take LOGIN_SUCCESS', result => {
      expect(result).toEqual(take(LOGIN_SUCCESS))
    })

    it('should trigger redirect to \'/\'', result => {
      expect(result).toEqual(put(push('/')))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('watchLoginFailure', () => {
    const it = sagaHelper(watchLoginFailure())

    it('should take LOGIN_FAILURE', result => {
      expect(result).toEqual(take(LOGIN_FAILURE))
    })

    it('should trigger redirect to \'/\'', result => {
      expect(result).toEqual(put(push('/')))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('watchLogout', () => {
    const it = sagaHelper(watchLogout())

    it('should take LOGOUT', result => {
      expect(result).toEqual(take(LOGOUT))
    })

    it('should call auth.logout', result => {
      const resultJSON = JSON.stringify(result)
      expect(resultJSON).toEqual(JSON.stringify(call(logoutSaga)))
    })

    it('should trigger redirect to \'/\'', result => {
      expect(result).toEqual(put(push('/')))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('watchSetSession', () => {
    const it = sagaHelper(watchSetSession())

    it('should take SET_SESSION', result => {
      expect(result).toEqual(take(SET_SESSION))
    })

    it('should call setSessionSaga', result => {
      expect(result).toEqual(call(setSessionSaga))
    })

    it('should do nothing', result => {
      expect(result).toBeUndefined()
    })
  })
})
