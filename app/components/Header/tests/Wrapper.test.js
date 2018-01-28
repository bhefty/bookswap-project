import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Wrapper from '../Wrapper'

describe('<Wrapper />', () => {
  it('should render an <header> tag', () => {
    const renderedComponent = shallow(<Wrapper />)
    expect(renderedComponent.type()).toEqual('header')
  })

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Wrapper />)
    expect(renderedComponent.prop('className')).toBeDefined()
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const renderedComponent = shallow(<Wrapper id={id} />)
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Wrapper attribute={'test'} />)
    expect(renderedComponent.prop('attribute')).toBeUndefined()
  })

  it('should render with a height of 48px if props.expanded is false', () => {
    const renderedComponent = shallow(<Wrapper expanded={false} />)
    expect(renderedComponent).toHaveStyleRule('height', '48px')
  })

  it('should render with a height of 100% if props.expanded is false', () => {
    const renderedComponent = shallow(<Wrapper expanded />)
    expect(renderedComponent).toHaveStyleRule('height', '100%')
  })
})
