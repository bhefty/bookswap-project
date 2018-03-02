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

import { makeSelectIsAuthenticated } from 'auth/selectors'
import { loginRequest } from 'auth/actions'
import LoadingIndicator from 'components/LoadingIndicator'
import SearchForm from 'components/SearchForm'

import booksQuery from 'graphql/queries/booksQuery.graphql'

export class BrowseBooks extends React.Component {
  state = {
    filterTitle: ''
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  handleFilterBooks = (e) => {
    e.preventDefault()
    console.log('Filtering')
  }

  onFilterTitleChange = (e) => {
    this.setState({ filterTitle: e.target.value })
  }

  handleRequestBook = (book) => {
    console.log('request book', book)
  }

  handleRedirectToLogin = () => {
    this.props.login()
  }

  render () {
    if (this.props.getBooks.loading) return <LoadingIndicator />
    return (
      <SearchForm
        handleSubmit={this.handleFilterBooks}
        inputValue={this.state.filterTitle}
        inputPlaceholder={'Browse for a book title...'}
        onInputChange={this.onFilterTitleChange}
        handlePrimaryAction={this.props.isAuthenticated ? this.handleRequestBook : this.handleRedirectToLogin}
        searchResults={this.props.getBooks.books}
        actionText={this.props.isAuthenticated ? 'Request Book' : 'Login to Request'}
        primaryButtonClass={'btn-blue'}
      />
    )
  }
}

const withBooksQuery = graphql(
  booksQuery, {
    name: 'getBooks'
  }
)

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated()
})

export const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginRequest())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withBooksQuery
)(BrowseBooks)
