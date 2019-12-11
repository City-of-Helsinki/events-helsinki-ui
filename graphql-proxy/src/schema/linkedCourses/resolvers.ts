import normalizeKeys from "../../utils/normalizeKeys";

const Query = {
  courseDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.linkedCoursesAPI.getEventDetails(id);

    return normalizeKeys(data);
  }
};

export default { Query };
