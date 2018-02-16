/**
 *
 * CallbackPage
 *
 */

import React from 'react'
import LoadingIndicator from 'components/LoadingIndicator'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { createStructuredSelector } from 'reselect'

import { loginFailure, setSession } from 'auth/actions'
import { makeSelectAuthResult } from 'auth/selectors'

export class CallbackPage extends React.Component {
  componentWillMount () {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication()
        .then(result => {
          const authResult = {
            accessToken: result.accessToken,
            idToken: result.idToken,
            expiresIn: result.expiresIn,
            userId: result.userId,
            name: result.name,
            email: result.email
          }

          this.props.session(authResult)
          return result.loginsCount
        })
        .then(loginsCount => {
          const { userId, name, email } = this.props.userInfo
          if (loginsCount <= 1) {
            this.props.createUser({
              variables: {
                userId,
                name,
                email
              }
            })
          }
        })
        .catch(err => this.props.failure(err))
    } else {
      this.props.failure('Invalid tokens, redirecting to homepage')
    }
  }

  render () {
    return (
      <div>
        <LoadingIndicator />
      </div>
    )
  }
}

const withMutation = graphql(gql`
    mutation createUser($userId: String!, $name: String, $email: String) {
      createUser(userId: $userId, name: $name, email: $email) {
        _id
      }
    }
`, {
  name: 'createUser'
})

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectAuthResult()
})

export const mapDispatchToProps = (dispatch) => ({
  failure: (err) => dispatch(loginFailure(err)),
  session: (authResult) => dispatch(setSession(authResult))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withRouter,
  withConnect,
  withMutation
)(CallbackPage)
