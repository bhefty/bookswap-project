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

import { loginFailure, setSession } from 'auth/actions'

export function CallbackPage (props) {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    props.auth.handleAuthentication()
      .then(result => {
        const authResult = {
          accessToken: result.accessToken,
          idToken: result.idToken,
          expiresIn: result.expiresIn
        }
        console.log('LOGINS COUNT:', result.loginsCount)
        props.session(authResult)
      })
      .catch(err => props.failure(err))
  } else {
    props.failure('Invalid tokens, redirecting to homepage')
  }
  return (
    <div>
      <LoadingIndicator />
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  failure: (err) => dispatch(loginFailure(err)),
  session: (authResult) => dispatch(setSession(authResult))
})

const withConnect = connect(null, mapDispatchToProps)

export default compose(
  withRouter,
  withConnect
)(CallbackPage)
