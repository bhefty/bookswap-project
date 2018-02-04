import { push } from 'react-router-redux'
import { take, call, put, all, fork, select } from 'redux-saga/effects'

import Auth from 'utils/auth'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_SESSION
} from './constants'

import { loginSuccess, loginFailure } from './actions'
import { makeSelectAuthResult } from './selectors'

const auth = new Auth()

let localStorage

// If testing use the localStorage polyfill
/* istanbul ignore next */
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser localStorage
  localStorage = global.window.localStorage
}

// Login Request Handler
export function * loginRequestSaga () {
  try {
    yield call(auth.login)
  } catch (error) {
    yield put(loginFailure(error))
  }
}

// Set Session Handler
export function * setSessionSaga () {
  const authResult = yield select(makeSelectAuthResult())

  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', expiresAt)
  yield put(loginSuccess())
}

// Logout handler
export function * logoutSaga () {
  // Clear access token and ID token from local storage
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
}

// Watcher functions
export function * watchLoginRequest () {
  yield take(LOGIN_REQUEST)
  yield call(loginRequestSaga)
}

export function * watchLoginSuccess () {
  yield take(LOGIN_SUCCESS)
  yield put(push('/'))
}

export function * watchLoginFailure () {
  yield take(LOGIN_FAILURE)
  yield put(push('/'))
}

export function * watchLogout () {
  yield take(LOGOUT)
  yield call(logoutSaga)
  yield put(push('/'))
}

export function * watchSetSession () {
  yield take(SET_SESSION)
  yield call(setSessionSaga)
}

// Root saga manages matcher lifecycle
export default function * authSagas () {
  yield all([
    fork(watchLoginRequest),
    fork(watchLoginSuccess),
    fork(watchLoginFailure),
    fork(watchLogout),
    fork(watchSetSession)
  ])
}
