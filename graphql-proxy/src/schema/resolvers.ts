import merge from "lodash/merge";

import linkedCourses from "./linkedCourses/resolvers";
import linkedEvents from "./linkedEvents/resolvers";

const resolvers = merge(linkedCourses, linkedEvents);

export default resolvers;
