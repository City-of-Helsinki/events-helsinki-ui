import { makeExecutableSchema } from "apollo-server";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

export default schema;
