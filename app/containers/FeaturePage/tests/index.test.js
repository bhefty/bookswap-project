import React from 'react'
import renderer from 'react-test-renderer'

import { FeaturePage } from '../index'

describe('<FeaturePage />', () => {
  it('should render the page', () => {
    const tree = renderer.create(
      <FeaturePage />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
