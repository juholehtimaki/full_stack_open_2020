const { ApolloServer, UserInputError, gql, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const pubsub = new PubSub();

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("useFindAndModify", false);

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    favoriteGenre: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    addAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const result = await Book.find({});
      return result.length;
    },
    authorCount: async () => {
      const result = await Author.find({});
      return result.length;
    },
    allBooks: async (root, args) => {
      if (!args.genre) {
        const result = await Book.find({}).populate("author");
        return result;
      }
      const result = await Book.find({}).populate("author");
      let filteredBooks = [];
      for (let book of result) {
        if (book.genres.includes(args.genre))
          filteredBooks = filteredBooks.concat(book);
      }
      return filteredBooks;
    },
    allAuthors: async () => {
      const result = await Author.find({});
      return result;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("adding a new book");
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.author });
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      });

      try {
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    addAuthor: async (root, args) => {
      console.log("adding new author");
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    editAuthor: (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        const result = Author.findOneAndUpdate(
          { name: args.name },
          { born: args.born }
        );
        return result;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: (root, args) => {
      console.log(args);
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
        favoriteGenre: user.favoriteGenre,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id });
      return result.length;
    },
  },
  Book: {
    author: (root) => {
      return { name: root.author.name, born: root.author.born };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
