import React from 'react'
import PropTypes from 'prop-types'

import BookCard from 'components/BookCard'

const UserRequested = ({ userInfo, handleCancelRequest }) => (
  <div>
    <h1>Book Wishlist</h1>
    <div className='content-library'>
      {(userInfo.booksUserRequested.length === 0)
        ? (<div className='content-library-empty'>No books requested yet!</div>)
        : userInfo.booksUserRequested.map((item) => {
          return (
            <BookCard
              key={item.book.bookId}
              book={item.book}
              action={{
                handleAction: () => handleCancelRequest(item),
                actionText: 'Cancel Request',
                primaryButtonClass: 'btn-red'
              }}
            />
          )
        })
      }
    </div>
  </div>
)

UserRequested.propTypes = {
  userInfo: PropTypes.shape({
    booksUserRequested: PropTypes.array.isRequired
  }),
  handleCancelRequest: PropTypes.func.isRequired
}

export default UserRequested
