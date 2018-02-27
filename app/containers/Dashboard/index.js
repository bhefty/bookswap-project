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
import gql from 'graphql-tag'

import injectReducer from 'utils/injectReducer'
import { makeSelectDashboard } from './selectors'
import reducer from './reducer'
import Wrapper from './Wrapper'

import DashNav from 'components/DashNav'
import MyBooks from './MyBooks'
import AddBook from './AddBook'
import UserRequested from './UserRequested'
import OtherRequested from './OtherRequested'

export class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.updateShowSection = this.updateShowSection.bind(this)
    this.handleAddBook = this.handleAddBook.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.onBookSearchTitleChange = this.onBookSearchTitleChange.bind(this)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.handleDenyRequest = this.handleDenyRequest.bind(this)
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
    this.handleRemoveBookFromLibrary = this.handleRemoveBookFromLibrary.bind(this)
    this.handleBookSearch = this.handleBookSearch.bind(this)

    this.state = {
      searchTitle: '',
      searchResults: [],
      showSection: 'MyBooks'
    }
  }

  updateShowSection (newSection) {
    this.setState({ showSection: newSection })
  }

  onBookSearchTitleChange (e) {
    this.setState({
      searchTitle: e.target.value
    })
  }

  refreshData () {
    this.props.getUserInfo.refetch()
  }

  async handleAddBook (book) {
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

  async handleBookSearch (e) {
    e.preventDefault()
    const bookResults = await this.props.searchForNewBook({
      variables: {
        searchTitle: this.state.searchTitle
      }
    })
    this.setState({ searchResults: bookResults.data.searchForNewBook })
  }

  async handleCancelRequest (item) {
    await this.props.cancelRequestBook({
      variables: {
        requesterId: this.props.dashboard.userId,
        ownerId: item.owner.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  async handleDenyRequest (item) {
    await this.props.cancelRequestBook({
      variables: {
        requesterId: item.requester.userId,
        ownerId: this.props.dashboard.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  async handleAcceptRequest (item) {
    await this.props.acceptRequest({
      variables: {
        ownerId: this.props.dashboard.userId,
        requesterId: item.requester.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  handleRemoveBookFromLibrary (book) {
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

Dashboard.propTypes = {
  dashboard: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired
}

Dashboard.fragments = {
  userParts: gql`
    fragment UserParts on User {
      _id
      userId
      name
      email
    }
  `
}

const userQuery = gql`
  query ($userId: String!) {
    user(userId: $userId) {
      ...UserParts
      booksInLibrary {
        bookId
        title
        description
        authors
        coverImg
      }
      booksUserRequested {
        book {
          bookId
          title
          description
          authors
          coverImg
        }
        owner {
          userId
          name
        }
      }
      booksOtherRequested {
        book {
          bookId
          title
          description
          authors
          coverImg
        }
        requester {
          userId
          name
        }
      }
    }
  }
  ${Dashboard.fragments.userParts}
`

const searchForNewBook = gql`
  mutation searchForNewBook ($searchTitle: String!) {
    searchForNewBook(searchTitle: $searchTitle) {
      bookId
      title
      authors
      description
      coverImg
    }
  }
`

const addBookToLibrary = gql`
  mutation addBookToLibrary ($userId: String!, $bookId: String!, $title: String!, $authors: [String!], $description: String!, $coverImg: String!) {
    addBookToLibrary(userId: $userId, bookId: $bookId, title: $title, authors: $authors, description: $description, coverImg: $coverImg) {
      userId
      name
      booksInLibrary {
        bookId
        title
        description
        coverImg
      }
    }
  }
`

const cancelRequestBook = gql`
  mutation cancelRequestBook ($requesterId: String!, $ownerId: String!, $bookId: String!) {
    cancelRequestBook(requesterId: $requesterId, ownerId: $ownerId, bookId: $bookId) {
      ...UserParts
      booksInLibrary {
        bookId
        title
        description
        coverImg
      }
    }
  }
  ${Dashboard.fragments.userParts}
`

const acceptRequest = gql`
  mutation acceptRequest ($requesterId: String!, $ownerId: String!, $bookId: String!) {
    acceptRequest(requesterId: $requesterId, ownerId: $ownerId, bookId: $bookId) {
      ...UserParts
      booksInLibrary {
        bookId
        title
        description
        coverImg
      }
    }
  }
  ${Dashboard.fragments.userParts}
`

const removeBookFromLibrary = gql`
  mutation removeBookFromLibrary ($userId: String!, $bookId: String!) {
    removeBookFromLibrary(userId: $userId, bookId: $bookId) {
      ...UserParts
      booksInLibrary {
        bookId
        title
        description
        coverImg
      }
    }
  }
  ${Dashboard.fragments.userParts}
`

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

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

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
