import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'

import { HomePage, mapDispatchToProps } from '../index'
import { loginRequest } from 'auth/actions'

describe('<HomePage />', () => {
  it('should render the page', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('_handleRoute', () => {
    it('should redirect to /dashboard if user is authenticated', () => {
      const mockPush = jest.fn()
      const renderedComponent = shallow(<HomePage isAuthenticated history={{push: mockPush}} />)
      renderedComponent.instance()._handleRoute()
      expect(mockPush).toHaveBeenCalled()
    })

    it('should dispatch loginRequest when user is not authenticated', () => {
      const mockLogin = jest.fn()
      const renderedComponent = shallow(<HomePage isAuthenticated={false} login={mockLogin} />)
      renderedComponent.instance()._handleRoute()
      expect(mockLogin).toHaveBeenCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('login', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.login).toBeDefined()
      })

      it('should dispatch loginRequest when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.login()
        expect(dispatch).toHaveBeenCalledWith(loginRequest())
      })
    })
  })
})
