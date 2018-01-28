import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import TranslatedText from 'components/TranslatedText'
import { HomePage, mapDispatchToProps } from '../index'
import { changeText, increment, decrement } from '../actions'
import { loadTranslation } from '../../App/actions'

describe('<HomePage />', () => {
  it('should render the page', () => {
    const tree = renderer.create(
      <HomePage />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the translated text', () => {
    const renderedComponent = shallow(
      <HomePage loading error={false} translation={''} />
    )
    expect(renderedComponent.contains(<TranslatedText loading error={false} translation={''} />)).toEqual(true)
  })

  it('should render fetch the translation on mount if text exists', () => {
    const submitSpy = jest.fn()
    mount(
      <HomePage
        text='Not Empty'
        onChangeText={() => {}}
        onSubmitForm={submitSpy}
      />
    )
    expect(submitSpy).toHaveBeenCalled()
  })

  describe('mapDispatchToProps', () => {
    describe('onChangeText', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onChangeText).toBeDefined()
      })

      it('should dispatch changeText when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        const text = 'we will translate this'
        result.onChangeText({ target: { value: text } })
        expect(dispatch).toHaveBeenCalledWith(changeText(text))
      })
    })

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onSubmitForm).toBeDefined()
      })

      it('should dispatch loadTranslation when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onSubmitForm()
        expect(dispatch).toHaveBeenCalledWith(loadTranslation())
      })

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn()
        const result = mapDispatchToProps(() => {})
        const evt = { preventDefault }
        result.onSubmitForm(evt)
        expect(preventDefault).toHaveBeenCalledWith()
      })
    })

    describe('onIncrement', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onIncrement).toBeDefined()
      })

      it('should dispatch increment when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onIncrement()
        expect(dispatch).toHaveBeenCalledWith(increment())
      })
    })

    describe('onDecrement', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onDecrement).toBeDefined()
      })

      it('should dispatch decrement when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onDecrement()
        expect(dispatch).toHaveBeenCalledWith(decrement())
      })
    })
  })
})
