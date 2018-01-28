import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'

import { makeSelectTranslation, makeSelectLoading, makeSelectError } from 'containers/App/selectors'
import H1 from 'components/H1'
import H2 from 'components/H2'
import Button from 'components/Button'
import TranslatedText from 'components/TranslatedText'
import CenteredSection from './CenteredSection'
import Form from './Form'
import Input from './Input'
import Section from './Section'
import { loadTranslation } from '../App/actions'
import { increment, decrement, changeText } from './actions'
import { makeSelectCount, makeSelectText } from './selectors'

export class HomePage extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    translation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    onSubmitForm: PropTypes.func,
    text: PropTypes.string,
    onChangeText: PropTypes.func
  }

  // When initial state text is not null, submit the form to load translation
  componentDidMount = () => {
    if (this.props.text && this.props.text.trim().length > 0) {
      this.props.onSubmitForm()
    }
  }

  render () {
    const { loading, error, translation } = this.props
    const translationListProps = {
      loading,
      error,
      translation
    }

    return (
      <article>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' }
          ]}
        />
        <div>
          <CenteredSection>
            <H1>Start your project right away!</H1>
            <p>A highly scalable, offline-first foundation based on the popular react-boilerplate.</p>
          </CenteredSection>
          <Section>
            <H2>Try me! Redux Saga API Call</H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor='text'>
                Enter some text to see it translated into Yoda-Speak:
                <br />
                <Input
                  id='text'
                  type='text'
                  placeholder='You can use this boilerplate to get started right away!'
                  value={this.props.text}
                  onChange={this.props.onChangeText}
                />
              </label>
            </Form>
            <TranslatedText {...translationListProps} />
          </Section>
        </div>
        <div>
          <H2>Simple counter using Redux actions</H2>
          Current counter value: {this.props.count}
          <div>
            <Button onClick={this.props.onIncrement}>Increment</Button>
            <Button onClick={this.props.onDecrement}>Decrement</Button>
          </div>
        </div>
      </article>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  translation: makeSelectTranslation(),
  text: makeSelectText(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  count: makeSelectCount()
})

export function mapDispatchToProps (dispatch) {
  return {
    onChangeText: (evt) => dispatch(changeText(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault()
      dispatch(loadTranslation())
    },
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement())
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'home', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage)
