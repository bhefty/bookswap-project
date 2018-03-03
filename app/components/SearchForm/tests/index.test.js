import React from 'react'
import { shallow, mount } from 'enzyme'

import SearchForm from '../index'
import BookCard from 'components/BookCard'

describe('<SearchForm />', () => {
  it('should render a form', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = shallow(
      <SearchForm {...props} />
    )
    expect(renderedComponent.find('form').length).toEqual(1)
  })

  it('should render BookCard component if searchResults > 0', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = shallow(
      <SearchForm {...props} />
    )
    expect(renderedComponent.find(BookCard).length).toEqual(1)
  })

  it('should call the handlePrimaryAction function when clicked', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = mount(
      <SearchForm {...props} />
    )

    renderedComponent.find('.btn-blue').simulate('click')
    expect(props.handlePrimaryAction.mock.calls.length).toEqual(1)
  })

  it('should call the handleSecondaryAction function when clicked', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = mount(
      <SearchForm {...props} />
    )

    renderedComponent.find('.btn-red').simulate('click')
    expect(props.handleSecondaryAction.mock.calls.length).toEqual(1)
  })

  it('should handle form submit', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = mount(
      <SearchForm {...props} />
    )

    renderedComponent.find('form').simulate('submit')
    expect(props.handleSubmit.mock.calls.length).toEqual(1)
  })

  it('should handle input text onChange', () => {
    const props = {
      handleSubmit: jest.fn(),
      inputValue: '',
      inputPlaceholder: 'Placeholder',
      onInputChange: jest.fn(),
      handlePrimaryAction: jest.fn(),
      handleSecondaryAction: jest.fn(),
      searchResults: [{
        bookId: 'abc134',
        title: 'Test Title',
        authors: ['Bill'],
        coverImg: 'test.jpg'
      }],
      actionText: 'Action',
      primaryButtonClass: 'btn-blue',
      actionSecondaryText: 'Action Two',
      secondaryButtonClass: 'btn-red'
    }
    const renderedComponent = mount(
      <SearchForm {...props} />
    )

    renderedComponent.find('input').simulate('change')
    expect(props.onInputChange.mock.calls.length).toEqual(1)
  })
})
