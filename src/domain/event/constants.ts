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
          en: "Finnish",
          fi: "suomi",
          sv: "finska"
        },
        translationAvailable: true
      }
    ],
    infoUrl: {
      en:
        "https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080",
      fi:
        "https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080",
      sv:
        "https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080"
    },
    keywords: [
      {
        altLabels: [],
        createdTime: "2017-09-06T05:20:25.832872Z",
        dataSource: "yso",
        id: "yso:1",
        lastModifiedTime: "2017-09-06T05:20:25.832872Z",
        nEvents: 1,
        name: {
          en: "Keyword 1 en",
          fi: "Keyword 1 fi",
          sv: "Keyword 1 sv"
        }
      },
      {
        altLabels: [],
        createdTime: "2017-09-06T05:20:25.832872Z",
        dataSource: "yso",
        id: "yso:2",
        lastModifiedTime: "2017-09-06T05:20:25.832872Z",
        nEvents: 2,
        name: {
          en: "Keyword 2 en",
          fi: "Keyword 2 fi",
          sv: "Keyword 2 sv"
        }
      }
    ],
    location: {
      addressLocality: {
        en: "locality en",
        fi: "locality fi",
        sv: "locality sv"
      },
      divisions: [],
      email: "location@info.com",
      infoUrl: {
        en: "http://www.infourl.com",
        fi: "http://www.infourl.com",
        sv: "http://www.infourl.com"
      },
      name: {
        en: "name en",
        fi: "name fi",
        sv: "name sv"
      },
      position: {
        coordinates: [25.01497, 60.250507],
        type: "Point"
      },
      postalCode: "01234",
      streetAddress: {
        en: "streetAddress en",
        fi: "streetAddress fi",
        sv: "streetAddress sv"
      },
      telephone: {
        en: "044 123 4567",
        fi: "044 123 4567",
        sv: "044 123 4567"
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
    provider: null,
    publisher: "provider:123",
    shortDescription: {
      en: "short description en",
      fi: "short description fi",
      sv: "short description sv"
    },
    startTime: "2019-12-13T08:00:00Z",
    superEvent: null
  }
};

// Amount of the similar events
export const SIMILAR_EVENTS_AMOUNT = 8;

export const EVENT_KEYWORD_BLACK_LIST = [
  "helmet:10592", // Yleinen
  "helmet:10689", // Helsinki
  "helmet:11916", // Infonäytöt (Helsinki)
  "kulke:53", // Suomi
  "kulke:54", // Ruotsi
  "kulke:55", // Englanti
  "kulke:616", // Näkyy TV-sovelluksessa
  "kulke:671", // Normaali
  "kulke:673" // Suomi (TV)
];

export const EVENT_PLACEHOLDER_IMAGES = [
  "/images/activities_placeholder_imgA.jpg",
  "/images/activities_placeholder_imgB.jpg",
  "/images/activities_placeholder_imgC.jpg",
  "/images/activities_placeholder_imgD.jpg"
];

export const EVENT_SOME_IMAGE = "/images/activities_SoMe-share.jpg";
