import React from 'react'
import PropTypes from 'prop-types'

import BookCard from 'components/BookCard'

const MyBooks = ({ userInfo, handleRemoveBookFromLibrary }) => (
  <div>
    <h1>My Books Available For Trade</h1>
    <div className='content-library'>
      {(userInfo.booksInLibrary.length === 0)
        ? (<div className='content-library-empty'>No books yet, try adding some!</div>)
        : userInfo.booksInLibrary.map((book) => {
          return (
            <BookCard
              key={book.bookId}
              book={book}
              action={{
                handleAction: handleRemoveBookFromLibrary,
                actionType: 'remove',
                actionText: 'Remove from Library'
              }}
            />
          )
        })
      }
    </div>
  </div>
)

MyBooks.propTypes = {
  userInfo: PropTypes.shape({
    booksInLibrary: PropTypes.array.isRequired
  }),
  handleRemoveBookFromLibrary: PropTypes.func.isRequired
}

export default MyBooks
