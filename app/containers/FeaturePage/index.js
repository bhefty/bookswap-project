/*
 *
 * FeaturePage
 *
 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import H1 from 'components/H1'
import H3 from 'components/H3'

const Wrapper = styled.div`
  p {
    margin-left: 1.5em;
  }
`

export class FeaturePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <Wrapper>
        <Helmet
          title='FeaturePage'
          meta={[
            { name: 'description', content: 'Description of FeaturePage' }
          ]}
        />
        <H1>Features</H1>
        <hr />
        <H3>Quick scaffolding</H3>
        <p>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</p>
        <H3>Hot reloading</H3>
        <p>Saved changes to styling and JS code will instantly reload in the browser without needing a page refresh.</p>
        <H3>Predictable state management</H3>
        <p>Unidirectional data flow (Redux) allows for change logging and time travel debugging.</p>
        <H3>Next-gen JavaScript</H3>
        <p>Use template strings, object destructuring, arrow functions, JSX syntax and more, right out of the box!</p>
        <H3>Next-gen CSS</H3>
        <p>Write composable CSS that's co-located with components for complete modularity.</p>
        <H3>Industry-standard routing</H3>
        <p>Routing makes it easy to add additional pages to the application (`/about`).</p>
        <H3>Offline-first</H3>
        <p>Make your web pages available without a network connection the instant a user loads the page.</p>
        <H3>SEO</H3>
        <p>Support for SEO (document head tags management) for search engines that support indexing JavaScript content (Google).</p>
      </Wrapper>
    )
  }
}

export default FeaturePage
