/**
 * Create store with async loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

/* istanbul ignore next */
export default function configureStore (initialState = {}, history) {
  // Create store with two middlewares
  // 1. sagaMiddleware: Make redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  // If Redux Devtools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, operator-linebreak */
  /* istanbul ignore next */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false
      })
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {} // Reducer registry
  store.injectedSagas = {} // Saga registry
  // store.asyncReducers = {} // Async reducer registry

  // Make reducers hot reloadable
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}
