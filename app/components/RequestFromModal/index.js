/**
*
* RequestFromModal
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import styled from 'styled-components'

const H2 = styled.h2`
  font-weight: 200;
`

const UL = styled.div`
  list-style: none;

  .button-owner {
    display: inline-block;
    font-size: 0.75em;
    width: 100%;
    height: 100%;
    padding: 1em;
    border: none;
    cursor: pointer;
    color: #0080ff;
    transition: background 0.5s ease-in-out;

    &:hover {
      color: #fff;
      background: #0080ff;
    }
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const RequestFromModal = ({ isOpen, onRequestClose, bookOwners, onSelectOwner }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='Choose a user to request the book from'
      ariaHideApp={false}
    >
      <H2>Who would you like to request the book from?</H2>
      <UL>
        {bookOwners.map(owner => (
          <li key={owner.userId}>
            <button className='button-owner' onClick={() => onSelectOwner(owner)}>
              {owner.name}
            </button>
          </li>
        ))}
      </UL>
    </Modal>
  )
}

RequestFromModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSelectOwner: PropTypes.func.isRequired,
  bookOwners: PropTypes.array.isRequired
}

export default RequestFromModal
