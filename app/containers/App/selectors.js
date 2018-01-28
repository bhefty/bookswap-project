import { createSelector } from 'reselect'

const selectGlobal = state => state.get('global')
const selectRoute = state => state.get('route')

const makeSelectCurrentText = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentText')
)

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
)

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
)

const makeSelectTranslation = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['translationData', 'translation'])
)

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
)

export {
  selectGlobal,
  selectRoute,
  makeSelectCurrentText,
  makeSelectLoading,
  makeSelectError,
  makeSelectTranslation,
  makeSelectLocation
}
