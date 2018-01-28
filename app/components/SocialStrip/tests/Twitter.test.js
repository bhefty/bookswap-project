import React from 'react'
import { shallow } from 'enzyme'

import Twitter from '../Twitter'

describe('<Twitter />', () => {
  it('should contain <a> tag', () => {
    const renderedComponent = shallow(<Twitter />)
    expect(renderedComponent.find('a').length).toBe(1)
  })

  it('should contain <svg> element', () => {
    const renderedComponent = shallow(<Twitter />)
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
