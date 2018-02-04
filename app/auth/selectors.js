import { createSelector } from 'reselect'

// If testing use the localStorage polyfill
let localStorage
/* istanbul ignore next */
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser localStorage
  localStorage = global.window.localStorage
}

const selectAuth = state => state.get('auth')

const makeSelectAuthResult = () => createSelector(
  selectAuth,
  (authState) => authState.get('authResult')
)

const makeSelectIsAuthenticated = () => createSelector(
  selectAuth,
  (authState) => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return (authState.get('isAuthenticated') && (new Date().getTime() < expiresAt))
  }
)

const makeSelectExpiryTime = () => {
  if (localStorage.getItem('expires_at')) {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  } else {
    return false
  }
}

export {
  selectAuth,
  makeSelectAuthResult,
  makeSelectIsAuthenticated,
  makeSelectExpiryTime
}
