/**
*
* DashNav
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'

class DashNav extends React.Component {
  state = { expanded: false }

  toggleNav = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    return (
      <Wrapper>
        <nav className='sidebar'>
          <button className='dash-toggle' aria-expanded={this.state.expanded} aria-controls='dash-list' onClick={this.toggleNav}>
            <span className='dash-open'>
              <svg fill='#FFFFFF' height='40' viewBox='0 0 24 24' width='40' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
                <path d='M0-.25h24v24H0z' fill='none' />
              </svg>
            </span>
            <span className='dash-close'>
              <svg fill='#FFFFFF' height='40' viewBox='0 0 24 24' width='40' xmlns='http://www.w3.org/2000/svg'>
                <path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' />
                <path d='"M0-.5h24v24H0z' fill='none' />
              </svg>
            </span>
          </button>
          <div id='dash-list' className='sidebar-button-wrapper'>
            <button id='sidebar-btn-add-book' onClick={() => this.props.updateShowSection('AddBook')}>
              <span className='sidebar-context'>
                <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
                  <path d='M0 0h24v24H0z' fill='none' />
                </svg>
              </span>
              <br />
              <span>ADD BOOK</span>
            </button>
            <button id='sidebar-btn-my-books' onClick={() => this.props.updateShowSection('MyBooks')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksInLibrary.length}
              </span>
              <br />
              <span>MY BOOKS</span>
            </button>
            <button id='sidebar-btn-wishlist' onClick={() => this.props.updateShowSection('UserRequested')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksUserRequested.length}
              </span>
              <br />
              <span>WISHLIST</span>
            </button>
            <button id='sidebar-btn-requests' onClick={() => this.props.updateShowSection('OtherRequested')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksOtherRequested.length}
              </span>
              <br />
              <span>REQUESTS</span>
            </button>
            <button id='sidebar-btn-profile' onClick={() => this.props.updateShowSection('Profile')}>
              <span className='sidebar-context'>
                <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  <path d='M0 0h24v24H0z' fill='none' />
                </svg>
              </span>
              <br />
              <span>PROFILE</span>
            </button>
          </div>
        </nav>
      </Wrapper>
    )
  }
}

DashNav.propTypes = {
  userInfo: PropTypes.shape({
    booksInLibrary: PropTypes.array.isRequired,
    booksUserRequested: PropTypes.array.isRequired,
    booksOtherRequested: PropTypes.array.isRequired
  }).isRequired,
  updateShowSection: PropTypes.func.isRequired
}

export default DashNav
