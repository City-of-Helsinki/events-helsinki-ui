import normalizeKeys from "../../utils/normalizeKeys";

const eventDetailsQueryBuilder = () => {
  // Get details of all needed fields
  return "?include=in_language,keywords,location";
};

const eventListQueryBuilder = (
  page: number,
  pageSize: number,
  publisher: string
) => {
  // Get details of all needed fields
  let query = "?include=keywords,location";

  if (page) {
    query = query.concat("&page=", page.toString());
  }
  if (pageSize) {
    query = query.concat("&page_size=", pageSize.toString());
  }
  if (publisher) {
    query = query.concat("&publisher=", publisher);
  }

  return query;
};

const Query = {
  eventDetails: async (_, { id }, { dataSources }) => {
    const query = eventDetailsQueryBuilder();
    const data = await dataSources.eventAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },

  eventList: async (_, { page, pageSize, publisher }, { dataSources }) => {
    const query = eventListQueryBuilder(page, pageSize, publisher);
    const data = await dataSources.eventAPI.getEventList(query);

    return {
      data: data.data.map(event => {
        return normalizeKeys(event);
      }),
      meta: data.meta
    };
  }
};

export default { Query };
