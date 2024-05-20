const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    users: async () =>{
      return User.find();
    },

    me: async(parent, args, context)=>{
      // PROBLEM is HERE when trying to get context
      console.log("In get me: " );
      if (context.user){
        console.log("In get me, for user: " + context.user.username);
        return User.findOne({username: context.user.username})
      }
      throw AuthenticationError;
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
      const user = User.create({ username, email, password });
      const token = signToken(user);
      return {token, user}
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { username, bookId, title, description, authors, image }) => {
      return User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: { savedBooks: {bookId, title, description, authors,image} },
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
        { $pull: { savedBooks: {bookId: bookId} } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
