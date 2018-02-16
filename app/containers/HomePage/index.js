import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectIsAuthenticated } from 'auth/selectors'

import styled from 'styled-components'
import logo from 'components/Header/logo_dark.png'
import splashCover from './splash-cover.jpg'
import { loginRequest } from 'auth/actions'

const Splash = styled.div`
  background: url(${splashCover}) no-repeat center center;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  main {
    margin-left: 1em;

    img {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 2em;
      opacity: 0.5;
    }

    h1 {
      font-weight: 100;
      font-size: 3em;
      color: #444;
      margin-bottom: 0;
    }

    h3 {
      font-weight: 100;
      font-size: 1em;
      color: #444;
      margin-bottom: 2em;
      margin-top: 0.5em;
    }

    button {
      display: inline-block;
      box-sizing: border-box;
      padding: 1.5em 1em;
      border: none;
      border-radius: 4px;
      outline: 0;
      font-size: 1.5em;
      background-color: #15B0D5;
      color: #fff;

      &:active: {
        background: #15B0D5;
        color: #fff;
      }
    }
  }
`

export class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this._handleRoute = this._handleRoute.bind(this)
  }

  _handleRoute () {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard')
    } else {
      this.props.login()
    }
  }

  render () {
    return (
      <article>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: 'A trading platform for books' }
          ]}
        />
        <Splash>
          <main>
            <img src={logo} alt='Bookswap Logo' />
            <h1>Bookswap</h1>
            <h3>Quickly and easily trade books with like-minded friends.</h3>
            <button onClick={this._handleRoute}>
              Get Started
              <svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
                <path d='M0-.25h24v24H0z' fill='none' />
              </svg>
            </button>
          </main>
        </Splash>
      </article>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated()
})

export const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginRequest())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withRouter,
  withConnect
)(HomePage)
