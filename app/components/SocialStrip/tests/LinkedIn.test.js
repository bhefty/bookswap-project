import React from 'react'
import { shallow } from 'enzyme'

import LinkedIn from '../LinkedIn'

describe('<LinkedIn />', () => {
  it('should contain <a> tag', () => {
    const renderedComponent = shallow(<LinkedIn />)
    expect(renderedComponent.find('a').length).toBe(1)
  })

  it('should contain <svg> element', () => {
    const renderedComponent = shallow(<LinkedIn />)
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
