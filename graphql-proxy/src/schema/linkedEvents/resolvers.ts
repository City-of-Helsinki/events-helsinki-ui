import { LinkedEventEventDetails } from "../../types/types";

const normalizeEvent = (event: LinkedEventEventDetails) => {
  // Rename keys starting with @ to has internal prefix (e.g. @id => internalId)
  return {
    ...event,
    images: event.images
      ? event.images.map(item => ({
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
      ? event.keywords.map(item => ({ internalId: item["@id"] }))
      : [],
    location: {
      internalId: event.location ? event.location["@id"] : null
    }
  };
};

const Query = {
  linkedEventEventDetails: async (_, { id }, { dataSources }) => {
    const data = await dataSources.linkedEventsAPI.getEventDetails(id);

    return normalizeEvent(data);
  }
};

export default { Query };
