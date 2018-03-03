import React from 'react'
import { shallow } from 'enzyme'

import AddBook from '../AddBook'
import SearchForm from 'components/SearchForm'

describe('<AddBook />', () => {
  it('should render SearchForm', () => {
    const props = {
      handleBookSearch: jest.fn(),
      onBookSearchTitleChange: jest.fn(),
      handleAddBook: jest.fn(),
      searchTitle: '',
      searchResults: []
    }
    const renderedComponent = shallow(
      <AddBook {...props} />
    )
    expect(renderedComponent.find(SearchForm).length).toEqual(1)
  })
})
