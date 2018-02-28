import React from 'react'
import { shallow, mount } from 'enzyme'

import AddBook from '../AddBook'
import BookCard from 'components/BookCard'

describe('<AddBook />', () => {
  it('should render a form', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: []
    }
    const renderedComponent = shallow(
      <AddBook {...props} />
    )
    expect(renderedComponent.find('form').length).toEqual(1)
  })

  it('should render BookCard component if searchResults > 0', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }]
    }
    const renderedComponent = shallow(
      <AddBook {...props} />
    )
    expect(renderedComponent.find(BookCard).length).toEqual(1)
  })

  it('should call the handleAction function when clicked', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }]
    }
    const renderedComponent = mount(
      <AddBook {...props} />
    )

    renderedComponent.find('.btn-green').simulate('click')
    expect(props.handleAddBook.mock.calls.length).toEqual(1)
  })

  it('should handle form submit', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }]
    }
    const renderedComponent = mount(
      <AddBook {...props} />
    )

    renderedComponent.find('form').simulate('submit')
    expect(props.handleBookSearch.mock.calls.length).toEqual(1)
  })

  it('should handle input text onChange', () => {
    const props = {
      userInfo: {
        booksInLibrary: []
      },
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }]
    }
    const renderedComponent = mount(
      <AddBook {...props} />
    )

    renderedComponent.find('input').simulate('change')
    expect(props.onBookSearchTitleChange.mock.calls.length).toEqual(1)
  })
})
