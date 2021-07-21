import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";

const startServer = async () => {
  await createConnection(); // 1
  const schema = await buildSchema({ // 2
    ...we are using this part in the next section
  });
  const app = Express(); //3
  const apolloServer = new ApolloServer({ schema }); //4
  
  apolloServer.applyMiddleware({ app }); // 5

  app.listen(4000, () => {
    console.log('server started');
  });
};

startServer();
