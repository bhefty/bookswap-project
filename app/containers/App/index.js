import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'

import Auth from 'utils/auth'

import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage/Loadable'
import FeaturePage from 'containers/FeaturePage/Loadable'
import Dashboard from 'containers/Dashboard/Loadable'
import BrowseBooks from 'containers/BrowseBooks/Loadable'
import CallbackPage from 'containers/CallbackPage'
import NotFoundPage from 'containers/NotFoundPage/Loadable'

import { makeSelectIsAuthenticated } from 'auth/selectors'

const auth = new Auth()

/* istanbul ignore next */
const PrivateRoute = ({ component: Component, store, ...rest }) => {
  const authSelector = makeSelectIsAuthenticated()
  const isAuthenticated = authSelector(store.store.getState('auth'))
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

const theme = {
  primary: '#434C5E',
  lightShade: '#E9E6D9',
  lightAccent: '#77938D',
  darkAccent: '#5472A1',
  darkShade: '#1B1720',
  whiteMain: '#FAFAFA',
  darkBlue: '16, 52, 88',
  red: '236, 63, 59',
  lightGreen: '130, 180, 136',
  blue: '61, 150, 213',
  lightBlue: `121, 203, 236`
}

const AppWrapper = styled.div`
  /* max-width: calc(768px + 16px * 2); */
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 150px); // min height for App wrapper should account for nav and footer
  flex-direction: column;
`

export default function App (store) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Helmet
          titleTemplate='%s - React.js Boilerplate'
          defaultTitle='React.js Boilerplate'
        >
          <meta name='description' content='A React.js Boierlplate application with Redux' />
        </Helmet>
        <Header auth={auth} />
        <AppWrapper>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/features' component={FeaturePage} />
            <PrivateRoute path='/dashboard' component={Dashboard} store={store} />
            <Route path='/books' component={BrowseBooks} />
            <Route path='/callback'>
              <CallbackPage auth={auth} />
            </Route>
            <Route path='' component={NotFoundPage} />
          </Switch>
        </AppWrapper>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
