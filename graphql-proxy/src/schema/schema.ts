import event from "./event/typeDefs";
import global from "./global/typeDefs";

const typeDefs = [...global, event];

export default typeDefs;
