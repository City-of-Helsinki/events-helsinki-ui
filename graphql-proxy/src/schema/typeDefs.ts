import event from "./event/typeDefs";
import global from "./global/typeDefs";
import organization from "./organization/typeDefs";

const typeDefs = [...global, event, organization];

export default typeDefs;
