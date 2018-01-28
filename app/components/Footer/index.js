import React, { PureComponent } from 'react'

import SocialStrip from 'components/SocialStrip'
import A from 'components/A'
import Wrapper from './Wrapper'

class Footer extends PureComponent {
  render () {
    return (
      <Wrapper>
        <section>
          made by <A href='https://billhefty.com/' target='_blank'>bill hefty</A> &copy; 2017
        </section>
        <SocialStrip />
      </Wrapper>
    )
  }
}

export default Footer
