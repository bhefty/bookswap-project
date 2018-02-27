/**
*
* DashNav
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  .sidebar {
    position: sticky;
    top: 0;
  }

  .sidebar-button-wrapper {
      display: grid;
      grid-template-rows: 100px;
      grid-auto-flow: row;
      grid-auto-rows: 100px;
      margin: 0;
      padding: 0;
      align-content: center;
      height: 100vh;

      @media (max-width: 848px) {
        grid-template-columns: 100px;
        grid-auto-flow: column;
        grid-auto-columns: 100px;
        height: 100%;
        justify-content: center;
      }

      button {
        border: none;
        border-bottom: 1px solid #fff;
        @media (max-width: 848px) {
          border-bottom: none;
          border-right: 1px solid #fff;
        }
        outline: 0;
        background: rgba(59, 171, 221, 0.5);
        transition: background 0.3s ease-in-out;
        color: #fff;
        cursor: pointer;

        .sidebar-context {
          
          svg {
            height: 30px;
            width: 30px;
          }
        }
        &:hover {
          background: rgba(59, 171, 221, 1);
        }
      }
      button:first-child {
        border-top-right-radius: 8px;
        @media (max-width: 848px) {
          border-top-right-radius: 0;
          border-bottom-left-radius: 8px;
        }
      }

      button:last-child {
        border-bottom: none;
        border-bottom-right-radius: 8px;
        @media (max-width: 848px) {
          border-right: none;
          border-bottom-right-radius: 8px;
        }
      }
    }
`

class DashNav extends React.Component {
  render () {
    return (
      <Wrapper>
        <nav className='sidebar'>
          <div className='sidebar-button-wrapper'>
            <button onClick={() => this.props.updateShowSection('AddBook')}>
              <span className='sidebar-context'>
                <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
                  <path d='M0 0h24v24H0z' fill='none' />
                </svg>
              </span>
              <br />
              <span>ADD BOOK</span>
            </button>
            <button onClick={() => this.props.updateShowSection('MyBooks')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksInLibrary.length}
              </span>
              <br />
              <span>MY BOOKS</span>
            </button>
            <button onClick={() => this.props.updateShowSection('UserRequested')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksUserRequested.length}
              </span>
              <br />
              <span>WISHLIST</span>
            </button>
            <button onClick={() => this.props.updateShowSection('OtherRequested')}>
              <span className='sidebar-context'>
                {this.props.userInfo.booksOtherRequested.length}
              </span>
              <br />
              <span>REQUESTS</span>
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
