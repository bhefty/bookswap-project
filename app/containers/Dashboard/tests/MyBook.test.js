import React from 'react'
import { shallow } from 'enzyme'

import MyBooks from '../MyBooks'
import BookCard from 'components/BookCard'

describe('<MyBooks />', () => {
  it('should render message for no books in library if empty', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleRemoveBookFromLibrary: jest.fn()
    }
    const renderedComponent = shallow(
      <MyBooks {...props} />
    )
    expect(renderedComponent.find('.content-library-empty').length).toEqual(1)
  })

  it('should render BookCard component if booksInLibrary > 0', () => {
    const props = {
      userInfo: {
        booksInLibrary: [{
          bookId: 'abc134',
          title: 'Test Title',
          authors: ['Bill'],
          coverImg: 'test.jpg'
        }]
      },
      handleRemoveBookFromLibrary: jest.fn()
    }
    const renderedComponent = shallow(
      <MyBooks {...props} />
    )
    expect(renderedComponent.find(BookCard).length).toEqual(1)
  })
})
