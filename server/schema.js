const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const find = require('lodash').find
const filter = require('lodash').filter
const includes = require('lodash').includes
const pull = require('lodash').pull

const users = [
  {
    id: 1,
    firstName: 'First',
    lastName: 'Coleman',
    email: 'abc@example.com',
    booksInLibrary: [1, 4, 7],
    booksUserRequested: [],
    booksOtherRequested: []
  }, {
    id: 2,
    firstName: 'Second',
    lastName: 'Smith',
    email: 'def@example.com',
    booksInLibrary: [3, 8],
    booksUserRequested: [],
    booksOtherRequested: []
  }, {
    id: 3,
    firstName: 'Third',
    lastName: 'Knight',
    email: 'ghi@example.com',
    booksInLibrary: [6, 2, 10, 5],
    booksUserRequested: [],
    booksOtherRequested: []
  }
]

const books = [
  { id: 1, title: 'Book 1', author: 'Author 1', coverImg: 'cover1.jpg' },
  { id: 2, title: 'Book 2', author: 'Author 2', coverImg: 'cover2.jpg' },
  { id: 3, title: 'Book 3', author: 'Author 3', coverImg: 'cover3.jpg' },
  { id: 4, title: 'Book 4', author: 'Author 4', coverImg: 'cover4.jpg' },
  { id: 5, title: 'Book 5', author: 'Author 5', coverImg: 'cover5.jpg' },
  { id: 6, title: 'Book 6', author: 'Author 6', coverImg: 'cover6.jpg' },
  { id: 7, title: 'Book 7', author: 'Author 7', coverImg: 'cover7.jpg' },
  { id: 8, title: 'Book 8', author: 'Author 8', coverImg: 'cover8.jpg' },
  { id: 9, title: 'Book 9', author: 'Author 9', coverImg: 'cover9.jpg' },
  { id: 10, title: 'Book 10', author: 'Author 10', coverImg: 'cover10.jpg' }
]

const typeDefs = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    """
    The list of Books this user has in their library
    """
    booksInLibrary: [Book]
    """
    The list of Books this user has requested to trade
    """
    booksUserRequested: [UserRequestedBook]
    """
    The list of Books another user has requested from this user
    """
    booksOtherRequested: [OtherRequestedBook]
  }

  type UserRequestedBook {
    book: Book
    owner: User
  }

  type OtherRequestedBook {
    book: Book
    requester: User
  }

  type Book {
    id: Int!
    title: String
    author: String
    coverImg: String
  }

  type Query {
    user(id: Int!): User
    books: [Book]
  }

  type Mutation {
    requestBook (
      requesterId: Int!
      ownerId: Int!
      bookId: Int!
    ): User

    cancelRequestBook (
      requesterId: Int!
      ownerId: Int!
      bookId: Int!
    ): User

    acceptRequest (
      requesterId: Int!
      ownerId: Int!
      bookId: Int!
    ): User
  }
`

const resolvers = {
  Query: {
    user: (_, { id }) => find(users, { id: id }),
    books: (_, { id }) => find(books, { id: id })
  },
  Mutation: {
    requestBook: (_, { requesterId, ownerId, bookId }) => {
      const requester = find(users, { id: requesterId })
      const owner = find(users, { id: ownerId })
      const book = find(books, { id: bookId })
      const requesterHasBook = includes(requester.booksInLibrary, bookId)
      const requesterAlreadyAsked = filter(requester.booksUserRequested, (item) => {
        return item.bookId === bookId && item.ownerId === ownerId
      }).length !== 0

      if (!requester) {
        throw new Error(`Couldn't find the requesting user with id ${requester}`)
      }
      if (!owner) {
        throw new Error(`Couldn't find the owner user with id ${owner}`)
      }
      if (!book) {
        throw new Error(`Couldn't find the book with id ${bookId}`)
      }
      if (requesterHasBook) {
        throw new Error(`Requester already has book in library with id ${bookId}`)
      }
      if (requesterAlreadyAsked) {
        throw new Error(`Requester already has already requested book with id ${bookId} from owner with id ${ownerId}`)
      }

      // Add Book to user's requested list
      requester.booksUserRequested.push({
        bookId,
        ownerId
      })

      // Remove book from owner's library and add it to the owner's books that have been requested
      owner.booksInLibrary = pull(owner.booksInLibrary, bookId)
      owner.booksOtherRequested.push({
        bookId,
        requesterId
      })

      return requester
    },
    cancelRequestBook: (_, { requesterId, ownerId, bookId }) => {
      const requester = find(users, { id: requesterId })
      const owner = find(users, { id: ownerId })
      const book = find(books, { id: bookId })

      if (!requester) {
        throw new Error(`Couldn't find the requesting user with id ${requester}`)
      }
      if (!owner) {
        throw new Error(`Couldn't find the owner user with id ${owner}`)
      }
      if (!book) {
        throw new Error(`Couldn't find the book with id ${bookId}`)
      }

      // Remove book from user's requested list
      requester.booksUserRequested = filter(requester.booksUserRequested, (item) => item.bookId !== bookId && item.ownerId !== ownerId)

      // Add book back into owner's library and remove book owner's requested from other's list
      owner.booksInLibrary.push(bookId)
      owner.booksOtherRequested = filter(owner.booksOtherRequested, (item) => item.bookId !== bookId && item.ownerId !== ownerId)

      return requester
    },
    acceptRequest: (_, { requesterId, ownerId, bookId }) => {
      const requester = find(users, { id: requesterId })
      const owner = find(users, { id: ownerId })
      const book = find(books, { id: bookId })

      if (!requester) {
        throw new Error(`Couldn't find the requesting user with id ${requester}`)
      }
      if (!owner) {
        throw new Error(`Couldn't find the owner user with id ${owner}`)
      }
      if (!book) {
        throw new Error(`Couldn't find the book with id ${bookId}`)
      }

      // Remove book from owner's requested from other's list
      owner.booksOtherRequested = filter(owner.booksOtherRequested, (item) => item.bookId !== bookId && item.ownerId !== ownerId)

      // Remove book from requester's user request list and add it to their library
      requester.booksUserRequested = filter(requester.booksUserRequested, (item) => item.bookId !== bookId && item.ownerId !== ownerId)
      requester.booksInLibrary.push(bookId)

      return owner
    }
  },
  User: {
    booksInLibrary: (user) => filter(books, (book) => {
      return includes(user.booksInLibrary, book.id)
    }),
    booksUserRequested: (user) => {
      return user.booksUserRequested.map(item => {
        const book = find(books, { id: item.bookId })
        const owner = find(users, { id: item.ownerId })
        return { book, owner }
      })
    },
    booksOtherRequested: (user) => {
      return user.booksOtherRequested.map(item => {
        const book = find(books, { id: item.bookId })
        const requester = find(users, { id: item.requesterId })
        return { book, requester }
      })
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
