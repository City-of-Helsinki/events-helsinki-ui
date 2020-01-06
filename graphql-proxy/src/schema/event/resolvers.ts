import normalizeKeys from "../../utils/normalizeKeys";

const eventDetailsQueryBuilder = () => {
  // Get details of all needed fields
  return "?include=in_language,keywords,location";
};

const eventListQueryBuilder = (
  categories: string[],
  endDate: string,
  page: number,
  pageSize: number,
  publisher: string,
  startDate: string
) => {
  // Get details of all needed fields
  let query = "?include=keywords,location";

  if (categories && categories.length) {
    query = query.concat("&keyword=", categories.join(","));
  }
  if (endDate) {
    query = query.concat("&end=", endDate);
  }
  if (page) {
    query = query.concat("&page=", page.toString());
  }
  if (pageSize) {
    query = query.concat("&page_size=", pageSize.toString());
  }
  if (publisher) {
    query = query.concat("&publisher=", publisher);
  }
  if (startDate) {
    query = query.concat("&start=", startDate);
  }

  return query;
};

const Query = {
  eventDetails: async (_, { id }, { dataSources }) => {
    const query = eventDetailsQueryBuilder();
    const data = await dataSources.eventAPI.getEventDetails(id, query);

    return normalizeKeys(data);
  },

  eventList: async (
    _,
    { categories, endDate, page, pageSize, publisher, startDate },
    { dataSources }
  ) => {
    const query = eventListQueryBuilder(
      categories,
      endDate,
      page,
      pageSize,
      publisher,
      startDate
    );
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
