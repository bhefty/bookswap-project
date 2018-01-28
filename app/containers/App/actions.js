/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TRANSLATION,
  LOAD_TRANSLATION_SUCCESS,
  LOAD_TRANSLATION_ERROR
} from './constants'

/**
 * Load the translation, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRANSLATION
 */
export function loadTranslation () {
  return {
    type: LOAD_TRANSLATION
  }
}

/**
 * Dispatched when the translation is loaded by the request saga
 *
 * @param  {array} translation The translation data
 * @param  {string} text The current text
 *
 * @return {object} An action object with a type of LOAD_TRANSLATION_SUCCESS passing the translation
 */
export function translationLoaded (translation, text) {
  return {
    type: LOAD_TRANSLATION_SUCCESS,
    translation,
    text
  }
}

/**
 * Dispatched when loading the translation fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_TRANSLATION_ERROR passing the error
 */
export function translationLoadingError (error) {
  return {
    type: LOAD_TRANSLATION_ERROR,
    error
  }
}
