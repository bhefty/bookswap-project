import React from 'react'
import { shallow } from 'enzyme'

import RequestFromModal from '../index'

describe('<RequestFromModal />', () => {
  it('should render Modal', () => {
    const props = {
      isOpen: true,
      onRequestClose: jest.fn(),
      onSelectOwner: jest.fn(),
      bookOwners: [{
        userId: 'test|12345',
        name: 'John Smith'
      }]
    }
    const renderedComponent = shallow(<RequestFromModal {...props} />)
    expect(renderedComponent.find('Modal').length).toEqual(1)
  })

  it('should call onSelectOwner when button is clicked', () => {
    const props = {
      isOpen: true,
      onRequestClose: jest.fn(),
      onSelectOwner: jest.fn(),
      bookOwners: [{
        userId: 'test|12345',
        name: 'John Smith'
      }]
    }
    const renderedComponent = shallow(<RequestFromModal {...props} />)
    renderedComponent.find('.button-owner').simulate('click')
    expect(props.onSelectOwner).toHaveBeenCalled()
  })
})
