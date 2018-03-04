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
import { ToastContainer, toast } from 'react-toastify'

import injectReducer from 'utils/injectReducer'
import { makeSelectDashboard } from './selectors'
import reducer from './reducer'
import Wrapper from './Wrapper'

import LoadingIndicator from 'components/LoadingIndicator'
import DashNav from 'components/DashNav'
import MyBooks from './MyBooks'
import AddBook from './AddBook'
import UserRequested from './UserRequested'
import OtherRequested from './OtherRequested'
import Profile from './Profile'

import userQuery from 'graphql/queries/userQuery.graphql'
import searchForNewBook from 'graphql/mutations/searchForNewBook.graphql'
import addBookToLibrary from 'graphql/mutations/addBookToLibrary.graphql'
import acceptRequest from 'graphql/mutations/acceptRequest.graphql'
import cancelRequestBook from 'graphql/mutations/cancelRequestBook.graphql'
import removeBookFromLibrary from 'graphql/mutations/removeBookFromLibrary.graphql'
import editUserName from 'graphql/mutations/editUserName.graphql'
import editUserEmail from 'graphql/mutations/editUserEmail.graphql'
import editUserLocation from 'graphql/mutations/editUserLocation.graphql'

export class Dashboard extends React.Component {
  static propTypes = {
    dashboard: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    searchTitle: '',
    searchResults: [],
    showSection: 'MyBooks',
    editUserNameValue: '',
    editUserEmailValue: '',
    editUserLocationValue: ''
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
    toast.success('Book added to your library!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
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
    toast.success('Cancelled request!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
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
    toast.info('Denied request!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
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
    toast.success('Accepted request!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
    await this.props.acceptRequest({
      variables: {
        ownerId: this.props.dashboard.userId,
        requesterId: item.requester.userId,
        bookId: item.book.bookId
      }
    })
    this.refreshData()
  }

  handleRemoveBookFromLibrary = async (book) => {
    toast.success('Book removed from library!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
    await this.props.removeBookFromLibrary({
      variables: {
        userId: this.props.dashboard.userId,
        bookId: book.bookId
      }
    })
    this.refreshData()
  }

  handleEditProfile = async () => {
    const { editUserNameValue, editUserEmailValue, editUserLocationValue } = this.state
    const { name, email, location } = this.props.getUserInfo.user
    if (editUserNameValue !== name && editUserNameValue !== '') {
      await this.props.editUserName({
        variables: {
          userId: this.props.dashboard.userId,
          name: editUserNameValue
        }
      })
      this.setState({
        editUserNameValue: ''
      })
      toast.success('Updated name!', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    if (editUserEmailValue !== email && editUserEmailValue !== '') {
      await this.props.editUserEmail({
        variables: {
          userId: this.props.dashboard.userId,
          email: editUserEmailValue
        }
      })
      this.setState({
        editUserEmailValue: ''
      })
      toast.success('Updated email!', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    if (editUserLocationValue !== location && editUserLocationValue !== '') {
      await this.props.editUserLocation({
        variables: {
          userId: this.props.dashboard.userId,
          location: editUserLocationValue
        }
      })
      this.setState({
        editUserLocationValue: ''
      })
      toast.success('Updated location!', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    if ((editUserNameValue !== name && editUserNameValue !== '') || (editUserEmailValue !== email && editUserEmailValue !== '') || (editUserLocationValue !== location && editUserLocationValue !== '')) {
      this.refreshData()
    }
  }

  handleCancelEditProfile = () => {
    this.setState({
      editUserNameValue: '',
      editUserEmailValue: '',
      editUserLocationValue: ''
    })
  }

  onUserNameChange = (e) => {
    this.setState({
      editUserNameValue: e.target.value
    })
  }

  onUserEmailChange = (e) => {
    this.setState({
      editUserEmailValue: e.target.value
    })
  }

  onUserLocationChange = (e) => {
    this.setState({
      editUserLocationValue: e.target.value
    })
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
      case 'Profile':
        renderedContent = (
          <Profile
            userInfo={this.props.getUserInfo.user}
            editName={this.state.editUserNameValue}
            editEmail={this.state.editUserEmailValue}
            editLocation={this.state.editUserLocationValue}
            handleEditProfile={this.handleEditProfile}
            handleCancelEditProfile={this.handleCancelEditProfile}
            onUserNameChange={this.onUserNameChange}
            onUserEmailChange={this.onUserEmailChange}
            onUserLocationChange={this.onUserLocationChange}
          />
        )
    }
    if (this.props.getUserInfo.loading) return <LoadingIndicator />
    return (
      <Wrapper>
        <DashNav
          userInfo={this.props.getUserInfo.user}
          updateShowSection={this.updateShowSection}
        />
        <div className='content'>
          {renderedContent}
        </div>
        <ToastContainer />
      </Wrapper>
    )
  }
}

const withUserQuery = graphql(
  userQuery, {
    options: /* istanbul ignore next */
      (props) => ({
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

const withEditUserName = graphql(
  editUserName, {
    name: 'editUserName'
  }
)

const withEditUserEmail = graphql(
  editUserEmail, {
    name: 'editUserEmail'
  }
)

const withEditUserLocation = graphql(
  editUserLocation, {
    name: 'editUserLocation'
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
  withRemoveBookFromLibrary,
  withEditUserName,
  withEditUserEmail,
  withEditUserLocation
)(Dashboard)
