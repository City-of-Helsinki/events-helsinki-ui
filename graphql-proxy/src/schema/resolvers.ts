import merge from "lodash/merge";

import linkedEvents from "./linkedEvents/resolvers";

const resolvers = merge(linkedEvents);

export default resolvers;
