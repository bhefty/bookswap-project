import React from 'react'
import { shallow } from 'enzyme'

import DashNav from '../index'

describe('<DashNav />', () => {
  it('should render component', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        booksInLibrary: [],
        booksUserRequested: [],
        booksOtherRequested: []
      },
      updateShowSection: jest.fn()
    }
    const renderedComponent = shallow(
      <DashNav {...props} />
    )
    expect(renderedComponent.length).toEqual(1)
  })

  it('should toggle state of expanded', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        booksInLibrary: [],
        booksUserRequested: [],
        booksOtherRequested: []
      },
      updateShowSection: jest.fn()
    }
    const renderedComponent = shallow(
      <DashNav {...props} />
    )

    expect(renderedComponent.state().expanded).toEqual(false)
    renderedComponent.instance().toggleNav()
    expect(renderedComponent.state().expanded).toEqual(true)
  })

  it('should handle updateShowSection function', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
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

    renderedComponent.find('#sidebar-btn-profile').simulate('click')
    expect(props.updateShowSection.mock.calls.length).toEqual(5)
    expect(props.updateShowSection).toHaveBeenCalledWith('Profile')
  })
})
