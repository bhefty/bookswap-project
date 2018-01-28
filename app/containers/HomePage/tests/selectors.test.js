import { fromJS } from 'immutable'

import {
  selectHome,
  makeSelectText,
  makeSelectCount
} from '../selectors'

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      count: 0
    })
    const mockedState = fromJS({
      home: homeState
    })
    expect(selectHome(mockedState)).toEqual(homeState)
  })
})

describe('makeSelectText', () => {
  const textSelector = makeSelectText()
  it('should select the text', () => {
    const text = 'we will translate this'
    const mockedState = fromJS({
      home: {
        text
      }
    })
    expect(textSelector(mockedState)).toEqual(text)
  })
})

describe('makeSelectCount', () => {
  const countSelector = makeSelectCount()
  it('should select the count', () => {
    const mockedState = fromJS({
      home: {
        count: 0
      }
    })
    expect(countSelector(mockedState)).toEqual(0)
  })
})
