/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable'

import {
  LOAD_TRANSLATION,
  LOAD_TRANSLATION_SUCCESS,
  LOAD_TRANSLATION_ERROR
} from './constants'

const initialState = fromJS({
  loading: false,
  error: false,
  currentText: false,
  translationData: {
    translation: false
  }
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSLATION:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['translationData', 'translation'], false)
    case LOAD_TRANSLATION_SUCCESS:
      return state
        .setIn(['translationData', 'translation'], action.translation.translation)
        .set('loading', false)
        .set('currentText', action.text)
    case LOAD_TRANSLATION_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    default:
      return state
  }
}

export default appReducer
