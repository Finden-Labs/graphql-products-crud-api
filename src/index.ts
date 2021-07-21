import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { ProductResolver } from './resolvers/ProductResolver';

const startServer = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [ProductResolver]
  });
  const app = Express();
  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started');
  });
};

startServer();
