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
    description: {
      en:
        // eslint-disable-next-line max-len
        "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      fi:
        // eslint-disable-next-line max-len
        "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      sv:
        // eslint-disable-next-line max-len
        "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus."
    },
    eventListQuery:
      "http://localhost:3000/en/events?categories=music&districts=kaupunginosa%3Aetu-t%C3%B6%C3%B6l%C3%B6",
    eventListTitle: {
      en: "All the best events of the fall",
      fi: "Kaikki syksyn parhaat tapahtumat",
      sv: "Höstens bästa händelser"
    },
    id: "1",
    linkText: {
      en: "Read more on the project website",
      fi: "Lue lisää hankkeen omilta sivuilta",
      sv: "Läs mer på projektets webbplats"
    },
    linkUrl: {
      en: "http://www.google.com",
      fi: "http://www.google.com",
      sv: "http://www.google.com"
    },
    similarCollectionsTitle: {
      en: "Check also these",
      fi: "Katso myös nämä",
      sv: "Se dessa också"
    },
    socialMediaDescription: {
      en: "We put together the best foliage for the fall",
      fi: "Kokosimme parhaat tärpit syksylle",
      sv: "Vi sätter ihop det bästa bladverket för hösten"
    },
    subtitles: {
      en: "Subtitles en",
      fi: "Subtitles fi",
      sv: "Subtitles sv"
    },
    title: {
      en: "The most bustling tricks of the fall",
      fi: "Syksyn riehakkaimmat riennot",
      sv: "Höstens mest livliga knep"
    }
  }
};

// Amount of the similar collections
export const SIMILAR_COLLECTIONS_AMOUNT = 8;
