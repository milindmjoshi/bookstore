const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
console.log("Create Apollo server");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
console.log("Apollo server created");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



const startApolloServer = async () => {
  await server.start();
  console.log("Apollo server started");
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  
  // Important for MERN Setup: When our application runs from production, it functions slightly differently than in development
  // In development, we run two servers concurrently that work together
  // In production, our Node server runs and delivers our client-side bundle from the dist/ folder 
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  // Important for MERN Setup: Any client-side requests that begin with '/graphql' will be handled by our Apollo Server
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();