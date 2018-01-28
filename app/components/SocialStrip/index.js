/**
*
* SocialStrip
*
*/

import React from 'react'

import Wrapper from './Wrapper'
import GitHub from './GitHub'
import Twitter from './Twitter'
import LinkedIn from './LinkedIn'
import Email from './Email'

function SocialStrip () {
  return (
    <Wrapper>
      <GitHub />
      <Twitter />
      <LinkedIn />
      <Email />
    </Wrapper>
  )
}

export default SocialStrip
