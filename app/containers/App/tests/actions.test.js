import {
  LOAD_TRANSLATION,
  LOAD_TRANSLATION_SUCCESS,
  LOAD_TRANSLATION_ERROR
} from '../constants'

import {
  loadTranslation,
  translationLoaded,
  translationLoadingError
} from '../actions'

describe('App Actions', () => {
  describe('loadTranslation', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_TRANSLATION
      }
      expect(loadTranslation()).toEqual(expectedResult)
    })
  })

  describe('translationLoaded', () => {
    it('should return the correct type and the passed translation', () => {
      const fixture = ['Test']
      const text = 'test'
      const expectedResult = {
        type: LOAD_TRANSLATION_SUCCESS,
        translation: fixture,
        text
      }
      expect(translationLoaded(fixture, text)).toEqual(expectedResult)
    })
  })

  describe('translationLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!'
      }
      const expectedResult = {
        type: LOAD_TRANSLATION_ERROR,
        error: fixture
      }
      expect(translationLoadingError(fixture)).toEqual(expectedResult)
    })
  })
})
