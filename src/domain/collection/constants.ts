import mockEvent from "../event/__mocks__/eventDetails";

export const mockCollection = {
  collectionDetails: {
    boxColor: "SUOMENLINNA",
    curatedEvents: [`http://localhost:3000/fi/event/${mockEvent.id}`],
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
    heroImage: "testurl.png",
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

export const COLLECTION_DEFAULT_IMAGE = "/images/collections_placeholder.png";

export enum HERO_BACKGROUND_COLOR {
  COPPER = "COPPER",
  ENGEL = "ENGEL",
  FOG = "FOG",
  SUOMENLINNA = "SUOMENLINNA"
}
// Amount of the similar collections
export const SIMILAR_COLLECTIONS_AMOUNT = 4;
