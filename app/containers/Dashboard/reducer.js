/*
 *
 * Dashboard reducer
 *
 */

import { fromJS, List } from 'immutable'

import { makeSelectDecodedUserId } from './selectors'

const userId = makeSelectDecodedUserId()

const initialState = fromJS({
  userId,
  email: null,
  booksInLibrary: List([]),
  booksUserRequested: List([]),
  booksOtherRequested: List([])
})

function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default dashboardReducer
