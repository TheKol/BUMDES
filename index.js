import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
import path from 'path';
require('dotenv').config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(express.static('public'));
  app.use(cors());
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Graphql server running at http://localhost:4000/graphql`);
}

async function webServer() {
  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(express.static(path.join(__dirname, '/build')));
  app.use(cors());

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

  await new Promise((r) => app.listen({ port: 8080 }, r));

  console.log(`🚀 Web server running at http://localhost:8080`);
}

startServer();
webServer();
