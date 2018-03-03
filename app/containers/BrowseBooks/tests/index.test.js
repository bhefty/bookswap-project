import React from 'react'
import { shallow, mount } from 'enzyme'

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

  it('should redirect if user is not logged in', () => {
    const props = {
      login: jest.fn(),
      isAuthenticated: false,
      getBooks: {
        loading: false,
        books: [{
          bookId: 'book1234',
          title: 'Title',
          authors: ['Jimmy'],
          description: 'Book duh',
          coverImg: 'test.jpg',
          owners: [{
            userId: 'test|0987',
            name: 'Bill'
          }]
        }, {
          bookId: 'book0987',
          title: 'Title Here',
          authors: ['Joe'],
          description: 'Another book',
          coverImg: 'test2.jpg',
          owners: [{
            userId: 'not|me',
            name: 'John'
          }]
        }]
      }
    }
    const renderedComponent = mount(
      <BrowseBooks {...props} />
    )
    renderedComponent.find('.btn-blue').first().simulate('click')
    expect(props.login).toHaveBeenCalled()
  })

  it('should render action buttons with appropriate text if not logged in', () => {
    const props = {
      login: jest.fn(),
      isAuthenticated: false,
      getBooks: {
        loading: false,
        books: [{
          bookId: 'book1234',
          title: 'Title',
          authors: ['Jimmy'],
          description: 'Book duh',
          coverImg: 'test.jpg',
          owners: [{
            userId: 'test|0987',
            name: 'Bill'
          }]
        }, {
          bookId: 'book0987',
          title: 'Title Here',
          authors: ['Joe'],
          description: 'Another book',
          coverImg: 'test2.jpg',
          owners: [{
            userId: 'not|me',
            name: 'John'
          }]
        }]
      }
    }
    const renderedComponent = mount(
      <BrowseBooks {...props} />
    )
    expect(renderedComponent.find('.btn-blue').first().text()).toEqual('Login to Request')
  })

  it('should render action buttons with appropriate text if logged in', () => {
    const props = {
      login: jest.fn(),
      isAuthenticated: true,
      getBooks: {
        loading: false,
        books: [{
          bookId: 'book1234',
          title: 'Title',
          authors: ['Jimmy'],
          description: 'Book duh',
          coverImg: 'test.jpg',
          owners: [{
            userId: 'test|0987',
            name: 'Bill'
          }]
        }, {
          bookId: 'book0987',
          title: 'Title Here',
          authors: ['Joe'],
          description: 'Another book',
          coverImg: 'test2.jpg',
          owners: [{
            userId: 'not|me',
            name: 'John'
          }]
        }]
      }
    }
    const renderedComponent = mount(
      <BrowseBooks {...props} />
    )
    expect(renderedComponent.find('.btn-blue').first().text()).toEqual('Request Book')
  })

  describe('handleFilterBooks', () => {
    it('should return all books with no filter', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: false,
          books: [{
            bookId: 'book1234',
            title: 'Title',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }, {
            bookId: 'book0987',
            title: 'Title Here',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }]
        },
        userInfo: {
          userId: 'test|0987'
        },
        handleHideMyBooks: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      const fixture = {
        preventDefault: jest.fn()
      }

      expect(renderedComponent.state().filteredBookResults).toEqual([])
      renderedComponent.instance().handleFilterBooks(fixture)
      expect(renderedComponent.state().filteredBookResults).toEqual(props.getBooks.books)
    })

    it('should filter books based on search', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: false,
          books: [{
            bookId: 'book1234',
            title: 'Title',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }, {
            bookId: 'book0987',
            title: 'Title Here',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }, {
            bookId: 'book1653',
            title: 'The Hobbit',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }]
        },
        userInfo: {
          userId: 'test|0987'
        },
        handleHideMyBooks: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      const fixture = {
        preventDefault: jest.fn()
      }

      expect(renderedComponent.state().filteredBookResults).toEqual([])
      renderedComponent.setState({ filterTitle: 'hobbit' })
      renderedComponent.instance().handleFilterBooks(fixture)
      expect(renderedComponent.state().filteredBookResults[0]).toEqual(props.getBooks.books[2])
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
    it('should request book from owner', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        },
        userInfo: {
          userId: 'test|0987'
        },
        requestBook: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      renderedComponent.setState({
        selectedBook: {
          bookId: 'book5432',
          title: 'Title'
        }
      })

      const fixture = {
        userId: 'test|1234',
        name: 'John Smith'
      }

      renderedComponent.instance().handleRequestBook(fixture)
      expect(props.requestBook).toHaveBeenCalled()
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

  describe('handleHideMyBooks', () => {
    it('should filter based on filteredBookResults if > 0', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: false,
          books: [{
            bookId: 'book1234',
            title: 'Title',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }, {
            bookId: 'book0987',
            title: 'Title Here',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }, {
            bookId: 'book1653',
            title: 'The Hobbit',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }, {
            bookId: 'book0000',
            title: 'The Hobbit: There and Back Again',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }]
        },
        userInfo: {
          userId: 'test|0987'
        },
        handleHideMyBooks: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )
      renderedComponent.setState({
        filteredBookResults: [{
          bookId: 'book0987',
          title: 'Title Here',
          owners: [{
            userId: 'not|me',
            name: 'John'
          }]
        }, {
          bookId: 'book1653',
          title: 'The Hobbit',
          owners: [{
            userId: 'not|me',
            name: 'John'
          }]
        }, {
          bookId: 'book0000',
          title: 'The Hobbit: There and Back Again',
          owners: [{
            userId: 'test|0987',
            name: 'Bill'
          }]
        }]
      })

      renderedComponent.find('.filter-owned-books').simulate('change', { target: { checked: true } })

      const expectedResult = [{
        bookId: 'book0987',
        title: 'Title Here',
        owners: [{
          userId: 'not|me',
          name: 'John'
        }]
      }, {
        bookId: 'book1653',
        title: 'The Hobbit',
        owners: [{
          userId: 'not|me',
          name: 'John'
        }]
      }]

      expect(renderedComponent.state().filteredBookResultsWithHidden).toEqual(expectedResult)
    })

    it('should change state of filteredBookResultsWithHidden if check', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: false,
          books: [{
            bookId: 'book1234',
            title: 'Title',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }, {
            bookId: 'book0987',
            title: 'Title Here',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }]
        },
        userInfo: {
          userId: 'test|0987'
        },
        handleHideMyBooks: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      renderedComponent.find('.filter-owned-books').simulate('change', { target: { checked: true } })
      const expectedResult = [{
        bookId: 'book0987',
        title: 'Title Here',
        owners: [{
          userId: 'not|me',
          name: 'John'
        }]
      }]

      expect(renderedComponent.state().filteredBookResultsWithHidden).toEqual(expectedResult)
    })

    it('should change state of filteredBookResultsWithHidden if uncheck', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: false,
          books: [{
            bookId: 'book1234',
            title: 'Title',
            owners: [{
              userId: 'test|0987',
              name: 'Bill'
            }]
          }, {
            bookId: 'book0987',
            title: 'Title Here',
            owners: [{
              userId: 'not|me',
              name: 'John'
            }]
          }]
        },
        userInfo: {
          userId: 'test|0987'
        },
        handleHideMyBooks: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      renderedComponent.find('.filter-owned-books').simulate('change', { target: { checked: false } })
      const expectedResult = []

      expect(renderedComponent.state().filteredBookResultsWithHidden).toEqual(expectedResult)
    })
  })

  describe('openModal', () => {
    it('should change state of modalIsOpen', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        },
        userInfo: {
          userId: 'test|0987'
        },
        openModal: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      expect(renderedComponent.state().modalIsOpen).toEqual(false)
      renderedComponent.instance().openModal()
      expect(renderedComponent.state().modalIsOpen).toEqual(true)
    })
  })

  describe('closeModal', () => {
    it('should change state of modalIsOpen', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        },
        userInfo: {
          userId: 'test|0987'
        },
        closeModal: jest.fn()
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )
      renderedComponent.setState({ modalIsOpen: true })

      expect(renderedComponent.state().modalIsOpen).toEqual(true)
      renderedComponent.instance().closeModal()
      expect(renderedComponent.state().modalIsOpen).toEqual(false)
    })
  })

  describe('handleRequestFrom', () => {
    it('should change state of selectedBookOwners and selectedBook', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        },
        userInfo: {
          userId: 'test|0987'
        }
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      const fixture = {
        bookId: 'book1234',
        title: 'Book Title',
        owners: [{
          userId: 'test|1234',
          name: 'Bill'
        }]
      }

      expect(renderedComponent.state().selectedBookOwners).toEqual([])
      expect(renderedComponent.state().selectedBook).toEqual(null)

      renderedComponent.instance().handleRequestFrom(fixture)

      expect(renderedComponent.state().selectedBookOwners).toEqual(fixture.owners)
      expect(renderedComponent.state().selectedBook).toEqual(fixture)
    })

    it('should call openModal', () => {
      const props = {
        login: jest.fn(),
        isAuthenticated: false,
        getBooks: {
          loading: true,
          books: []
        },
        userInfo: {
          userId: 'test|0987'
        }
      }
      const renderedComponent = shallow(
        <BrowseBooks {...props} />
      )

      const fixture = {
        bookId: 'book1234',
        title: 'Book Title',
        owners: [{
          userId: 'test|1234',
          name: 'Bill'
        }]
      }

      const mockOpenModal = jest.spyOn(renderedComponent.instance(), 'handleRequestFrom')

      renderedComponent.instance().handleRequestFrom(fixture)

      expect(mockOpenModal).toHaveBeenCalled()
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
