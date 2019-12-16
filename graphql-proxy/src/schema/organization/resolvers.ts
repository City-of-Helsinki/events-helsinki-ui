import normalizeKeys from "../../utils/normalizeKeys";

const Query = {
  organizationDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.organizationAPI.getOrganizationDetails(id);

    return normalizeKeys(data);
  }
};

export default { Query };
