/**
*
* BookCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './Wrapper'

function BookCard ({ book, action }) {
  return (
    <Wrapper>
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
          <button className={action.primaryButtonClass} onClick={() => action.handleAction(book)}>{action.actionText}</button>
          {action.actionAdditionalText &&
            <button className={action.secondaryButtonClass} onClick={() => action.handleAdditionalAction(book)}>{action.actionAdditionalText}</button>
          }
        </div>
      </div>
    </Wrapper>
  )
}

BookCard.propTypes = {
  book: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    coverImg: PropTypes.string.isRequired
  }).isRequired,
  action: PropTypes.shape({
    handleAction: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
    handleAdditionalAction: PropTypes.func,
    actionAdditionalText: PropTypes.string,
    primaryButtonClass: PropTypes.string.isRequired,
    secondaryButtonClass: PropTypes.string
  })
}

export default BookCard
