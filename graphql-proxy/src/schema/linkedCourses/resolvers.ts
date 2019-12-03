import camelCase from "camelcase-object";

import { normalizeEvent } from "../linkedEvents/resolvers";

const Query = {
  linkedCoursesEventDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.linkedCoursesAPI.getEventDetails(id);

    return normalizeEvent(camelCase(data));
  }
};

export default { Query };
