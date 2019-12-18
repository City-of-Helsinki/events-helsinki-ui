import merge from "lodash/merge";

import event from "./event/resolvers";
import organization from "./organization/resolvers";

const resolvers = merge(event, organization);

export default resolvers;
