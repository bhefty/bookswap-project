import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Auth from 'utils/auth'

import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage/Loadable'
import FeaturePage from 'containers/FeaturePage/Loadable'
import CallbackPage from 'containers/CallbackPage'
import NotFoundPage from 'containers/NotFoundPage/Loadable'

const auth = new Auth()

const theme = {
  primary: '#434C5E',
  lightShade: '#E9E6D9',
  lightAccent: '#77938D',
  darkAccent: '#5472A1',
  darkShade: '#1B1720',
  whiteMain: '#FAFAFA'
}

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 150px); // min height for App wrapper should account for nav and footer
  padding: 0 16px;
  flex-direction: column;
`
console.log('proc', process.env.NODE_ENV)
console.log('env', process.env.AUTH0_DOMAIN)
export default function App () {
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
