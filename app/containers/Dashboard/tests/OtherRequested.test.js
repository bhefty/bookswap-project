import React from 'react'
import { shallow, mount } from 'enzyme'

import OtherRequested from '../OtherRequested'
import BookCard from 'components/BookCard'

describe('<OtherRequested />', () => {
  it('should render message for no books in array if empty', () => {
    const props = {
      userInfo: {
        booksOtherRequested: []
      },
      handleAcceptRequest: jest.fn(),
      handleDenyRequest: jest.fn()
    }
    const renderedComponent = shallow(
      <OtherRequested {...props} />
    )
    expect(renderedComponent.find('.content-library-empty').length).toEqual(1)
  })

  it('should render BookCard component if booksOtherRequested > 0', () => {
    const props = {
      userInfo: {
        booksOtherRequested: [{
          book: {
            bookId: 'abc134',
            title: 'Test Title',
            authors: ['Bill'],
            coverImg: 'test.jpg'
          }
        }]
      },
      handleAcceptRequest: jest.fn(),
      handleDenyRequest: jest.fn()
    }
    const renderedComponent = shallow(
      <OtherRequested {...props} />
    )
    expect(renderedComponent.find(BookCard).length).toEqual(1)
  })

  it('should call the handleAction function when clicked', () => {
    const props = {
      userInfo: {
        booksOtherRequested: [{
          book: {
            bookId: 'abc134',
            title: 'Test Title',
            authors: ['Bill'],
            coverImg: 'test.jpg'
          }
        }]
      },
      handleAcceptRequest: jest.fn(),
      handleDenyRequest: jest.fn()
    }
    const renderedComponent = mount(
      <OtherRequested {...props} />
    )

    renderedComponent.find('.btn-blue').simulate('click')
    expect(props.handleAcceptRequest.mock.calls.length).toEqual(1)

    renderedComponent.find('.btn-red').simulate('click')
    expect(props.handleDenyRequest.mock.calls.length).toEqual(1)
  })
})
