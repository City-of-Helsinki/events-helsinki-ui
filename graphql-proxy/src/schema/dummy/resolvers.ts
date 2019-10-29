const Query = {
  items: async (_, {}, { dataSources }) => {
    return dataSources.dummyAPI.getAllItems();
  }
};

export default { Query };
