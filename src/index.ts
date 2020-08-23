import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";

import { redis } from "./redis";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
  });

  const apolloServer = new ApolloServer({
    schema,
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
    context: ({ req }: any) => ({ req }),
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  // Should come before applyMiddleware
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      // TODO: make env variable
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
