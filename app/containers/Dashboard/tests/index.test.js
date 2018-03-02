import React from 'react'
import { shallow, mount } from 'enzyme'

import { Dashboard } from '../index'

describe('<Dashboard />', () => {
  it('should render Dashboard', () => {
    const props = {
      dashboard: {
        userId: 'test|12345'
      },
      getUserInfo: {
        loading: false,
        user: {
          booksInLibrary: [],
          booksUserRequested: [],
          booksOtherRequested: []
        }
      }
    }
    const renderedComponent = shallow(
      <Dashboard {...props} />
    )
    expect(renderedComponent.length).toEqual(1)
  })

  it('should render LoadingIndicator component if loaidng user data', () => {
    const props = {
      dashboard: {
        userId: 'test|12345'
      },
      getUserInfo: {
        loading: true,
        user: {
          booksInLibrary: [],
          booksUserRequested: [],
          booksOtherRequested: []
        }
      }
    }
    const renderedComponent = shallow(
      <Dashboard {...props} />
    )
    expect(renderedComponent.find('LoadingIndicator').length).toEqual(1)
  })

  it('should render component based on showSection state', () => {
    const props = {
      dashboard: {
        userId: 'test|12345'
      },
      getUserInfo: {
        loading: false,
        user: {
          userId: 'teest|12345',
          booksInLibrary: [],
          booksUserRequested: [],
          booksOtherRequested: []
        }
      }
    }
    const renderedComponent = shallow(
      <Dashboard {...props} />
    )

    expect(renderedComponent.find('MyBooks').length).toEqual(1)
    renderedComponent.setState({
      showSection: 'AddBook'
    })
    expect(renderedComponent.find('AddBook').length).toEqual(1)
    renderedComponent.setState({
      showSection: 'UserRequested'
    })
    expect(renderedComponent.find('UserRequested').length).toEqual(1)
    renderedComponent.setState({
      showSection: 'OtherRequested'
    })
    expect(renderedComponent.find('OtherRequested').length).toEqual(1)
    renderedComponent.setState({
      showSection: 'Profile'
    })
    expect(renderedComponent.find('Profile').length).toEqual(1)
  })

  describe('updateShowSection', () => {
    it('should update state for showSection', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = 'AddBooks'

      expect(renderedComponent.state().showSection).toEqual('MyBooks')

      renderedComponent.instance().updateShowSection(fixture)
      expect(renderedComponent.state().showSection).toEqual(fixture)
    })
  })

  describe('onBookSearchTitleChange', () => {
    it('should update state for searchTitle', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        target: {
          value: 'title here'
        }
      }

      expect(renderedComponent.state().searchTitle).toEqual('')

      renderedComponent.instance().onBookSearchTitleChange(fixture)
      expect(renderedComponent.state().searchTitle).toEqual(fixture.target.value)
    })
  })

  describe('refreshData', () => {
    it('should call refetch from getUserInfo prop', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      renderedComponent.instance().refreshData()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleAddBook', () => {
    it('should call addBookToLibrary with correct prop data', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        addBookToLibrary: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        bookId: 'book1234',
        title: 'Title',
        authors: ['John Smith'],
        description: 'A book. It is a book',
        coverImg: 'test.jpg'
      }

      await renderedComponent.instance().handleAddBook(fixture)
      expect(props.addBookToLibrary).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleBookSearch', () => {
    it('should call searchForNewBook with correct prop data', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        searchForNewBook: jest.fn(() => ({ data: { searchForNewBook: ['book'] } }))
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )
      renderedComponent.setState({ searchTitle: 'test' })

      const fixture = {
        preventDefault: jest.fn()
      }

      await renderedComponent.instance().handleBookSearch(fixture)
      expect(props.searchForNewBook).toHaveBeenCalled()
    })
  })

  describe('handleCancelRequest', () => {
    it('should call cancelRequestBook with correct prop data', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        cancelRequestBook: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        book: {
          bookId: 'book123'
        },
        owner: {
          userId: 'own123'
        }
      }

      await renderedComponent.instance().handleCancelRequest(fixture)
      expect(props.cancelRequestBook).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleDenyRequest', () => {
    it('should call cancelRequestBook with correct prop data', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        cancelRequestBook: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        book: {
          bookId: 'book123'
        },
        requester: {
          userId: 'req123'
        }
      }

      await renderedComponent.instance().handleDenyRequest(fixture)
      expect(props.cancelRequestBook).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleAcceptRequest', () => {
    it('should call acceptRequest with correct prop data', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        acceptRequest: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        book: {
          bookId: 'book123'
        },
        requester: {
          userId: 'req123'
        }
      }

      await renderedComponent.instance().handleAcceptRequest(fixture)
      expect(props.acceptRequest).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleRemoveBookFromLibrary', () => {
    it('should call removeBookFromLibrary with correct prop data', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        removeBookFromLibrary: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = { bookId: 'book132' }

      renderedComponent.instance().handleRemoveBookFromLibrary(fixture)
      expect(props.removeBookFromLibrary).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleEditProfile', () => {
    it('should do nothing if user has not changed email or location', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            name: 'John Smith',
            email: 'test@me.com',
            location: 'Austin, TX',
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        editUserName: jest.fn(),
        editUserEmail: jest.fn(),
        editUserLocation: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      await renderedComponent.instance().handleEditProfile()
      expect(props.editUserName).not.toHaveBeenCalled()
      expect(props.editUserEmail).not.toHaveBeenCalled()
      expect(props.editUserLocation).not.toHaveBeenCalled()
      expect(props.getUserInfo.refetch).not.toHaveBeenCalled()
    })

    it('should call editUserName if user has changed name', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            name: 'John Smith',
            email: 'test@me.com',
            location: 'Austin, TX',
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        editUserName: jest.fn(),
        editUserEmail: jest.fn(),
        editUserLocation: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      renderedComponent.setState({
        editUserNameValue: 'Johnny Smith'
      })

      await renderedComponent.instance().handleEditProfile()
      expect(props.editUserName).toHaveBeenCalled()
      expect(props.editUserEmail).not.toHaveBeenCalled()
      expect(props.editUserLocation).not.toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })

    it('should call editUserEmail if user has changed email', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            name: 'John Smith',
            email: 'test@me.com',
            location: 'Austin, TX',
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        editUserName: jest.fn(),
        editUserEmail: jest.fn(),
        editUserLocation: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      renderedComponent.setState({
        editUserEmailValue: 'not@me.com'
      })

      await renderedComponent.instance().handleEditProfile()
      expect(props.editUserName).not.toHaveBeenCalled()
      expect(props.editUserEmail).toHaveBeenCalled()
      expect(props.editUserLocation).not.toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })

    it('should call editUserLocation if user has changed email', async () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            name: 'John Smith',
            email: 'test@me.com',
            location: 'Austin, TX',
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        },
        editUserName: jest.fn(),
        editUserEmail: jest.fn(),
        editUserLocation: jest.fn()
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      renderedComponent.setState({
        editUserLocationValue: 'Dallas, TX'
      })

      await renderedComponent.instance().handleEditProfile()
      expect(props.editUserName).not.toHaveBeenCalled()
      expect(props.editUserEmail).not.toHaveBeenCalled()
      expect(props.editUserLocation).toHaveBeenCalled()
      expect(props.getUserInfo.refetch).toHaveBeenCalled()
    })
  })

  describe('handleCancelEditProfile', () => {
    it('should reset state for editUserEmailValue and editUserLocationValue', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      expect(renderedComponent.state().editUserEmailValue).toEqual('')
      expect(renderedComponent.state().editUserLocationValue).toEqual('')

      renderedComponent.setState({
        editUserEmailValue: 'test@me.com',
        editUserLocationValue: 'Austin, TX'
      })

      expect(renderedComponent.state().editUserEmailValue).toEqual('test@me.com')
      expect(renderedComponent.state().editUserLocationValue).toEqual('Austin, TX')

      renderedComponent.instance().handleCancelEditProfile()
      expect(renderedComponent.state().editUserEmailValue).toEqual('')
      expect(renderedComponent.state().editUserLocationValue).toEqual('')
    })
  })

  describe('onUserNameChange', () => {
    it('should update state for editUserNameValue', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        target: {
          value: 'Johnny Smith'
        }
      }

      expect(renderedComponent.state().editUserNameValue).toEqual('')

      renderedComponent.instance().onUserNameChange(fixture)
      expect(renderedComponent.state().editUserNameValue).toEqual(fixture.target.value)
    })
  })

  describe('onUserEmailChange', () => {
    it('should update state for editUserEmailValue', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        target: {
          value: 'test@me.com'
        }
      }

      expect(renderedComponent.state().editUserEmailValue).toEqual('')

      renderedComponent.instance().onUserEmailChange(fixture)
      expect(renderedComponent.state().editUserEmailValue).toEqual(fixture.target.value)
    })
  })

  describe('onUserLocationChange', () => {
    it('should update state for editUserLocationValue', () => {
      const props = {
        dashboard: {
          userId: 'test|12345'
        },
        getUserInfo: {
          loading: false,
          user: {
            booksInLibrary: [],
            booksUserRequested: [],
            booksOtherRequested: []
          },
          refetch: jest.fn()
        }
      }
      const renderedComponent = mount(
        <Dashboard {...props} />
      )

      const fixture = {
        target: {
          value: 'Austin, TX'
        }
      }

      expect(renderedComponent.state().editUserLocationValue).toEqual('')

      renderedComponent.instance().onUserLocationChange(fixture)
      expect(renderedComponent.state().editUserLocationValue).toEqual(fixture.target.value)
    })
  })
})
