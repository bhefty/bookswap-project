import React from 'react'
import { shallow } from 'enzyme'

import A from 'components/A'
import Footer from '../index'
import SocialStrip from 'components/SocialStrip'

describe('<Footer />', () => {
  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />)
    expect(renderedComponent.contains(
      <section>
        made by <A href='https://billhefty.com/' target='_blank'>bill hefty</A> &copy; 2017
      </section>
    )).toBe(true)
  })

  it('should contain <SocialStrip />', () => {
    const renderedComponent = shallow(<Footer />)
    expect(renderedComponent.contains(<SocialStrip />)).toBe(true)
  })
})
