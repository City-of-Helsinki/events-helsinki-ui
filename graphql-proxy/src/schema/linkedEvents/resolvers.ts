import { EventDetails } from "../../types/types";
import objectToCamelCase from "../../utils/objectToCamelCase";

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

export const normalizeEvent = (event: EventDetails) => {
  // Rename keys starting with @ to has internal prefix (e.g. @id => internalId)
  return {
    ...event,
    audience: event.audience
      ? event.audience.map(item => ({ internalId: item["@id"] }))
      : [],
    images: event.images
      ? event.images.map(item => ({
          ...item,
          internalContext: item["@context"],
          internalId: item["@id"],
          internalType: item["@type"]
        }))
      : [],
    inLanguage: event.inLanguage
      ? event.inLanguage.map(item => ({
          ...item,
          internalContext: item["@context"],
          internalId: item["@id"],
          internalType: item["@type"]
        }))
      : [],
    internalContext: event["@context"],
    internalId: event["@id"],
    internalType: event["@type"],
    keywords: event.keywords
      ? event.keywords.map(item => ({
          ...item,
          internalContext: item["@context"],
          internalId: item["@id"],
          internalType: item["@type"]
        }))
      : [],
    location: {
      ...event.location,
      internalContext: event.location ? event.location["@context"] : null,
      internalId: event.location ? event.location["@id"] : null,
      internalType: event.location ? event.location["@type"] : null
    },
    subEvents: event.subEvents
      ? event.subEvents.map(item => ({ internalId: item["@id"] }))
      : [],
    superEvent: {
      internalId: event.superEvent ? event.superEvent["@id"] : null
    }
  };
};

const Query = {
  eventDetails: async (_, { id }, { dataSources }) => {
    const query = eventDetailsQueryBuilder();
    const data = await dataSources.linkedEventsAPI.getEventDetails(id, query);

    return normalizeEvent(objectToCamelCase(data));
  },

  eventList: async (_, { page, pageSize }, { dataSources }) => {
    const query = eventListQueryBuilder(page, pageSize);
    const data = await dataSources.linkedEventsAPI.getEventList(query);

    return {
      data: data.data.map(event => normalizeEvent(objectToCamelCase(event))),
      meta: data.meta
    };
  }
};

export default { Query };
