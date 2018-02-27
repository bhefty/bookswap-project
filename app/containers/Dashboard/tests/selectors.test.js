import { fromJS, List } from 'immutable'
import localStorage from 'localStorage'

import {
  selectDashboardDomain,
  makeSelectDashboard,
  makeSelectDecodedUserId
} from '../selectors'

describe('makeSelectDashboardDomain', () => {
  it('should select the dashboard domain', () => {
    const dashState = fromJS({
      userId: 'test|12345',
      email: null,
      booksInLibrary: List([]),
      booksUserRequested: List([]),
      booksOtherRequested: List([])
    })
    const mockedState = fromJS({
      dashboard: dashState
    })
    expect(selectDashboardDomain(mockedState)).toEqual(dashState)
  })
})

describe('makeSelectDashboard', () => {
  const selector = makeSelectDashboard()
  it('should select dashboard state', () => {
    const dashState = fromJS({
      userId: 'test|12345',
      email: null,
      booksInLibrary: List([]),
      booksUserRequested: List([]),
      booksOtherRequested: List([])
    })
    const mockedState = fromJS({
      dashboard: dashState
    })
    expect(selector(mockedState)).toEqual(dashState.toJS())
  })
})

describe('makeSelectDecodedUserId', () => {
  it('should return null if no id_token is in localStorage', () => {
    expect(makeSelectDecodedUserId()).toEqual(null)
  })

  it('should return decoded userId', () => {
    localStorage.setItem('id_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImIyZTVlNzZhLWViOWMtNGYxYi1iYTE0LWEwN2RlNzYxM2QxMyIsImlhdCI6MTUxOTYxMTU3NSwiZXhwIjoxNTE5NjE1MTc1fQ.k0rlAeDSNZ01Daxw-ugMtELQTdanniGMAOVBnMw-4nw')
    expect(makeSelectDecodedUserId()).toEqual('1234567890')
  })
})
