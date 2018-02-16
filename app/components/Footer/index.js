import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import SocialStrip from 'components/SocialStrip'
import A from 'components/A'
import Wrapper from './Wrapper'

export class Footer extends PureComponent {
  render () {
    if (this.props.location.pathname === '/') return null
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

export default compose(
  withRouter
)(Footer)
