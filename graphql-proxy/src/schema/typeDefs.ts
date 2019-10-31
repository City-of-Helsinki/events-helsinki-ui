import global from "./global/typeDefs";
import linkedEvents from "./linkedEvents/typeDefs";

const typeDefs = [...global, linkedEvents];

export default typeDefs;
