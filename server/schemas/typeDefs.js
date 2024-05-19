const typeDefs = `
  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }
  
  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    title: String!
  }


 
  # Important for useQuery: We define our Query type to inform our entry points
  # The Query type is built-in to GraphQL, so we only need to extend it to include which kinds of information we plan to request in our application
  type Query {
    users: [User]!
    # Important for Query Variables: The profile query field allows us to fetch the specific Profile data by using the profileId argument and providing a non-null ID value as the argument value
    user(username: String!): User
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    saveBook(username: String!, bookId: String!, title: String, description: String, authors: [String], image: String): User
    addUser(username: String!, email: String!, password:String!): User
    removeBook(username: String!, bookId: String!): User
  }
`;

module.exports = typeDefs;
