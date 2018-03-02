import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  section {
    text-align: center;
    max-width: 500px;
    margin: 1em auto;

    .content-input-wrapper {
      position: relative;

      svg {
        position: absolute;
        margin-top: 1.25em;
        width: 50px;
        fill: rgba(0, 0, 0, 0.6);
      }

      input {
        margin: 0 auto;
        width: 350px;
        border: none;
        border-bottom: 2px solid #ccc;
        padding: 1em 50px 0.75em 50px;
        font-size: 1.25em;
        font-weight: 400;
        outline: 0;
        ::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }

        &:focus {
          border-color: #85b7b9;
          ::placeholder {
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    .content-button-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2em;

      button {
        display: inline-block;
        font-size: 0.75em;
        width: 100%;
        height: 100%;
        padding: 1em;
        border: none;
        cursor: pointer;
        transition: background 0.5s ease-in-out;
      }

      #profile-save {
        color: #fff;
        background: #33cc66;
        &:hover {
          background: #22c354;
        }
      }

      #profile-cancel {
        color: #fff;
        background: #ff4c4c;
        &:hover {
          background: #ff3232;
        }
      }
    }
  }
`

const Profile = ({ userInfo, editEmail, editLocation, handleEditProfile, handleCancelEditProfile, onUserEmailChange, onUserLocationChange }) => (
  <Wrapper>
    <h1>Edit your information</h1>
    <div className='content-profile'>
      <h2>{userInfo.name}</h2>
      <section>
        <div className='content-input-wrapper'>
          <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
          <input id='profile-input-email' type='text' placeholder={userInfo.email || 'Please enter an email address'} value={editEmail} onChange={e => onUserEmailChange(e)} />
        </div>
        <div className='content-input-wrapper'>
          <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
          <input id='profile-input-location' type='text' placeholder={userInfo.location || 'Please enter a location: City, State'} value={editLocation} onChange={e => onUserLocationChange(e)} />
        </div>
        <div className='content-button-wrapper'>
          <button id='profile-save' onClick={handleEditProfile}>Save</button>
          <button id='profile-cancel' onClick={handleCancelEditProfile}>Cancel</button>
        </div>
      </section>
    </div>
  </Wrapper>
)

Profile.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string
  }),
  editEmail: PropTypes.string,
  editLocation: PropTypes.string,
  handleEditProfile: PropTypes.func.isRequired,
  handleCancelEditProfile: PropTypes.func.isRequired,
  onUserEmailChange: PropTypes.func.isRequired,
  onUserLocationChange: PropTypes.func.isRequired
}

export default Profile
