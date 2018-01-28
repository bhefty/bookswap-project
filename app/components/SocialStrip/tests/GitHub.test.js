import React from 'react'
import { shallow } from 'enzyme'

import GitHub from '../GitHub'

describe('<GitHub />', () => {
  it('should contain <a> tag', () => {
    const renderedComponent = shallow(<GitHub />)
    expect(renderedComponent.find('a').length).toBe(1)
  })

  it('should contain <svg> element', () => {
    const renderedComponent = shallow(<GitHub />)
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
