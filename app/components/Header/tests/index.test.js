import React from 'react'
import { shallow } from 'enzyme'

import Header from '../index'

describe('<Header />', () => {
  it('should render a styled header called Wrapper', () => {
    const renderedComponent = shallow(
      <Header />
    )
    expect(renderedComponent.find('Wrapper').length).toEqual(1)
  })

  it('should render 3 Links', () => {
    const renderedComponent = shallow(
      <Header />
    )
    expect(renderedComponent.find('Link').length).toEqual(3)
  })

  describe('toggleNav', () => {
    it('should toggle state of expanded from false to true', () => {
      const renderedComponent = shallow(
        <Header />
      )
      expect(renderedComponent.state('expanded')).toBe(false)
      renderedComponent.instance().toggleNav()
      expect(renderedComponent.state('expanded')).toBe(true)
    })

    it('should toggle state of expanded from true to false', () => {
      const renderedComponent = shallow(
        <Header />
      )
      expect(renderedComponent.state('expanded')).toBe(false)
      renderedComponent.setState({ expanded: true })
      expect(renderedComponent.state('expanded')).toBe(true)
      renderedComponent.instance().toggleNav()
      expect(renderedComponent.state('expanded')).toBe(false)
    })
  })

  describe('handleKeyDown', () => {
    it('should toggle expanded to false if escape key is pressed and expanded is true', () => {
      const renderedComponent = shallow(
        <Header />
      )
      renderedComponent.setState({ expanded: true })
      expect(renderedComponent.state('expanded')).toBe(true)
      renderedComponent.instance().handleKeyDown({ keyCode: 27 })
      expect(renderedComponent.state('expanded')).toBe(false)
    })

    it('should not toggle expanded to false if key pressed is not escape', () => {
      const renderedComponent = shallow(
        <Header />
      )
      expect(renderedComponent.state('expanded')).toBe(false)
      renderedComponent.instance().handleKeyDown({ keyCode: 26 })
      expect(renderedComponent.state('expanded')).toBe(false)
    })

    it('should not toggle expanded to false if escape key is pressed and expanded is false', () => {
      const renderedComponent = shallow(
        <Header />
      )
      expect(renderedComponent.state('expanded')).toBe(false)
      renderedComponent.instance().handleKeyDown({ keyCode: 27 })
      expect(renderedComponent.state('expanded')).toBe(false)
    })
  })

  describe('setExpandedFalse', () => {
    it('should set expanded to false if true', () => {
      const renderedComponent = shallow(
        <Header />
      )
      renderedComponent.setState({ expanded: true })
      expect(renderedComponent.state('expanded')).toBe(true)
      renderedComponent.instance().setExpandedFalse()
      expect(renderedComponent.state('expanded')).toBe(false)
    })

    it('should not set expanded to false if already false', () => {
      const renderedComponent = shallow(
        <Header />
      )
      expect(renderedComponent.state('expanded')).toBe(false)
      renderedComponent.instance().setExpandedFalse()
      expect(renderedComponent.state('expanded')).toBe(false)
    })
  })
})
