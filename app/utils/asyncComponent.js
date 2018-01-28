/**
 * Asynchronous loading of components. If component has reducers/sagas,
 * they are injected asynchronously followed by the component itself.
 *
 * Code splitting example inspired by:
 * https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
 */

import React, { Component } from 'react'

const asyncComponent = (getComponent) => {
  return class AsyncComponent extends Component {
    static Component = null
    state = { Component: AsyncComponent.Component }

    componentWillMount = () => {
      if (!this.state.Component) {
        if (getComponent.reducer) {
          const injectReducer = getComponent.injectReducer
          const reducerName = getComponent.name
          const getReducer = getComponent.reducer

          if (injectReducer) {
            getReducer().then((reducer) => injectReducer(reducerName, reducer.default))
          }

          const injectSagas = getComponent.injectSagas || false
          const getSagas = getComponent.sagas || false

          if (injectSagas) {
            getSagas().then((sagas) => injectSagas(sagas.default))
          }
        }
        getComponent.component().then(({ default: Component }) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render () {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

export default asyncComponent
