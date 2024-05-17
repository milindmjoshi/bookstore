const { User, Book } = require('../models');

const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    users: async () =>{
      return User.find();
    },


    // Important for Query Variables: Each query resolver function can accept up to four parameters.
    // The second parameter, commonly referred to as "args," represents the variable argument values passed with the query.
    // It is always an object, and in this case, we are destructuring that object to retrieve the profileId value.
    user: async (parent, { username }) => {
      return User.findOne({ username: username });
    },
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password });
    },
    saveBook: async (parent, { username, book }) => {
      return User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: { books: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { username, bookId }) => {
      return User.findOneAndUpdate(
        { username: username },
        { $pull: { books: bookId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
