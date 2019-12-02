import global from "./global/typeDefs";
import linkedCourses from "./linkedCourses/typeDefs";
import linkedEvents from "./linkedEvents/typeDefs";

const typeDefs = [...global, linkedCourses, linkedEvents];

export default typeDefs;
