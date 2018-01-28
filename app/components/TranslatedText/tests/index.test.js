import React from 'react'
import { shallow, mount } from 'enzyme'

import TranslatedText from '../index'
import LoadingIndicator from 'components/LoadingIndicator'

describe('<TranslatedText />', () => {
  it('should render the loading indicator when it is loading', () => {
    const renderedComponent = shallow(
      <TranslatedText loading />
    )
    expect(renderedComponent.contains(<LoadingIndicator />)).toEqual(true)
  })

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <TranslatedText
        loading={false}
        error={{ message: 'Loading failed!' }}
      />
    )
    expect(renderedComponent.text()).toMatch(/Something went wrong/)
  })

  it('should render the translation if loading was successful', () => {
    const translation = 'Translated this, we have.'
    const renderedComponent = shallow(
      <TranslatedText
        translation={translation}
        error={false}
      />
    )
    expect(renderedComponent.contains(<div className='card fluid'><div className='section darker'>{translation}</div></div>)).toEqual(true)
  })

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <TranslatedText
        translation={false}
        error={false}
        loading={false}
      />
    )
    expect(renderedComponent.html()).toEqual(null)
  })
})
