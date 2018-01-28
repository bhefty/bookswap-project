import React from 'react'
import renderer from 'react-test-renderer'

import NotFoundPage from '../index'

describe('<NotFoundPage />', () => {
  it('should render the page', () => {
    const tree = renderer.create(
      <NotFoundPage />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
