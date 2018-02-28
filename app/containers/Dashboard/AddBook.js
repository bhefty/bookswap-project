import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BookCard from 'components/BookCard'

const Wrapper = styled.div`
  form {
    text-align: center;
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
        width: 50vw;
        @media (max-width: 848px) {
          width: 90vw;
        }
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
  }
`

const AddBook = ({ userInfo, handleBookSearch, searchTitle, onBookSearchTitleChange, handleAddBook, searchResults }) => (
  <Wrapper>
    <h1>Add a New Book</h1>
    <form onSubmit={e => handleBookSearch(e)}>
      <div className='content-input-wrapper'>
        <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          <path d='M0 0h24v24H0z' fill='none' />
        </svg>
        <input type='text' placeholder='Browse for a new book...' onChange={e => onBookSearchTitleChange(e)} value={searchTitle} />
      </div>
    </form>
    <div className='content-library'>
      {searchResults.map((book) => {
        return (
          <BookCard
            key={book.bookId}
            book={book}
            action={{
              handleAction: () => handleAddBook(book),

              actionText: 'Add to Library',
              primaryButtonClass: 'btn-green'
            }}
          />
        )
      })
      }
    </div>
  </Wrapper>
)

AddBook.propTypes = {
  userInfo: PropTypes.shape({
    booksInLibrary: PropTypes.array.isRequired
  }),
  handleBookSearch: PropTypes.func.isRequired,
  searchTitle: PropTypes.string,
  onBookSearchTitleChange: PropTypes.func.isRequired,
  handleAddBook: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired
}

export default AddBook
