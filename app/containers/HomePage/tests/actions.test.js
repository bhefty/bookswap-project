import {
  CHANGE_TEXT,
  INCREMENT,
  DECREMENT
} from '../constants'

import {
  changeText,
  increment,
  decrement
} from '../actions'

describe('Home Actions', () => {
  describe('changeText', () => {
    it('should return the correct type and the passed text', () => {
      const fixture = 'sample text'
      const expectedResult = {
        type: CHANGE_TEXT,
        text: fixture
      }
      expect(changeText(fixture)).toEqual(expectedResult)
    })
  })

  describe('increment', () => {
    it('should return the correct type', () => {
      const expectedResult = { type: INCREMENT }
      expect(increment()).toEqual(expectedResult)
    })
  })

  describe('decrement', () => {
    it('should return the correct type', () => {
      const expectedResult = { type: DECREMENT }
      expect(decrement()).toEqual(expectedResult)
    })
  })
})
