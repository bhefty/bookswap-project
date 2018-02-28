import React from 'react'
import { shallow, mount } from 'enzyme'

import UserRequested from '../UserRequested'
import BookCard from 'components/BookCard'

describe('<UserRequested />', () => {
  it('should render message for no books in array if empty', () => {
    const props = {
      userInfo: {
        booksUserRequested: []
      },
      handleCancelRequest: jest.fn()
    }
    const renderedComponent = shallow(
      <UserRequested {...props} />
    )
    expect(renderedComponent.find('.content-library-empty').length).toEqual(1)
  })

  it('should render BookCard component if booksUserRequested > 0', () => {
    const props = {
      userInfo: {
        booksUserRequested: [{
          book: {
            bookId: 'abc134',
            title: 'Test Title',
            authors: ['Bill'],
            coverImg: 'test.jpg'
          }
        }]
      },
      handleCancelRequest: jest.fn()
    }
    const renderedComponent = shallow(
      <UserRequested {...props} />
    )
    expect(renderedComponent.find(BookCard).length).toEqual(1)
  })

  it('should call the handleAction function when clicked', () => {
    const props = {
      userInfo: {
        booksUserRequested: [{
          book: {
            bookId: 'abc134',
            title: 'Test Title',
            authors: ['Bill'],
            coverImg: 'test.jpg'
          }
        }]
      },
      handleCancelRequest: jest.fn()
    }
    const renderedComponent = mount(
      <UserRequested {...props} />
    )

    renderedComponent.find('.btn-red').simulate('click')
    expect(props.handleCancelRequest.mock.calls.length).toEqual(1)
  })
})
