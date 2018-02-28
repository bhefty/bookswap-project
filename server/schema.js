const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const filter = require('lodash').filter
const includes = require('lodash').includes
const fetch = require('node-fetch')

const User = require('./models/user')
const Book = require('./models/book')

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
    user(userId: String): User
    books: [Book] @cacheControl(maxAge: 240)
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

    searchForNewBook (
      searchTitle: String!
    ): [Book]

    addBookToLibrary (
      userId: String!
      bookId: String!
      title: String!
      authors: [String!]
      description: String!
      coverImg: String!
    ): User

    removeBookFromLibrary (
      userId: String!
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
    user: (_, { userId }) => User.findOne({ userId }),
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
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=${process.env.GOOGLE_BOOKS_API_KEY}`)
      const data = await response.json()
      const dataImg = data.items[0].volumeInfo.imageLinks.thumbnail
      const newBook = {
        bookId: data.items[0].id,
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors,
        description: data.items[0].volumeInfo.description,
        coverImg: dataImg.substring(0, dataImg.indexOf('&zoom'))
      }
      return Book.create(newBook)
    },
    searchForNewBook: async (_, { searchTitle }) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=${process.env.GOOGLE_BOOKS_API_KEY}`)
      const data = await response.json()

      return data.items.map((book) => {
        const bookImg = book.volumeInfo.imageLinks.thumbnail
        return {
          bookId: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || 'Author Unavailable',
          description: book.volumeInfo.description || 'No description available',
          coverImg: bookImg.substring(0, bookImg.indexOf('&zoom'))
        }
      })
    },
    addBookToLibrary: async (_, { userId, bookId, title, authors, description, coverImg }) => {
      const newBook = {
        bookId,
        title,
        authors,
        description,
        coverImg
      }

      const user = await User.findOne({ userId })
      const userHasBook = includes(user.booksInLibrary, newBook.bookId)
      if (userHasBook) {
        throw new Error(`Requester already has book in library with id ${newBook.bookId}`)
      }

      // Adds book to collection if it does not already exist
      const creatingBook = Book.create(newBook)
      const updatingUser = User.findOneAndUpdate({ userId }, {
        $push: { booksInLibrary: newBook.bookId }
      }, { new: true })

      Promise.all([creatingBook, updatingUser])
        .then((result) => {
          return result[1]
        })
    },
    removeBookFromLibrary: (_, { userId, bookId }) => User.findOneAndUpdate({ userId }, {
      $pull: { booksInLibrary: bookId }
    }),
    requestBook: (_, { requesterId, ownerId, bookId }) => {
      const findRequester = User.findOne({ userId: requesterId })
      const findOwner = User.findOne({ userId: ownerId })
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
          return User.findOneAndUpdate({ userId: owner.userId }, {
            $pull: { booksInLibrary: bookId },
            $push: { booksOtherRequested: { bookId, requesterId } }
          }, { new: true })
            .then(() => {
              // Add Book to user's requested list
              return User.findOneAndUpdate({ userId: requester.userId }, {
                $push: { booksUserRequested: { bookId, ownerId } }
              }, { new: true })
            })
        })
    },
    cancelRequestBook: (_, { requesterId, ownerId, bookId }) => {
      const findRequester = User.findOne({ userId: requesterId })
      const findOwner = User.findOne({ userId: ownerId })
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
          return User.findOneAndUpdate({ userId: owner.userId }, {
            $push: { booksInLibrary: bookId },
            $pull: { booksOtherRequested: { bookId: bookId, requesterId: requesterId } }
          }, { new: true })
            .then(() => {
              // Remove book from user's requested list
              return User.findOneAndUpdate({ userId: requester.userId }, {
                $pull: { booksUserRequested: { bookId: bookId, ownerId: ownerId } }
              }, { new: true })
            })
        })
    },
    acceptRequest: (_, { requesterId, ownerId, bookId }) => {
      const findRequester = User.findOne({ userId: requesterId })
      const findOwner = User.findOne({ userId: ownerId })
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

          // Remove book from requester's user request list and add it to their library
          return User.findOneAndUpdate({ userId: requester.userId }, {
            $pull: { booksUserRequested: { bookId: bookId, ownerId: ownerId } },
            $push: { booksInLibrary: bookId }
          }, { new: true })
            .then(() => {
              // Remove book from owner's requested from other's list
              return User.findOneAndUpdate({ userId: owner.userId }, {
                $pull: { booksOtherRequested: { bookId: bookId, requesterId: requesterId } }
              }, { new: true })
            })
        })
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
      const owner = User.findOne({ userId: item.ownerId })
      return { book, owner }
    }),
    booksOtherRequested: (user) => user.booksOtherRequested.map(item => {
      const book = Book.findOne({ bookId: item.bookId }, (err, book) => {
        if (err) throw new Error(`Could not find book with bookId ${item.bookId}`)
        return book
      })
      const requester = User.findOne({ userId: item.requesterId })
      return { book, requester }
    })
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
