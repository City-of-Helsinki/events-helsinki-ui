import { EventDetails } from "../../types/types";
import objectToCamelCase from "../../utils/objectToCamelCase";

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
    const data = await dataSources.linkedEventsAPI.getEventDetails(id);
    return normalizeEvent(objectToCamelCase(data));
  }
};

export default { Query };
