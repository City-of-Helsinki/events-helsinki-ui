import normalizeKeys from "../../utils/normalizeKeys";

const eventDetailsQueryBuilder = () => {
  // Get details of all needed fields
  return "?include=in_language,keywords,location";
};

const eventListQueryBuilder = (page: number, pageSize: number) => {
  // Get details of all needed fields
  let query = "?include=keywords,location";

  if (page) {
    query = query.concat("&page=", page.toString());
  }
  if (pageSize) {
    query = query.concat("&page_size=", pageSize.toString());
  }

  return query;
};

const Query = {
  eventDetails: async (_, { id }, { dataSources }) => {
    const query = eventDetailsQueryBuilder();
    const data = await dataSources.linkedEventsAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },

  eventList: async (_, { page, pageSize }, { dataSources }) => {
    const query = eventListQueryBuilder(page, pageSize);
    const data = await dataSources.linkedEventsAPI.getEventList(query);

    return {
      data: data.data.map(event => {
        return normalizeKeys(event);
      }),
      meta: data.meta
    };
  }
};

export default { Query };
