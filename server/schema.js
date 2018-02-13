const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const find = require('lodash').find
const filter = require('lodash').filter
const includes = require('lodash').includes
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const fetch = require('node-fetch')

const User = require('./models/user')
const Book = require('./models/book')

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
  { id: '1', title: 'Book 1', author: 'Author 1', coverImg: 'cover1.jpg' },
  { id: '2', title: 'Book 2', author: 'Author 2', coverImg: 'cover2.jpg' },
  { id: '3', title: 'Book 3', author: 'Author 3', coverImg: 'cover3.jpg' },
  { id: '4', title: 'Book 4', author: 'Author 4', coverImg: 'cover4.jpg' },
  { id: '5', title: 'Book 5', author: 'Author 5', coverImg: 'cover5.jpg' },
  { id: '6', title: 'Book 6', author: 'Author 6', coverImg: 'cover6.jpg' },
  { id: '7', title: 'Book 7', author: 'Author 7', coverImg: 'cover7.jpg' },
  { id: '8', title: 'Book 8', author: 'Author 8', coverImg: 'cover8.jpg' },
  { id: '9', title: 'Book 9', author: 'Author 9', coverImg: 'cover9.jpg' },
  { id: '10', title: 'Book 10', author: 'Author 10', coverImg: 'cover10.jpg' }
]

const typeDefs = `
  type User {
    _id: String!
    userId: String!
    name: String
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
    _id: String
    bookId: String
    title: String
    description: String
    authors: [String]
    coverImg: String
  }

  type Query {
    user(_id: String): User
    books: [Book]
  }

  type Mutation {
    createUser (
      userId: String!
      name: String
      email: String
    ): User

    createBook (
      searchTitle: String!
    ): Book

    removeBookFromLibrary (
      _id: String!
      bookId: String!
    ): User

    requestBook (
      requesterId: String!
      ownerId: String!
      bookId: String!
    ): User

    cancelRequestBook (
      requesterId: String!
      ownerId: String!
      bookId: String!
    ): User

    acceptRequest (
      requesterId: String!
      ownerId: String!
      bookId: String!
    ): User
  }
`

const resolvers = {
  Query: {
    user: (_, { _id }) => User.findOne(ObjectId(_id)),
    books: () => Book.find({})
  },
  Mutation: {
    createUser: (_, { userId, name, email }) => User.create({
      userId,
      name,
      email,
      booksInLibrary: [],
      booksUserRequested: [],
      booksOtherRequested: []
    }),
    createBook: async (_, { searchTitle }) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=AIzaSyC2wLZFh8W2evVxslXgaMq1_1Upf76TCAM`)
      const data = await response.json()
      const newBook = {
        bookId: data.items[0].id,
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors,
        description: data.items[0].volumeInfo.description,
        coverImg: data.items[0].volumeInfo.imageLinks.thumbnail
      }
      return Book.create(newBook)
    },
    removeBookFromLibrary: (_, { _id, bookId }) => User.findOneAndUpdate(ObjectId(_id), {
      $pull: { booksInLibrary: bookId }
    }),
    requestBook: (_, { requesterId, ownerId, bookId }) => {
      const findRequester = User.findOne({ _id: requesterId })
      const findOwner = User.findOne({ _id: ownerId })
      const findBook = Book.findOne({ bookId })

      return Promise.all([findRequester, findOwner, findBook])
        .then((result) => {
          const requester = result[0]
          const owner = result[1]
          const book = result[2]
          const requesterHasBook = includes(requester.booksInLibrary, bookId)
          const requesterAlreadyAsked = filter(requester.booksUserRequested, (item) => {
            return item.bookId === bookId && item.ownerId === ownerId
          }).length !== 0

          if (!requester) {
            throw new Error(`Couldn't find the requesting user with id ${requesterId}`)
          }
          if (!owner) {
            throw new Error(`Couldn't find the owner user with id ${ownerId}`)
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

          // // Remove book from owner's library and add it to the owner's books that have been requested
          return User.findOneAndUpdate({ _id: owner._id }, {
            $pull: { booksInLibrary: bookId },
            $push: { booksOtherRequested: { bookId, requesterId } }
          }, { new: true })
            .then(() => {
              // Add Book to user's requested list
              return User.findOneAndUpdate({ _id: requester._id }, {
                $push: { booksUserRequested: { bookId, ownerId } }
              }, { new: true })
            })
        })
    },
    cancelRequestBook: (_, { requesterId, ownerId, bookId }) => {
      const findRequester = User.findOne({ _id: requesterId })
      const findOwner = User.findOne({ _id: ownerId })
      const findBook = Book.findOne({ bookId })

      return Promise.all([findRequester, findOwner, findBook])
        .then((result) => {
          const requester = result[0]
          const owner = result[1]
          const book = result[2]

          if (!requester) {
            throw new Error(`Couldn't find the requesting user with id ${requester}`)
          }
          if (!owner) {
            throw new Error(`Couldn't find the owner user with id ${owner}`)
          }
          if (!book) {
            throw new Error(`Couldn't find the book with id ${bookId}`)
          }

          // Add book back into owner's library and remove book owner's requested from other's list
          return User.findOneAndUpdate({ _id: owner._id }, {
            $push: { booksInLibrary: bookId },
            $pull: { booksOtherRequested: { bookId: bookId, requesterId: requesterId } }
          }, { new: true })
            .then(() => {
              // Remove book from user's requested list
              return User.findOneAndUpdate({ _id: requester._id }, {
                $pull: { booksUserRequested: { bookId: bookId, ownerId: ownerId } }
              }, { new: true })
            })
        })
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
    booksInLibrary: (user) => user.booksInLibrary.map((bookId) => {
      return Book.findOne({ bookId }, (err, book) => {
        if (err) throw new Error(`Could not find book with bookId ${bookId}`)
        return book
      })
    }),
    booksUserRequested: (user) => user.booksUserRequested.map(item => {
      const book = Book.findOne({ bookId: item.bookId }, (err, book) => {
        if (err) throw new Error(`Could not find book with bookId ${item.bookId}`)
        return book
      })
      const owner = User.findOne(ObjectId(item.ownerId))
      return { book, owner }
    }),
    booksOtherRequested: (user) => user.booksOtherRequested.map(item => {
      const book = Book.findOne({ bookId: item.bookId }, (err, book) => {
        if (err) throw new Error(`Could not find book with bookId ${item.bookId}`)
        return book
      })
      const requester = User.findOne(ObjectId(item.requesterId))
      return { book, requester }
    })
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
