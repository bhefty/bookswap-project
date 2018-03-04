import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { loginRequest, logout } from 'auth/actions'
import { makeSelectIsAuthenticated } from 'auth/selectors'

import Img from 'components/Img'
import logo from './logo_white.png'
import Wrapper from './Wrapper'

export class Header extends Component {
  constructor (props) {
    super(props)
    this.toggleNav = this.toggleNav.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setExpandedFalse = this.setExpandedFalse.bind(this)

    this.state = {
      expanded: false
    }
  }

  handleKeyDown ({ keyCode }) {
    if (keyCode === 27 && this.state.expanded) {
      this.setState({ expanded: false })
    }
  }

  setExpandedFalse () {
    if (this.state.expanded) {
      this.setState({ expanded: false })
    }
  }

  toggleNav () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    if (this.props.location.pathname === '/') return null
    return (
      <Wrapper expanded={this.state.expanded} onKeyDown={this.handleKeyDown}>
        <div className='header'>
          <Link to='/' className='header__logo' onClick={this.setExpandedFalse}><Img src={logo} alt='Bookswap' /></Link>
          <Link to='/' className='header__link header__brand' onClick={this.setExpandedFalse}><span>Bookswap</span></Link>
          <button aria-expanded={this.state.expanded} aria-controls='menu-list' onClick={this.toggleNav}>
            <span className='open'>☰</span>
            <span className='close'>×</span>
          </button>
          <div id='menu-list' className='header__links' onClick={this.setExpandedFalse}>
            <Link to='/books' className='header__link'><span>Browse Books</span></Link>
            {this.props.isAuthenticated &&
              <Link to='/dashboard' className='header__link'><span>Dashboard</span></Link>
            }
            {this.props.isAuthenticated
              ? <button className='header__link' onClick={this.props.logout}>Logout</button>
              : <button className='header__link' onClick={this.props.login}>Login</button>
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated()
})

export const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginRequest()),
  logout: () => dispatch(logout())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withRouter,
  withConnect
)(Header)
