import { fromJS } from 'immutable'

import homeReducer from '../reducer'

import {
  changeText,
  increment,
  decrement
} from '../actions'

describe('homeReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      text: '',
      count: 0
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(homeReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the changeText action correctly', () => {
    const fixture = 'we will translate this'
    const expectedResult = state.set('text', fixture)
    expect(homeReducer(state, changeText(fixture))).toEqual(expectedResult)
  })

  it('should handle the increment action correctly', () => {
    const expectedResult = state.update('count', n => n + 1)
    expect(homeReducer(state, increment())).toEqual(expectedResult)
  })

  it('should handle the decrement action correctly', () => {
    const expectedResult = state.update('count', n => n - 1)
    expect(homeReducer(state, decrement())).toEqual(expectedResult)
  })
})
