import React from 'react'
import { shallow } from 'enzyme'

import SocialStrip from '../index'
import GitHub from '../GitHub'
import Twitter from '../Twitter'
import LinkedIn from '../LinkedIn'
import Email from '../Email'

describe('<SocialStrip />', () => {
  const renderedComponent = shallow(<SocialStrip />)
  it('should contain GitHub social link', () => {
    expect(renderedComponent.contains(<GitHub />))
  })

  it('should contain Twitter social link', () => {
    expect(renderedComponent.contains(<Twitter />))
  })

  it('should contain LinkedIn social link', () => {
    expect(renderedComponent.contains(<LinkedIn />))
  })

  it('should contain Email social link', () => {
    expect(renderedComponent.contains(<Email />))
  })
})
