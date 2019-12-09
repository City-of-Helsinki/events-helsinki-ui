export const mockEventData = {
  eventDetails: {
    description: {
      en: "description en",
      fi: "description fi",
      sv: "description sv"
    },
    endTime: null,
    externalLinks: [
      {
        link: "https://www.facebook.com/events/12345687/",
        name: "extlink_facebook"
      }
    ],
    id: "123",
    images: [
      {
        id: "60578",
        name: "piha-2.jpg",
        url: "https://api.hel.fi/linkedevents/media/images/piha-2_yYlCdPB.jpg"
      }
    ],

    inLanguage: [
      {
        id: "fi",
        name: {
          fi: "suomi"
        },
        translationAvailable: true
      }
    ],
    infoUrl: {
      fi:
        "https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080"
    },
    keywords: [],
    location: {
      addressLocality: {
        en: "locality en",
        fi: "locality fi",
        sv: "locality sv"
      },
      divisions: [],
      email: "location@info.com",
      infoUrl: {
        fi: "http://www.infourl.com"
      },
      name: { en: "name en", fi: "name fi", sv: "name sv" },
      position: { coordinates: [25.01497, 60.250507], type: "Point" },
      postalCode: "01234",
      streetAddress: {
        en: "streetAddress en",
        fi: "streetAddress fi",
        sv: "streetAddress sv"
      },
      telephone: {
        fi: "044 123 4567"
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
