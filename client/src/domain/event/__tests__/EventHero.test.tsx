import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import EventHero from "../EventHero";

const mockEventData = {
  linkedEventsEventDetails: {
    description: {
      en: "description en",
      fi: "description fi",
      sv: "description sv"
    },
    endTime: null,
    id: "123",
    images: [
      {
        id: "60578",
        name: "piha-2.jpg",
        url: "https://api.hel.fi/linkedevents/media/images/piha-2_yYlCdPB.jpg"
      }
    ],
    keywords: [],
    location: {
      addressLocality: {
        en: "locality en",
        fi: "locality fi",
        sv: "locality sv"
      },
      name: { en: "name en", fi: "name fi", sv: "name sv" },
      streetAddress: {
        en: "streetAddress en",
        fi: "streetAddress fi",
        sv: "streetAddress sv"
      }
    },
    name: {
      en: "name en",
      fi: "name fi",
      sv: "name sv"
    },
    offers: [
      {
        description: null,
        infoUrl: null,
        isFree: true,
        price: null
      }
    ],
    shortDescription: {
      en: "short description en",
      fi: "short description fi",
      sv: "short description sv"
    },
    startTime: "2019-12-13T08:00:00Z"
  }
};

test("EventHero matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <EventHero eventData={mockEventData} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
