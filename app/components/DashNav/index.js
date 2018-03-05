/**
*
* DashNav
*
*/

import React from 'react'
import PropTypes from 'prop-types'

const openIcon = (
  <span className='dash-open'>
    <svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50' xmlns='http://www.w3.org/2000/svg'>
      <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
      <path d='M0-.25h24v24H0z' fill='none' />
    </svg>
  </span>
)

const closeIcon = (
  <span className='dash-close'>
    <svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' />
      <path d='M0-.25h24v24H0z' fill='none' />
    </svg>
  </span>
)

class DashNav extends React.Component {
  state = { expanded: false }

  toggleNav = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleComponentChange = (nextComponent) => {
    this.toggleNav()
    this.props.updateShowSection(nextComponent)
  }

  render () {
    return (
      <div>
        <nav className='sidebar'>
          <input type='checkbox' id='drawer-toggle' name='drawer-toggle' checked={this.state.expanded} />
          <label htmlFor='drawer-toggle' id='drawer-toggle-label' onClick={this.toggleNav}>
            {this.state.expanded ? closeIcon : openIcon}
          </label>
          <ul id='dash-list' className='sidebar-button-wrapper'>
            <li>
              <button id='sidebar-btn-add-book' onClick={() => this.handleComponentChange('AddBook')}>
                <span className='sidebar-context'>
                  <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                  </svg>
                </span>
                <br />
                <span>ADD BOOK</span>
              </button>
            </li>
            <li>
              <button id='sidebar-btn-my-books' onClick={() => this.handleComponentChange('MyBooks')}>
                <span className='sidebar-context'>
                  {this.props.userInfo.booksInLibrary.length}
                </span>
                <br />
                <span>MY BOOKS</span>
              </button>
            </li>
            <li>
              <button id='sidebar-btn-wishlist' onClick={() => this.handleComponentChange('UserRequested')}>
                <span className='sidebar-context'>
                  {this.props.userInfo.booksUserRequested.length}
                </span>
                <br />
                <span>WISHLIST</span>
              </button>
            </li>
            <li>
              <button id='sidebar-btn-requests' onClick={() => this.handleComponentChange('OtherRequested')}>
                <span className='sidebar-context'>
                  {this.props.userInfo.booksOtherRequested.length}
                </span>
                <br />
                <span>REQUESTS</span>
              </button>
            </li>
            <li>
              <button id='sidebar-btn-profile' onClick={() => this.handleComponentChange('Profile')}>
                <span className='sidebar-context'>
                  <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                  </svg>
                </span>
                <br />
                <span>PROFILE</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
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
