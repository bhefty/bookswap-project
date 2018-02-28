import React from 'react'
import { shallow } from 'enzyme'

import { Dashboard } from '../index'

describe('<Dashboard />', () => {
  it('should render Dashboard', () => {
    const props = {
      dashboard: {
        userId: 'test|12345'
      },
      getUserInfo: {
        loading: false,
        user: {
          booksInLibrary: [],
          booksUserRequested: [],
          booksOtherRequested: []
        }
      }
    }
    const renderedComponent = shallow(
      <Dashboard {...props} />
    )
    expect(renderedComponent.length).toEqual(1)
  })
})
