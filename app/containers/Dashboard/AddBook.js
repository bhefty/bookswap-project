import React from 'react'
import PropTypes from 'prop-types'

import SearchForm from 'components/SearchForm'

const AddBook = (props) => (
  <SearchForm
    handleSubmit={props.handleBookSearch}
    inputValue={props.searchTitle}
    inputPlaceholder={'Browse for a new book...'}
    onInputChange={props.onBookSearchTitleChange}
    handlePrimaryAction={props.handleAddBook}
    searchResults={props.searchResults}
    actionText={'Add to Library'}
    primaryButtonClass={'btn-green'}
  />
)

AddBook.propTypes = {
  handleBookSearch: PropTypes.func.isRequired,
  searchTitle: PropTypes.string,
  onBookSearchTitleChange: PropTypes.func.isRequired,
  handleAddBook: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired
}

export default AddBook
