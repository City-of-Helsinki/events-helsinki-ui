import { mockEventData } from "../event/constants";

export const mockCollection = {
  collectionDetails: {
    curatedEvents: [
      `http://localhost:3000/fi/event/${mockEventData.eventDetails.id}`
    ],
    curatedEventsTitle: {
      en: "At least visit these",
      fi: "Käy ainakin näissä",
      sv: "Besök åtminstone dessa"
    },
    eventListQuery:
      "http://localhost:3000/en/events?categories=music&districts=kaupunginosa%3Aetu-t%C3%B6%C3%B6l%C3%B6",
    eventListTitle: {
      en: "All the best events of the fall",
      fi: "Kaikki syksyn parhaat tapahtumat",
      sv: "Höstens bästa händelser"
    },
    id: "1"
  }
};
