// Only shows when user visits a url that doesn't have a route
import React from 'react'

import Wrapper from './Wrapper'

const openBrace = `{`
const closeBrace = `}`

export default function NotFoundPage () {
  return (
    <Wrapper>
      <div className='container'>
        <span className='four04-comment'>// ERROR: 404 page not found</span><br />
        <span className='four04-if'>if</span> (<span className='four04-not'>!</span><span className='four04-condition'><em>found</em></span>) {openBrace}<br />
        <span className='four04-exception'>&nbsp;&nbsp;throw</span> (<span className='four04-flip'>"(╯°□°)╯︵ ┻━┻"</span>);
        <br />{closeBrace}
      </div>
    </Wrapper>
  )
}
