/**
*
* TranslatedText
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import LoadingIndicator from 'components/LoadingIndicator'

function TranslatedText ({ loading, error, translation }) {
  if (loading) {
    return <LoadingIndicator />
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <p>Something went wrong, please try again!</p>
    )
    return <ErrorComponent />
  }

  if (translation !== false) {
    return <div className='card fluid'><div className='section darker'>{translation}</div></div>
  }

  return null
}

TranslatedText.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  translation: PropTypes.any
}

export default TranslatedText
