import React from 'react'
import { shallow, mount } from 'enzyme'

import Profile from '../Profile'

describe('<Profile />', () => {
  it('should render', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = shallow(
      <Profile {...props} />
    )
    expect(renderedComponent.length).toEqual(1)
  })

  it('should render email input placeholder with user.email', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = shallow(
      <Profile {...props} />
    )
    expect(renderedComponent.find('#profile-input-email').props().placeholder).toEqual(props.userInfo.email)
  })

  it('should render email input placeholder with message if user.email is null', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: null,
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = shallow(
      <Profile {...props} />
    )
    expect(renderedComponent.find('#profile-input-email').props().placeholder).toEqual('Please enter an email address')
  })

  it('should render location input placeholder with user.location', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = shallow(
      <Profile {...props} />
    )
    expect(renderedComponent.find('#profile-input-location').props().placeholder).toEqual(props.userInfo.location)
  })

  it('should render location input placeholder with message if user.location is null', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: null
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = shallow(
      <Profile {...props} />
    )
    expect(renderedComponent.find('#profile-input-location').props().placeholder).toEqual('Please enter a location: City, State')
  })

  it('should call the handleCancelEditProfile function when clicked', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = mount(
      <Profile {...props} />
    )

    renderedComponent.find('#profile-cancel').simulate('click')
    expect(props.handleCancelEditProfile.mock.calls.length).toEqual(1)
  })

  it('should call handleEditProfile when clicked', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = mount(
      <Profile {...props} />
    )

    renderedComponent.find('#profile-save').simulate('click')
    expect(props.handleEditProfile.mock.calls.length).toEqual(1)
  })

  it('should handle onUserEmailChange', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = mount(
      <Profile {...props} />
    )

    renderedComponent.find('#profile-input-email').simulate('change')
    expect(props.onUserEmailChange.mock.calls.length).toEqual(1)
  })

  it('should handle onUserLocationChange', () => {
    const props = {
      userInfo: {
        userId: 'test|12345',
        name: 'John Smith',
        email: 'test@me.com',
        location: 'Austin, TX'
      },
      editEmail: '',
      editLocation: '',
      handleEditProfile: jest.fn(),
      handleCancelEditProfile: jest.fn(),
      onUserEmailChange: jest.fn(),
      onUserLocationChange: jest.fn()
    }
    const renderedComponent = mount(
      <Profile {...props} />
    )

    renderedComponent.find('#profile-input-location').simulate('change')
    expect(props.onUserLocationChange.mock.calls.length).toEqual(1)
  })
})
