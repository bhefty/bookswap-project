import { createSelector } from 'reselect'
import jsonwebtoken from 'jsonwebtoken'

// If testing use the localStorage polyfill
let localStorage
/* istanbul ignore next */
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser localStorage
  localStorage = global.window.localStorage
}

/**
 * Direct selector to the dashboard state domain
 */
const selectDashboardDomain = (state) => state.get('dashboard')

/**
 * Other specific selectors
 */
const makeSelectDecodedUserId = () => {
  const ID_TOKEN = localStorage.getItem('id_token')
  if (!ID_TOKEN) return null

  const decodedToken = jsonwebtoken.decode(ID_TOKEN)
  return decodedToken.sub
}

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.toJS()
)

export {
  selectDashboardDomain,
  makeSelectDashboard,
  makeSelectDecodedUserId
}
