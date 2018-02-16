import React from 'react'
import { shallow, mount } from 'enzyme'

import { CallbackPage, mapDispatchToProps } from '../index'
import { loginFailure, setSession } from 'auth/actions'

describe('<CallbackPage />', () => {
  it('should render LoadingComponent', () => {
    const props = {
      auth: {
        handleAuthentication: () => jest.fn()
      },
      location: { hash: 'abc' },
      failure: () => jest.fn(),
      session: () => jest.fn()
    }
    const renderedComponent = shallow(<CallbackPage {...props} />)
    expect(renderedComponent.find('LoadingIndicator').length).toEqual(1)
  })

  it('should handle .then from handleAuthentication', () => {
    const mockAuthResult = {
      accessToken: 'abc123',
      idToken: '123abc',
      expiresIn: 7200,
      userId: 'test|12345',
      name: 'John Smith',
      email: 'jsmith@me.com',
      loginsCount: 1
    }
    const handleAuthenticationSpy = jest.fn(() => Promise.resolve(mockAuthResult))
    const sessionSpy = jest.fn()
    const createUserSpy = jest.fn()
    const props = {
      auth: {
        handleAuthentication: handleAuthenticationSpy
      },
      location: { hash: '#access_token=123bde&expires_in=7200&token_type=Bearer&state=abc&id_token=abc123' },
      failure: jest.fn(),
      session: sessionSpy,
      createUser: createUserSpy,
      userInfo: {
        userId: mockAuthResult.userId,
        name: mockAuthResult.name,
        email: mockAuthResult.email
      }
    }

    const renderedComponent = mount(<CallbackPage {...props} />) // eslint-disable-line no-unused-vars
    expect(handleAuthenticationSpy).toHaveBeenCalled()
    expect(renderedComponent.instance().props.createUser).toBeDefined()
  })

  it('should handle case where loginsCount is more than 1', () => {
    const mockAuthResult = {
      accessToken: 'abc123',
      idToken: '123abc',
      expiresIn: 7200,
      userId: 'test|12345',
      name: 'John Smith',
      email: 'jsmith@me.com',
      loginsCount: 2
    }
    const handleAuthenticationSpy = jest.fn(() => Promise.resolve(mockAuthResult))
    const sessionSpy = jest.fn()
    const createUserSpy = jest.fn((variables) => console.log('vars', variables))
    const props = {
      auth: {
        handleAuthentication: handleAuthenticationSpy
      },
      location: { hash: '#access_token=123bde&expires_in=7200&token_type=Bearer&state=abc&id_token=abc123' },
      failure: jest.fn(),
      session: sessionSpy,
      createUser: createUserSpy,
      userInfo: {
        userId: mockAuthResult.userId,
        name: mockAuthResult.name,
        email: mockAuthResult.email
      }
    }

    const renderedComponent = mount(<CallbackPage {...props} />) // eslint-disable-line no-unused-vars
    expect(handleAuthenticationSpy).toHaveBeenCalled()
    expect(renderedComponent.instance().props.createUser).toBeDefined()
    expect(createUserSpy).not.toHaveBeenCalled()
  })

  it('should catch error', () => {
    const handleAuthenticationSpy = jest.fn((forcePass) => {
      if (forcePass) return Promise.resolve('pass')
      return Promise.reject('error') // eslint-disable-line prefer-promise-reject-errors
    })
    const props = {
      auth: {
        handleAuthentication: handleAuthenticationSpy
      },
      location: { hash: '#access_token=123bde&expires_in=7200&token_type=Bearer&state=abc&id_token=abc123' },
      failure: jest.fn(),
      session: jest.fn()
    }

    const renderedComponent = mount(<CallbackPage {...props} />) // eslint-disable-line no-unused-vars
    expect(handleAuthenticationSpy).toHaveBeenCalled()
  })

  describe('mapDispatchToProps', () => {
    describe('failure', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.failure).toBeDefined()
      })

      it('shoud dispatch loginFailure when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        const error = 'Error'
        result.failure(error)
        expect(dispatch).toHaveBeenCalledWith(loginFailure(error))
      })
    })

    describe('session', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.session).toBeDefined()
      })

      it('shoud dispatch setSession when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        const authResult = {
          accessToken: '123',
          idToken: 'abc',
          expiresIn: 7200
        }
        result.session(authResult)
        expect(dispatch).toHaveBeenCalledWith(setSession(authResult))
      })
    })
  })
})
