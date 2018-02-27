import { fromJS, List } from 'immutable'
import dashboardReducer from '../reducer'
import { makeSelectDecodedUserId } from '../selectors'

describe('dashboardReducer', () => {
  const userId = makeSelectDecodedUserId()
  let state
  beforeEach(() => {
    state = fromJS({
      userId,
      email: null,
      booksInLibrary: List([]),
      booksUserRequested: List([]),
      booksOtherRequested: List([])
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(dashboardReducer(undefined, {})).toEqual(expectedResult)
  })
})
