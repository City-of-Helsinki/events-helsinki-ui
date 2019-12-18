import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";

import EventAPI from "./datasources/event";
import OrganizationAPI from "./datasources/organization";
import schema from "./schema";

dotenv.config();

const dataSources = () => ({
  eventAPI: new EventAPI(),
  organizationAPI: new OrganizationAPI()
});

(async () => {
  const server = new ApolloServer({
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
    dataSources,
    debug:
      process.env.GRAPHQL_PROXY_DEBUG === "debug" ||
      process.env.GRAPHQL_PROXY_ENV !== "production",
    engine: {
      apiKey: process.env.GRAPHQL_PROXY_ENGINE_API_KEY
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

  const port = process.env.GRAPHQL_PROXY_PORT || 4000;

  app.listen({ port }, () =>
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
})();
