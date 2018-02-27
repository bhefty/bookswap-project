import React from 'react'
import PropTypes from 'prop-types'

import BookCard from 'components/BookCard'

const OtherRequested = ({ userInfo, handleDenyRequest, handleAcceptRequest }) => (
  <div>
    <h1>Requests Pending Approval</h1>
    <div className='content-library'>
      {(userInfo.booksOtherRequested.length === 0)
        ? (<div className='content-library-empty'>No pending requests at this time!</div>)
        : userInfo.booksOtherRequested.map((item) => {
          return (
            <BookCard
              key={item.book.bookId}
              book={item.book}
              action={{
                handleAction: () => handleAcceptRequest(item),
                handleAdditionalAction: () => handleDenyRequest(item),
                actionText: 'Accept',
                actionAdditionalText: 'Deny',
                primaryButtonClass: 'btn-blue',
                secondaryButtonClass: 'btn-red'
              }}
            />
          )
        })
      }
    </div>
  </div>
)

OtherRequested.propTypes = {
  userInfo: PropTypes.shape({
    booksOtherRequested: PropTypes.array.isRequired
  }),
  handleDenyRequest: PropTypes.func.isRequired,
  handleAcceptRequest: PropTypes.func.isRequired
}

export default OtherRequested
