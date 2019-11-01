import camelcaseObject from "camelcase-object";

import { LinkedEventsEventDetails } from "../../types/types";

export const normalizeEvent = (event: LinkedEventsEventDetails) => {
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
      ? event.inLanguage.map(item => ({ internalId: item["@id"] }))
      : [],
    internalContext: event["@context"],
    internalId: event["@id"],
    internalType: event["@type"],
    keywords: event.keywords
      ? event.keywords.map(item => ({ internalId: item["@id"] }))
      : [],
    location: {
      internalId: event.location ? event.location["@id"] : null
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
  linkedEventsEventDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.linkedEventsAPI.getEventDetails(id);
    return normalizeEvent(camelcaseObject(data));
  }
};

export default { Query };
