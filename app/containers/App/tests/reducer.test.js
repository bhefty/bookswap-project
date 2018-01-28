import { fromJS } from 'immutable'

import appReducer from '../reducer'
import {
  loadTranslation,
  translationLoaded,
  translationLoadingError
} from '../actions'

describe('appReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentText: false,
      translationData: fromJS({
        translation: false
      })
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(appReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the loadTranslation action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['translationData', 'translation'], false)

    expect(appReducer(state, loadTranslation())).toEqual(expectedResult)
  })

  it('should handle the translationLoaded action correctly', () => {
    const fixture = {
      translation: 'translate this we will'
    }
    const text = 'we will translate this'
    const expectedResult = state
      .setIn(['translationData', 'translation'], fixture.translation)
      .set('loading', false)
      .set('currentText', text)

    expect(appReducer(state, translationLoaded(fixture, text))).toEqual(expectedResult)
  })

  it('should handle the translationLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found'
    }
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false)

    expect(appReducer(state, translationLoadingError(fixture))).toEqual(expectedResult)
  })
})
