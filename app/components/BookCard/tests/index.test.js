import React from 'react'
import { shallow } from 'enzyme'

import BookCard from '../index'

describe('<BookCard />', () => {
  it('should render component', () => {
    const props = {
      book: {
        title: 'Test',
        authors: ['John Smith'],
        coverImg: 'test.jpg'
      },
      action: {
        handleAction: jest.fn(),
        actionText: 'Handle Action',
        primaryButtonClass: 'btn-red'
      }
    }
    const renderedComponent = shallow(
      <BookCard {...props} />
    )
    expect(renderedComponent.find('Wrapper').length).toEqual(1)
  })

  it('should render component with secondary actions', () => {
    const props = {
      book: {
        title: 'Test',
        authors: ['John Smith'],
        coverImg: 'test.jpg'
      },
      action: {
        handleAction: jest.fn(),
        actionText: 'Handle Action',
        primaryButtonClass: 'btn-red',
        handleAdditionalAction: jest.fn(),
        actionAdditionalText: 'Secondary Action',
        secondaryButtonClass: 'btn-blue'
      }
    }
    const renderedComponent = shallow(
      <BookCard {...props} />
    )
    expect(renderedComponent.find('button').length).toEqual(3)
    expect(renderedComponent.find('.btn-blue').length).toEqual(1)
  })

  it('should call handleAction and handleAdditionalAction for buttons', () => {
    const props = {
      book: {
        title: 'Test',
        authors: ['John Smith'],
        coverImg: 'test.jpg'
      },
      action: {
        handleAction: jest.fn(),
        actionText: 'Handle Action',
        primaryButtonClass: 'btn-red',
        handleAdditionalAction: jest.fn(),
        actionAdditionalText: 'Secondary Action',
        secondaryButtonClass: 'btn-blue'
      }
    }
    const renderedComponent = shallow(
      <BookCard {...props} />
    )
    renderedComponent.find('.btn-red').simulate('click')
    renderedComponent.find('.btn-blue').simulate('click')
    expect(props.action.handleAction.mock.calls.length).toEqual(1)
    expect(props.action.handleAdditionalAction.mock.calls.length).toEqual(1)
  })
})
