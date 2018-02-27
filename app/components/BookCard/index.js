/**
*
* BookCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  .content-library-book-card {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    
    .content-library-book-card_img-wrap {
      height: 250px;
      position: relative;
      cursor: pointer;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .5s ease-in-out;
      }

      .content-library-book-card_img-context {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        opacity: 0;
        transition: all 0.35s ease-in-out;

        button {
          color: #fff;
          border: 2px solid #fff;
          background-color: transparent;
          cursor: pointer;
          margin: auto;
          padding: 1em;
        }
      }

      &:hover {
        .content-library-book-card_img-context {
          opacity: 1;
        }

        img {
          transform: scale(1.1);
        }
      }
    }

    .content-library-book-card_details {

      .book-title {
        font-weight: 700;
        font-size: 1.25em;
        margin: 0.25em 0.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .book-author {
        color: rgba(0, 0, 0, 0.4);
        margin: 0.25em 0.75em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .content-library-book-card_actions {
      border-top: 1px solid rgba(0,0,0,.05);
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        display: inline-block;
        font-size: 0.75em;
        width: 100%;
        height: 100%;
        padding: 1em;
        border: none;
        cursor: pointer;
        color: ${(props) => {
          switch (props.actionType) {
            case 'remove':
            case 'cancel':
            case 'deny':
              return '#ff3232'
            case 'accept':
            case 'request':
              return '#0080ff'
            case 'add':
              return '#22c354'
          }
        }};
        transition: background 0.5s ease-in-out;

        &:hover {
          background: ${props => {
            switch (props.actionType) {
              case 'remove':
              case 'cancel':
              case 'deny':
                return '#ff3232'
              case 'accept':
              case 'request':
                return '#0080ff'
              case 'add':
                return '#22c354'
            }
          }};
          color: white;
        }
      }
      button:nth-child(2) {
        color: ${(props) => {
          switch (props.actionAdditionalType) {
            case 'remove':
            case 'cancel':
            case 'deny':
              return '#ff3232'
            case 'accept':
            case 'request':
              return '#0080ff'
            case 'add':
              return '#22c354'
          }
        }};
        &:hover {
          background: ${props => {
            switch (props.actionAdditionalType) {
              case 'remove':
              case 'cancel':
              case 'deny':
                return '#ff3232'
              case 'accept':
              case 'request':
                return '#0080ff'
              case 'add':
                return '#22c354'
            }
          }};
          color: white;
        }
      }
    }

    &:hover {
      box-shadow: 0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);
    }
  }
`

function BookCard ({ book, action }) {
  return (
    <Wrapper actionType={action.actionType} actionAdditionalType={action.actionAdditionalType}>
      <div className='content-library-book-card'>
        <div className='content-library-book-card_img-wrap'>
          <img src={book.coverImg} alt={book.title} />
          <div className='content-library-book-card_img-context'>
            <button>View Details</button>
          </div>
        </div>
        <div className='content-library-book-card_details'>
          <p className='book-title'>
            {book.title}
          </p>
          <p className='book-author'>
            {book.authors.join(', ')}
          </p>
        </div>
        <div className='content-library-book-card_actions'>
          <button onClick={() => action.handleAction(book)}>{action.actionText}</button>
          {action.actionAdditionalType &&
            <button onClick={() => action.handleAdditionalAction(book)}>{action.actionAdditionalText}</button>
          }
        </div>
      </div>
    </Wrapper>
  )
}

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired
  }).isRequired,
  action: PropTypes.shape({
    handleAction: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    handleAdditionalAction: PropTypes.func,
    actionAdditionalType: PropTypes.string,
    actionAdditionalText: PropTypes.string
  })
}

export default BookCard
