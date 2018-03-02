import React from 'react'
import { shallow } from 'enzyme'

import { BrowseBooks, mapDispatchToProps } from '../index'
import { loginRequest } from 'auth/actions'

describe('<BrowseBooks />', () => {
  it('should render BrowseBooks', () => {
    const props = {
      login: jest.fn(),
      isAuthenticated: false,
      getBooks: {
        loading: false,
        books: []
      }
    }
    const renderedComponent = shallow(
      <BrowseBooks {...props} />
    )
    expect(renderedComponent.length).toEqual(1)
  })

  it('should render LoadingIndicator component if loading book data', () => {
    const props = {
      login: jest.fn(),
      isAuthenticated: false,
      getBooks: {
        loading: true,
        books: []
      }
    }
    const renderedComponent = shallow(
      <BrowseBooks {...props} />
    )
    expect(renderedComponent.find('LoadingIndicator').length).toEqual(1)
  })

  describe('handleFilterBooks', () => {
    it.skip('should filter books based on search', () => {
      expect(true).toEqual(false)
    })
  })

  describe('onFilterTitleChange', () => {
    it('should update sate for filterTitle', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        }
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      const fixture = {
        target: {
          value: 'title here'
        }
      }

      expect(renderedComponent.state().filterTitle).toEqual('')

      renderedComponent.instance().onFilterTitleChange(fixture)
      expect(renderedComponent.state().filterTitle).toEqual(fixture.target.value)
    })
  })

  describe('handleRequestBook', () => {
    it.skip('should request book from owner', () => {
      expect(true).toEqual(false)
    })
  })

  describe('handleRedirectToLogin', () => {
    it('should call props.login action', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        }
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      renderedComponent.instance().handleRedirectToLogin()
      expect(props.login).toHaveBeenCalled()
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
