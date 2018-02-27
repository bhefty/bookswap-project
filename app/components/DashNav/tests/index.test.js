import React from 'react'
import { shallow } from 'enzyme'

import DashNav from '../index'

describe('<DashNav />', () => {
  it('should render component', () => {
    const props = {
      userInfo: {
        booksInLibrary: [],
        booksUserRequested: [],
        booksOtherRequested: []
      },
      updateShowSection: jest.fn()
    }
    const renderedComponent = shallow(
      <DashNav {...props} />
    )
    expect(renderedComponent.find('Wrapper').length).toEqual(1)
  })

  it('should handle updateShowSection function', () => {
    const props = {
      userInfo: {
        booksInLibrary: [],
        booksUserRequested: [],
        booksOtherRequested: []
      },
      updateShowSection: jest.fn()
    }
    const renderedComponent = shallow(
      <DashNav {...props} />
    )

    renderedComponent.find('#sidebar-btn-add-book').simulate('click')
    expect(props.updateShowSection.mock.calls.length).toEqual(1)
    expect(props.updateShowSection).toHaveBeenCalledWith('AddBook')

    renderedComponent.find('#sidebar-btn-my-books').simulate('click')
    expect(props.updateShowSection.mock.calls.length).toEqual(2)
    expect(props.updateShowSection).toHaveBeenCalledWith('MyBooks')

    renderedComponent.find('#sidebar-btn-wishlist').simulate('click')
    expect(props.updateShowSection.mock.calls.length).toEqual(3)
    expect(props.updateShowSection).toHaveBeenCalledWith('UserRequested')

    renderedComponent.find('#sidebar-btn-requests').simulate('click')
    expect(props.updateShowSection.mock.calls.length).toEqual(4)
    expect(props.updateShowSection).toHaveBeenCalledWith('OtherRequested')
  })
})
