/*
*
* BrowseBooks
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import filter from 'lodash/filter'
import { ToastContainer, toast } from 'react-toastify'

import injectReducer from 'utils/injectReducer'
import reducer from 'containers/Dashboard/reducer'
import { makeSelectDashboard } from 'containers/Dashboard/selectors'
import { makeSelectIsAuthenticated } from 'auth/selectors'
import { loginRequest } from 'auth/actions'
import LoadingIndicator from 'components/LoadingIndicator'
import SearchForm from 'components/SearchForm'
import RequestFromModal from 'components/RequestFromModal'
import Wrapper from './Wrapper'

import booksQuery from 'graphql/queries/booksQuery.graphql'
import requestBook from 'graphql/mutations/requestBook.graphql'

export class BrowseBooks extends React.Component {
  state = {
    filterTitle: '',
    filteredBookResults: [],
    filteredBookResultsWithHidden: [],
    modalIsOpen: false,
    selectedBookOwners: [],
    selectedBook: null
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentWillMount = () => {
    this.props.getBooks.refetch()
  }

  handleHideMyBooks = (e) => {
    const currentBooks = this.state.filteredBookResults.length > 0 ? this.state.filteredBookResults : this.props.getBooks.books
    if (e.target.checked) {
      const filterResult = filter(currentBooks, (book) => {
        const userId = this.props.userInfo.userId
        return book.owners.find(owner => owner.userId !== userId)
      })
      this.setState({
        filteredBookResultsWithHidden: filterResult
      })
    } else {
      this.setState({
        filteredBookResultsWithHidden: []
      })
    }
  }

  handleFilterBooks = (e) => {
    e.preventDefault()
    const filterResult = filter(this.props.getBooks.books, (book) => {
      const filterTitle = this.state.filterTitle.toLowerCase()
      const bookTitle = book.title.toLowerCase()
      return bookTitle.includes(filterTitle)
    })
    this.setState({
      filteredBookResults: filterResult
    })
  }

  onFilterTitleChange = (e) => {
    this.setState({ filterTitle: e.target.value })
  }

  handleRequestBook = (owner) => {
    const ownerId = owner.userId
    const requesterId = this.props.userInfo.userId
    const bookId = this.state.selectedBook.bookId
    this.props.requestBook({
      variables: {
        ownerId,
        requesterId,
        bookId
      }
    })
    this.closeModal()
    toast.success('Requested book!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  handleRequestFrom = (book) => {
    this.setState({
      selectedBookOwners: book.owners,
      selectedBook: book
    })
    this.openModal()
  }

  handleRedirectToLogin = () => {
    this.props.login()
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      selectedBookOwners: [],
      selectedBook: null
    })
  }

  render () {
    if (this.props.getBooks.loading) return <LoadingIndicator />
    return (
      <Wrapper>
        <div className='filter-input-wrapper'>
          <span>Hide my books</span>
          <input type='checkbox' className='filter-owned-books toggle-checkbox' id='cb-filter' onChange={e => this.handleHideMyBooks(e)} />
          <label className='toggle-button' htmlFor='cb-filter' />
        </div>
        <SearchForm
          handleSubmit={this.handleFilterBooks}
          inputValue={this.state.filterTitle}
          inputPlaceholder={'Browse for a book title...'}
          onInputChange={this.onFilterTitleChange}
          handlePrimaryAction={
            /* istanbul ignore next */
            this.props.isAuthenticated ? this.handleRequestFrom : this.handleRedirectToLogin
          }
          searchResults={
            /* istanbul ignore next */
            this.state.filteredBookResultsWithHidden.length > 0 ? this.state.filteredBookResultsWithHidden
              : this.state.filteredBookResults.length > 0 ? this.state.filteredBookResults : this.props.getBooks.books
          }
          actionText={this.props.isAuthenticated ? 'Request Book' : 'Login to Request'}
          primaryButtonClass={'btn-blue'}
        />
        <RequestFromModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          bookOwners={this.state.selectedBookOwners}
          onSelectOwner={this.handleRequestBook}
        />
        <ToastContainer />
      </Wrapper>
    )
  }
}

const withBooksQuery = graphql(
  booksQuery, {
    name: 'getBooks'
  }
)

const withRequestBooks = graphql(
  requestBook, {
    name: 'requestBook'
  }
)

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  userInfo: makeSelectDashboard()
})

export const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginRequest())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'dashboard', reducer })

export default compose(
  withReducer,
  withConnect,
  withBooksQuery,
  withRequestBooks
)(BrowseBooks)
