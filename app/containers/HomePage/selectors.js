import { createSelector } from 'reselect'

const selectHome = state => state.get('home')

const makeSelectText = () => createSelector(
  selectHome,
  (homeState) => homeState.get('text')
)

const makeSelectCount = () => createSelector(
  selectHome,
  (homeState) => homeState.get('count')
)

export {
  selectHome,
  makeSelectText,
  makeSelectCount
}
