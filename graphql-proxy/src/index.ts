import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";

import DummyAPI from "./datasources/dummy";
import schema from "./schema";

dotenv.config();

const dataSources = () => ({
  dummyAPI: new DummyAPI()
});

(async () => {
  const server = new ApolloServer({
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
    dataSources,
    debug: process.env.DEBUG === "debug" || process.env.ENV !== "production",
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    formatError: err => {
      return err;
    },
    schema,

    validationRules: [depthLimit(10)]
  });
  const app = express();

  app.use(cors());

  server.applyMiddleware({ app, path: "/proxy/graphql" });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
