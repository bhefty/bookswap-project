/*
*
* Dashboard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { graphql } from 'react-apollo'

import injectReducer from 'utils/injectReducer'
import { makeSelectDashboard } from './selectors'
import reducer from './reducer'
import Wrapper from './Wrapper'

import DashNav from 'components/DashNav'
import MyBooks from './MyBooks'
import AddBook from './AddBook'
import UserRequested from './UserRequested'
import OtherRequested from './OtherRequested'

import userQuery from 'graphql/queries/userQuery.graphql'
import searchForNewBook from 'graphql/mutations/searchForNewBook.graphql'
import addBookToLibrary from 'graphql/mutations/addBookToLibrary.graphql'
import acceptRequest from 'graphql/mutations/acceptRequest.graphql'
import cancelRequestBook from 'graphql/mutations/cancelRequestBook.graphql'
import removeBookFromLibrary from 'graphql/mutations/removeBookFromLibrary.graphql'

export class Dashboard extends React.Component {
  static propTypes = {
    dashboard: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    searchTitle: '',
    searchResults: [],
    showSection: 'MyBooks'
  }

  updateShowSection = (newSection) => {
    this.setState({ showSection: newSection })
  }

  onBookSearchTitleChange = (e) => {
    this.setState({
      searchTitle: e.target.value
    })
  }

  refreshData = () => {
    this.props.getUserInfo.refetch()
  }

  handleAddBook = async (book) => {
    await this.props.addBookToLibrary({
      variables: {
        userId: this.props.dashboard.userId,
        bookId: book.bookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        coverImg: book.coverImg
      }
    })
    this.refreshData()
  }

  handleBookSearch = async (e) => {
    e.preventDefault()
    const bookResults = await this.props.searchForNewBook({
      variables: {
        searchTitle: this.state.searchTitle
      }
    })
    this.setState({ searchResults: bookResults.data.searchForNewBook })
  }

  handleCancelRequest = async (item) => {
    await this.props.cancelRequestBook({
      variables: {
        requesterId: this.props.dashboard.userId,
        ownerId: item.owner.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  handleDenyRequest = async (item) => {
    await this.props.cancelRequestBook({
      variables: {
        requesterId: item.requester.userId,
        ownerId: this.props.dashboard.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  handleAcceptRequest = async (item) => {
    await this.props.acceptRequest({
      variables: {
        ownerId: this.props.dashboard.userId,
        requesterId: item.requester.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  handleRemoveBookFromLibrary = (book) => {
    this.props.removeBookFromLibrary({
      variables: {
        userId: this.props.dashboard.userId,
        bookId: book.bookId
      }
    })
    this.refreshData()
  }

  render () {
    let renderedContent = null
    switch (this.state.showSection) {
      case 'AddBook':
        renderedContent = (
          <AddBook
            userInfo={this.props.getUserInfo.user}
            onBookSearchTitleChange={this.onBookSearchTitleChange}
            searchTitle={this.state.searchTitle}
            handleBookSearch={this.handleBookSearch}
            handleAddBook={this.handleAddBook}
            searchResults={this.state.searchResults}
          />
        )
        break
      case 'MyBooks':
        renderedContent = (
          <MyBooks
            userInfo={this.props.getUserInfo.user}
            handleRemoveBookFromLibrary={this.handleRemoveBookFromLibrary}
          />
        )
        break
      case 'UserRequested':
        renderedContent = (
          <UserRequested
            userInfo={this.props.getUserInfo.user}
            handleCancelRequest={this.handleCancelRequest}
          />
        )
        break
      case 'OtherRequested':
        renderedContent = (
          <OtherRequested
            userInfo={this.props.getUserInfo.user}
            handleAcceptRequest={this.handleAcceptRequest}
            handleDenyRequest={this.handleDenyRequest}
          />
        )
        break
    }
    if (this.props.getUserInfo.loading) return <div>Loading</div>
    return (
      <Wrapper>
        <DashNav
          userInfo={this.props.getUserInfo.user}
          updateShowSection={this.updateShowSection}
        />
        <div className='content'>
          {renderedContent}
        </div>
      </Wrapper>
    )
  }
}

const withUserQuery = graphql(
  userQuery, {
    options: (props) => ({
      variables: {
        userId: props.dashboard.userId
      }
    }),
    name: 'getUserInfo'
  }
)

const withBookSearchMutation = graphql(
  searchForNewBook, {
    name: 'searchForNewBook'
  }
)

const withAddBookToLibraryMutation = graphql(
  addBookToLibrary, {
    name: 'addBookToLibrary'
  }
)

const withCancelRequestBook = graphql(
  cancelRequestBook, {
    name: 'cancelRequestBook'
  }
)

const withAcceptRequest = graphql(
  acceptRequest, {
    name: 'acceptRequest'
  }
)

const withRemoveBookFromLibrary = graphql(
  removeBookFromLibrary, {
    name: 'removeBookFromLibrary'
  }
)

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard()
})

const withConnect = connect(mapStateToProps, null)

const withReducer = injectReducer({ key: 'dashboard', reducer })

export default compose(
  withReducer,
  withConnect,
  withUserQuery,
  withBookSearchMutation,
  withAddBookToLibraryMutation,
  withCancelRequestBook,
  withAcceptRequest,
  withRemoveBookFromLibrary
)(Dashboard)
