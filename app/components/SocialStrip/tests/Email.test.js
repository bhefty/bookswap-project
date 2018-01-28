import React from 'react'
import { shallow } from 'enzyme'

import Email from '../Email'

describe('<Email />', () => {
  it('should contain <a> tag', () => {
    const renderedComponent = shallow(<Email />)
    expect(renderedComponent.find('a').length).toBe(1)
  })

  it('should contain <svg> element', () => {
    const renderedComponent = shallow(<Email />)
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
