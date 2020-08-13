/* eslint-disable max-len */
/* eslint-disable sort-keys */
const eventSearchResponse = {
  data: {
    eventList: {
      meta: {
        count: 72,
        next:
          'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
        previous: null,
        __typename: 'Meta',
      },
      data: [
        {
          id: 'kulke:52242',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65600',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675515.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'kulke:616',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:616/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Näkyy TV-sovelluksessa',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:48',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:48/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Espan lava',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:31',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:31/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:55',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:55/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Englanti',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:348',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:348/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:54',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:54/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Ruotsi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7265',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Ullanlinna',
                  sv: 'Ulrikasborg',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7265/',
            email: null,
            infoUrl: {
              fi: 'http://www.espanlava.fi/',
              sv: 'http://www.espanlava.fi/',
              en: 'http://www.espanlava.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Espan lava',
              en: 'Espa Stage',
              sv: 'Esplanadestraden',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Eteläesplanadi 1',
              sv: 'Södra Esplanaden 1',
              en: 'Eteläesplanadi 1',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.950249, 60.16771],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36566',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Gypsy Jazz Evening – Open Stage',
            fi: 'Gypsy Jazz Evening – Open Stage',
            sv: 'Gypsy Jazz Evening – Open Stage',
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              '<p>Looking for some tasty acoustic music? Welcome to join us and brace yourself for an evening of gypsy jazz!</p><p>Be prepared to listen swinging music in the same style Django Reinhardt and Stéphane Grappelli did in Paris in the 1930s. It is highly probable that you cannot sit still while listening to this music so there will be always some space available for all you lindy hop and balboa cats.</p><p>The musicians taking care of the hot swinging notes are:<br>Tomi Kettunen (solo guitar)<br>Antti Korhola (violin)<br>Javier Sanchez (double bass) <br>Otto Porkkala (rhythm guitar)</p><p>In collaboration with Ravintola Kappeli</p>',
            fi:
              '<p>Kaipaatko mausteisen hersyvää akustista musiikkia? Tervetuloa mukaamme mustalaismusiikin pariin!</p><p>Tarjolla on svengaavaa musiikkia Django Reinhardtin ja ja Stephane Grappellin tyyliin Pariisin 1930 –luvulta. Tuskin haluat istua paikallasi tämän musiikin tahdissa. Tilaa riittää lindy hopille ja balboalle. Kuumat swing-rytmit takaavat muusikot:</p><p>Tomi Kettunen (soolo kitara)</p><p>Antti Korhola (viulu)</p><p>Javier Sanchez (basso)</p><p>Otto Porkkala (kitara)</p><p>In collaboration with Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              'Looking for some tasty acoustic music? Welcome to join us and brace yourself for an evening of gypsy jazz!',
            fi:
              'Kaipaatko mausteisen hersyvää akustista musiikkia? Tervetuloa mukaamme mustalaismusiikin pariin!',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-13T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/16AD014FE3F5A01C5481C5D72774CEBD/Gypsy_Jazz_Evening',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/16AD014FE3F5A01C5481C5D72774CEBD/Gypsy_Jazz_Evening',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/16AD014FE3F5A01C5481C5D72774CEBD/Gypsy_Jazz_Evening',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52245',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65603',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675519.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'kulke:616',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:616/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Näkyy TV-sovelluksessa',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:48',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:48/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Espan lava',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:31',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:31/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:348',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:348/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:55',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:55/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Englanti',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:54',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:54/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Ruotsi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7265',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Ullanlinna',
                  sv: 'Ulrikasborg',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7265/',
            email: null,
            infoUrl: {
              fi: 'http://www.espanlava.fi/',
              sv: 'http://www.espanlava.fi/',
              en: 'http://www.espanlava.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Espan lava',
              en: 'Espa Stage',
              sv: 'Esplanadestraden',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Eteläesplanadi 1',
              sv: 'Södra Esplanaden 1',
              en: 'Eteläesplanadi 1',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.950249, 60.16771],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36566',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Karkkilan I Ukuleleorkesteri – Ukulele Espa',
            fi: 'Karkkilan I Ukuleleorkesteri – Ukulele Espa',
            sv: 'Karkkilan I Ukuleleorkesteri – Ukulele Espa',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Karkkilan I Ukuleleorkesteri on monipuolinen porukka, jonka ohjelmistossa on vaihtelevasti lattareita, jazz-standardeja ja runsaasti omia omaleimaisia sävellyksiä.</p><p>Se tarjoaa taitavaa soitantaa, kaunista laulua ja hyviä fiiliksiä. Orkesteri täyttää tänä vuonna seitsemän vuotta, ja sen on ehtinyt vakiinnuttaa paikkansa Suomen ukuleleorkesterien parhaimmistossa.</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Karkkilan I Ukuleleorkesteri on monipuolinen porukka, jonka ohjelmistossa on vaihtelevasti lattareita, jazz-standardeja ja runsaasti omia omaleimaisia sävellyksiä.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-15T11:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/D9496B9D0846D9B6B0E3C132EC71162A/Karkkilan_I_Ukuleleorkesteri',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/D9496B9D0846D9B6B0E3C132EC71162A/Karkkilan_I_Ukuleleorkesteri',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/D9496B9D0846D9B6B0E3C132EC71162A/Karkkilan_I_Ukuleleorkesteri',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52247',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65604',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675520.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'kulke:616',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:616/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Näkyy TV-sovelluksessa',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:48',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:48/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Espan lava',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:31',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:31/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:348',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:348/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:55',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:55/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Englanti',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:54',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:54/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Ruotsi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7265',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Ullanlinna',
                  sv: 'Ulrikasborg',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7265/',
            email: null,
            infoUrl: {
              fi: 'http://www.espanlava.fi/',
              sv: 'http://www.espanlava.fi/',
              en: 'http://www.espanlava.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Espan lava',
              en: 'Espa Stage',
              sv: 'Esplanadestraden',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Eteläesplanadi 1',
              sv: 'Södra Esplanaden 1',
              en: 'Eteläesplanadi 1',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.950249, 60.16771],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36566',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'GrUS – Ukulele Espa',
            fi: 'GrUS – Ukulele Espa',
            sv: 'GrUS – Ukulele Espa',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>GrUS on kuuden henkilön ukuleleryhmä pääkaupunkiseudulta.</p><p>Ryhmä esittää omaleimaisia instrumentaali- ja laulusovituksia tunnetuista kappaleista, usein sikerminä ja huumorilla höystettynä. Ohjelmistossa on poppia,rokkia, klassista, iskelmää ja jazzia. <br>Orkesteri on toiminut jo seitsemän vuotta ja esiintynyt eri konserteissa ja festivaaleilla koti- ja ulkomailla.</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi: 'GrUS on kuuden henkilön ukuleleryhmä pääkaupunkiseudulta.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-15T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/69DC3C2617A8C9983B972C12C9B9EA42/GrUS',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/69DC3C2617A8C9983B972C12C9B9EA42/GrUS',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/69DC3C2617A8C9983B972C12C9B9EA42/GrUS',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'helsinki:afz3quo4qm',
          eventStatus: 'EventScheduled',
          externalLinks: [
            {
              name: 'extlink_facebook',
              link: 'https://www.facebook.com/events/589059458459214/',
              __typename: 'ExternalLink',
            },
          ],
          images: [
            {
              id: '65815',
              name: 'SunJazz: Kimmo Salminen Quartet',
              url:
                'https://api.hel.fi/linkedevents/media/images/kimmo-salimnen-wuartet.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'yso:p4484',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p4484/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'jazz',
                sv: 'jazz',
                en: 'jazz',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p27962',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p27962/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'elävä musiikki',
                sv: 'levande musik',
                en: 'live music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:54676',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Harju',
                  sv: 'Ås',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Alppiharju',
                  sv: 'Åshöjden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Alppiharju',
                  sv: 'Åshöjden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:54676/',
            email: 'info@tenhorestobar.fi',
            infoUrl: {
              fi: 'http://www.ravintolatenho.fi/',
              sv: 'http://www.ravintolatenho.fi/sv/',
              en: 'http://www.ravintolatenho.fi/en/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Tenho Restobar',
              en: 'Tenho Restobar',
              sv: 'Tenho Restobar',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Helsinginkatu 15',
              sv: 'Helsingegatan 15',
              en: 'Helsinginkatu 15',
              __typename: 'LocalizedObject',
            },
            postalCode: '00500',
            position: {
              coordinates: [24.95476, 60.187332],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 44 971 3151',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'SunJazz: Kimmo Salminen Quartet',
            fi: 'SunJazz: Kimmo Salminen Quartet',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              "<p>Kimmo Salminen Quartet's material is inspired from 60`s jazz artists, like Wayne Shorter and Cedar Walton. </p><p>The group also plays their own compositions, fitting nicely with this great era of post bop.</p><p>Swing, Latin and freedom to express and communicate is base for this deep and beautiful art called jazz.</p><p>Tenho Restobar<br>16.8. at 20.00</p><p>Free entry</p>",
            fi:
              '<p>Wayne Shorterin 60-luvun tuotannon innoittamana alkuun pantu kokoonpano Kimmo Salminen Quartet on alkanut osoittamaan persoonallisuuttaan omien sävellysten välityksellä. </p><p>Sävellyksistä vastaa yhtyeen kaikki jäsenet, joka tekee kokonaisuudesta monipuolisen, svengaavan ja soinnikkaan.</p><p>Tenho Restobar<br>16.8. klo 20</p><p>Vapaa pääsy</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              "Kimmo Salminen Quartet's material is inspired from 60`s jazz artists, like Wayne Shorter and Cedar Walton. ",
            fi:
              'Wayne Shorterin 60-luvun tuotannon innoittamana alkuun pantu kokoonpano Kimmo Salminen Quartet',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: '2020-08-16T19:00:00Z',
          startTime: '2020-08-16T17:00:00Z',
          publisher: 'ytj:0586977-6',
          provider: {
            en: 'Tenho Restobar',
            fi: 'Tenho Restobar',
            sv: null,
            __typename: 'LocalizedObject',
          },
          infoUrl: {
            en: 'https://www.facebook.com/events/589059458459214/',
            fi: 'https://www.facebook.com/events/589059458459214/',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'helsinki:afwvznhwiy',
          eventStatus: 'EventCancelled',
          externalLinks: [],
          images: [
            {
              id: '52656',
              name: 'Flow Festival',
              url:
                'https://api.hel.fi/linkedevents/media/images/Flow_Festival_2018_saturday.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1304',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1304/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'festivaalit',
                sv: 'festivaler',
                en: 'festivals',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'helfi:12',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/helfi:12/',
              dataSource: 'helfi',
              hasUpcomingEvents: null,
              name: {
                fi: 'Kulttuuri ja vapaa-aika',
                sv: 'Kultur och fritid',
                en: 'Culture and leisure',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p9509',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p9509/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'kaupunkikulttuuri',
                sv: 'stadskultur',
                en: 'urban culture',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:9356',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Kallio',
                  sv: 'Berghäll',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Sörnäinen',
                  sv: 'Sörnäs',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kalasatama',
                  sv: 'Fiskehamnen',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:9356/',
            email: null,
            infoUrl: {
              fi: 'http://www.suvilahti.fi/',
              sv: 'http://www.suvilahti.fi/',
              en: 'http://www.suvilahti.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Suvilahti',
              en: 'Suvilahti',
              sv: 'Södervik',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Kaasutehtaankatu 1',
              sv: 'Gasverksgatan 1',
              en: null,
              __typename: 'LocalizedObject',
            },
            postalCode: '00580',
            position: {
              coordinates: [24.974068, 60.18659],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 10 470 7260',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: false,
              price: {
                en: '105-195€',
                fi: '105-195€',
                sv: '105-195€',
                __typename: 'LocalizedObject',
              },
              description: {
                en: '',
                fi: '',
                sv: '',
                __typename: 'LocalizedObject',
              },
              infoUrl: {
                en:
                  'https://www.ticketmaster.fi/artist/flow-festival-2020-lippuja/938344',
                fi:
                  'https://www.ticketmaster.fi/artist/flow-festival-2020-lippuja/938344',
                sv:
                  'https://www.ticketmaster.fi/artist/flow-festival-2020-lippuja/938344',
                __typename: 'LocalizedObject',
              },
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Cancelled: Flow Festival 2020',
            fi: 'Peruttu: Flow Festival 2020',
            sv: 'Annulerad: Flow Festival 2020',
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              '<p>Flow Festival is a leading European music and arts boutique festival. </p><p>It has become synonymous with bringing music from old school legends to topical newcomers. </p><p>Beyond the music, Flow offers a warm embrace of the arts and an exceptional array of a world-spanning cuisine.</p><p>Suvilahti<br>14.-16.8.</p><p>Tickets 105-195€ from Ticketmaster</p>',
            fi:
              '<p>Flow Festival on innovatiivinen edelläkävijä pohjoismaisessa festivaalikentässä. Musiikin lisäksi Flow panostaa visuaaliseen taiteeseen ja ravintolaelämyksiin. </p><p>Festivaalille osallistuvat ravintolat on valittu tarkkaan, ja noin 40 eri ravintolaa, kahvilaa ja baaria tarjoavat festarivieraille korkealaatuista ruokaa moneen eri makuun.</p><p>Suvilahti <br>14.-16.8.</p><p>Liput 105-195€ Ticketmasterista</p>',
            sv:
              '<p>Musik- och stadskulturfestivalen Flow Festival erbjuder intressanta inhemska och internationella artister nästa augusti. </p><p>På programmet finns aktuell musik från indie-rock till soul, jazz och den trendigaste klubbmusiken.</p><p>Södervik<br>14.-16.8.</p><p>Biljetter 105-195€ från Ticketmaster</p>',
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              'Flow Festival is a leading European music and arts boutique festival.',
            fi:
              'Flow Festival on innovatiivinen edelläkävijä pohjoismaisessa festivaalikentässä. Musiikin lisäksi Flow panostaa visuaaliseen taiteeseen ja ravintolaelämyksiin.',
            sv:
              'Musik- och stadskulturfestivalen Flow Festival erbjuder intressanta inhemska och internationella artister nästa augusti.',
            __typename: 'LocalizedObject',
          },
          endTime: '2020-08-16T20:59:00Z',
          startTime: '2020-08-13T21:01:00Z',
          publisher: 'ytj:0586977-6',
          provider: {
            en: 'Flow Festival',
            fi: 'Flow Festival',
            sv: 'Flow Festival',
            __typename: 'LocalizedObject',
          },
          infoUrl: {
            en: 'http://www.flowfestival.com',
            fi: 'http://www.flowfestival.com',
            sv: 'http://www.flowfestival.com',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'helmet:211874',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65090',
              name: '',
              url:
                'https://www.helmet.fi/download/noname/{E870AA7B-A733-416F-B2FD-5542B5294D04}/83069',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [
            {
              name: null,
              __typename: 'InLanguage',
            },
          ],
          keywords: [
            {
              id: 'helmet:1',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/helmet:1/',
              dataSource: 'helmet',
              hasUpcomingEvents: null,
              name: {
                fi: 'Tapahtumat',
                sv: 'Evenemang',
                en: 'Events',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'helmet:10689',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/helmet:10689/',
              dataSource: 'helmet',
              hasUpcomingEvents: null,
              name: {
                fi: 'Helsinki',
                sv: 'Helsingfors',
                en: 'Helsinki',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'helmet:10592',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/helmet:10592/',
              dataSource: 'helmet',
              hasUpcomingEvents: null,
              name: {
                fi: 'Yleinen',
                sv: 'Allmänt',
                en: 'General',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'helmet:11686',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/helmet:11686/',
              dataSource: 'helmet',
              hasUpcomingEvents: null,
              name: {
                fi: 'Konsertit ja klubit',
                sv: 'Konsert och klubbar',
                en: 'Concerts and clubs',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:8143',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Laajasalo',
                  sv: 'Degerö',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Laajasalo',
                  sv: 'Degerö',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Yliskylä',
                  sv: 'Uppby',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:8143/',
            email: 'laajasalon_kirjasto@hel.fi',
            infoUrl: {
              fi: 'http://www.helmet.fi/laajasalonkirjasto',
              sv: 'http://www.helmet.fi/laajasalonkirjasto',
              en: 'http://www.helmet.fi/laajasalonkirjasto',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Laajasalon kirjasto',
              en: 'Laajasalo Library',
              sv: 'Degerö bibliotek',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Yliskylän puistokatu 4',
              sv: 'Uppby parkgata 4',
              en: 'Yliskylän puistokatu 4',
              __typename: 'LocalizedObject',
            },
            postalCode: '00840',
            position: {
              coordinates: [25.049484, 60.18003],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 85084',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: null,
            fi: 'Stadin juhlaorkesteri esiintyy kirjaston terassilla',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Orkesteri soittaa tanssittavaa ja sielukasta rytmimusiikkia. Tyylisuuntina lähimpänä ovat soul, blues ja funk. Ohjelmistosta löytyy myös rappia ja jazzia.</p><p>Orkesterin kapellimestarina toimi Julius Heikkilä. Orkesterin riveissä ovat Leevi Priha, Robbie Hill, Eero Savela, Heikki "Heppi" Keskinen, Juuso Kontiola, Ari "Fisu" Kala ja Tom Nekljudow.</p><p>Yleisön ja esiintyjien turvallisuus on meille tärkeää ja otamme huomioon korona-pandemiaan liittyvät rajoitukset sekä ohjeistukset huomioon.</p><p>Kuva: Paula Virta</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Orkesteri soittaa tanssittavaa ja sielukasta rytmimusiikkia. Tyylisuuntina lähimpänä ovat soul, blues ja funk. Ohjelmistosta löytyy myös rappia ja jazzia.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: '2020-08-17T15:15:00Z',
          startTime: '2020-08-17T14:30:00Z',
          publisher: 'ahjo:u4804001010',
          provider: null,
          infoUrl: null,
          __typename: 'EventDetails',
        },
        {
          id: 'helsinki:afz3r4y6z4',
          eventStatus: 'EventScheduled',
          externalLinks: [],
          images: [
            {
              id: '65820',
              name: 'Kesän nuoret taiteilijat',
              url:
                'https://api.hel.fi/linkedevents/media/images/12d3e5fc-knt-verkkosivuille.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: {
            internalId:
              'https://api.hel.fi/linkedevents/v1/event/helsinki:afz3r4y4kq/',
            __typename: 'InternalIdObject',
          },
          inLanguage: [],
          keywords: [
            {
              id: 'yso:p11185',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p11185/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'konsertit',
                sv: 'konserter (framträdanden)',
                en: 'concerts',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p18434',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p18434/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'taidemusiikki',
                sv: 'konstmusik',
                en: 'art music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:20633',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Vironniemi',
                  sv: 'Estnäs',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kluuvi',
                  sv: 'Gloet',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kluuvi',
                  sv: 'Gloet',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:20633/',
            email: null,
            infoUrl: {
              fi: 'http://www.musiikkitalo.fi',
              sv: 'http://www.musiikkitalo.fi/sv',
              en: 'http://www.musiikkitalo.fi/en',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Musiikkitalo',
              en: 'Musiikkitalo - Helsinki Music Centre',
              sv: 'Musikhuset',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Mannerheimintie 13 A',
              sv: 'Mannerheimvägen 13 A',
              en: 'Mannerheimintie 13 A',
              __typename: 'LocalizedObject',
            },
            postalCode: '00100',
            position: {
              coordinates: [24.935074, 60.1737],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 20 707 0400',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: false,
              price: {
                en: '6,50-18€',
                fi: '6,50-18€',
                sv: '6,50-18€',
                __typename: 'LocalizedObject',
              },
              description: {
                en: '',
                fi: '',
                sv: '',
                __typename: 'LocalizedObject',
              },
              infoUrl: {
                en: 'http://www.ticketmaster.fi',
                fi: 'http://www.ticketmaster.fi',
                sv: 'http://www.ticketmaster.fi',
                __typename: 'LocalizedObject',
              },
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Young Artists of Summer',
            fi: 'Kesän nuoret taiteilijat',
            sv: 'Sommarens unga artister',
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              '<p>The Young artists of the summer series presents recent graduates and students of the Sibelius Academy of Uniarts Helsinki who have excelled in their studies.</p><p>The Story of Us: original music and film by Tiina Louneva depicting the cyclical nature of life through imagery of Finnish nature and the her own family. The theme of change, in both the seasons and family generations, is used to paint these stories.<br>Helsinki Music Centre, Black Box<br>19.8. at 19.00</p><p>The Kadi Vija Key Project is an innovative, touching chamber music-type ensemble starred by Kadi Vija – a phenomenal jazz singer from the young generation of Finnish jazz – and her compositions.<br>Helsinki Music Centre, Black Box<br>2.9. at 19.00</p><p>The music of the OBO collective stems from the fascinating vibrant tones of overtone flutes and the stream of consciousness they inspire.<br>Helsinki Music Centre, Black Box<br>3.9. at 19.00</p><p>Anna Saastamoinen presents two characters on stage. The reflections of light and shadow create a powerful collection of musical art with a carrying theme of picturesque expression.<br>R House, Concert Hall<br>4.9. at 19.00</p><p>Tickets 6,50-18€ from Ticketmaster</p>',
            fi:
              '<p>Taideyliopiston sarjassa nuoret taiteilijat tuovat lavalle muun muassa jazzia, beatboxausta, perinnemelodioita ja säveltaidetta.</p><p>Tiina Lounevan säveltämä, kuvaama ja editoima teos Tarina meistä käsittelee elämän syklisyyttä suomalaisen luonnon ja esittäjän oman perheen kautta. Aiheina on muutos, luonto ja arki, se mikä on suoraan edessämme, mutta helposti hukkuu elämän hektisyyteen. Muutoksen teema välittyy tarinoissa vuodenaikojen ja sukupolvien kautta. <br>Musiikkitalo, Black Box<br>19.8. klo 19</p><p>Kadi Vija Key Project esittelee jazzlaulaja Kadi Vijan sävellyksiä pehmeästi, vahvasti ja vangitsevasti. Kadi Vija Key Project on suomalaisen jazzin nuoren sukupolven ilmiömäisen jazzlaulajan Kadi Vijan, ja hänen sävellyksiensä ympärille, syntynyt innovatiivinen, tunteita herättävä ja kamarimusiikinomainen yhtye. <br>Musiikkitalo, Black Box<br>2.9. klo 19</p><p>OBO-kollektiivin musiikki kumpuaa yläsävelhuilujen kiehtovasta viremaailmasta ja sen inspiroimasta tajunnanvirrasta. Perinnemelodiat ja yläsävelhuilulle sävelletyt tuoreet kappaleet mukautuvat luonnonsävelasteikon lumoavaan tanssiin. Konsertissa julkaistaan Ojajärvi Blom Ojajärvi -trion ensilevy, jossa trio laajentuu OBO-kollektiiviksi.<br>Musiikkitalo, Black Box<br>3.9. klo 19</p><p>Anna Saastamoisen Varjoja ja valoa -konsertissa lavalle piirtyy kaksi hahmoa. Varjojen ja valon heijastuksina syntyy voimallinen kokoelma säveltaidetta, jonka keskinäinen värähtely  avaa kuulijalleen surun, ahdistuksen ja tyhjyyden, mutta toisaalta loistokkaan ja voimaannuttavan rakkauden värittämiä maalauksia.<br>R-talo, konserttisali<br>4.9. klo 19</p><p>Liput 6,50–18 € </p>',
            sv:
              '<p>Serien Sommarens unga artister presenterar nyutexaminerade studerande på Konstuniversitetets Sibelius-Akademi som varit mycket framgångsrika i sina studier.</p><p>Tiina Louneva beskriver i denna video livets cykler genom bilder av finsk natur och hennes egen familj. Videons motiv inkluderar en utforskning av förändringar, årstider och växlingar av generationer. <br>Musikhuset, Black Box<br>19.8. kl 19</p><p>Kadi Vija Key Project är en innovativ och känsloväckande kammarmusikartad ensemble som uppstått kring den finska jazzens unga generations enastående jazzsångare Kadi Vija och hans kompositioner. <br>Musikhuset, Black Box<br>2.9. kl 19</p><p>OBO-kollektivets musik föds ur övertonsflöjternas fascinerande värld av toner och det medvetandeflöde som den inspirerar till. De traditionella melodierna och nya styckena komponerade för övertonsflöjt anpassar sig till den naturliga tonskalans lockande dans.<br>Musikhuset, Black Box<br>3.9. kl 19</p><p>På scenen syns två figurer, reflexer av skuggor och ljus skapar en kraftfull samling tonsättarkonst, vars bärande kraft är ett målande uttryck. Vibrationerna mellan Anna Saastamoinens verk skapar ett kontinuum av ett färgspektrum på scenen.<br>R-huset, konsertsalen<br>4.9. kl 19</p><p>Biljetter 6,50-18€</p>',
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              'The Young artists of the summer series presents recent graduates and students of the Sibelius Academy of Uniarts Helsinki who have excelled in their studies.',
            fi:
              'Taideyliopiston sarjassa nuoret taiteilijat tuovat lavalle muun muassa jazzia, beatboxausta, perinnemelodioita ja säveltaidetta.',
            sv:
              'Serien Sommarens unga artister presenterar nyutexaminerade studerande på Konstuniversitetets Sibelius-Akademi som varit mycket framgångsrika i sina studier.',
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-19T16:00:00Z',
          publisher: 'ytj:0586977-6',
          provider: {
            en: 'Sibelius Academy',
            fi: 'Sibelius-Akatemia',
            sv: 'Sibelius-Akademin',
            __typename: 'LocalizedObject',
          },
          infoUrl: {
            en: 'https://www.uniarts.fi/kampanjat/kesan-nuoret-taiteilijat/',
            fi: 'https://www.uniarts.fi/kampanjat/kesan-nuoret-taiteilijat/',
            sv: 'https://www.uniarts.fi/kampanjat/kesan-nuoret-taiteilijat/',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52254',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65610',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675525.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'kulke:348',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:348/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:31',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:31/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:616',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:616/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Näkyy TV-sovelluksessa',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:48',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:48/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Espan lava',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:55',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:55/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Englanti',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:54',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:54/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Ruotsi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7265',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Ullanlinna',
                  sv: 'Ulrikasborg',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7265/',
            email: null,
            infoUrl: {
              fi: 'http://www.espanlava.fi/',
              sv: 'http://www.espanlava.fi/',
              en: 'http://www.espanlava.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Espan lava',
              en: 'Espa Stage',
              sv: 'Esplanadestraden',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Eteläesplanadi 1',
              sv: 'Södra Esplanaden 1',
              en: 'Eteläesplanadi 1',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.950249, 60.16771],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36566',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Sensu-Ellit ja Hagia trio – Open Stage',
            fi: 'Sensu-Ellit ja Hagia trio – Open Stage',
            sv: 'Sensu-Ellit ja Hagia trio – Open Stage',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Sensu-Ellit on Sofia Perhomaan ja Tuuli Alanärän duo, joka laulaa kaksiäänisesti iskelmäjazz-klassikoita. Espan lavan konsertissa heitä säestää Hagia-trio.</p><p>Sensu-Ellit on Sofia Perhomaan ja Tuuli Alanärän duo, joka laulaa kaksiäänisesti iskelmäjazz-klassikoita.</p><p>Uusin, omin sovituksin laulajattaret tulkitsevat mm. Ranskalaiset korot, Mamma ja Sulle salaisuuden kertoa mä voisin. Lisäksi kuullaan mm. bossa novaa portugaliksi.</p><p>Sensu-Ellejä säestää Hagia trio: Djangomaniasta tuttu kitaristi Vesa Tompuri, sekä kitaristi Eero Nykänen ja rumpali Eemeli Kälviäinen.</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Sensu-Ellit on Sofia Perhomaan ja Tuuli Alanärän duo, joka laulaa kaksiäänisesti iskelmäjazz-klassikoita. Espan lavan konsertissa heitä säestää Hagia-trio.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-19T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/23BDC5438591EA5C4B0C247AE4EE23E6/Sensu-Ellit_ja_Hagia_trio',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/23BDC5438591EA5C4B0C247AE4EE23E6/Sensu-Ellit_ja_Hagia_trio',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/23BDC5438591EA5C4B0C247AE4EE23E6/Sensu-Ellit_ja_Hagia_trio',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52366',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '66043',
              name: '',
              url:
                'http://www.vuotalo.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_673588.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'yso:p360',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p360/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'kulttuuritapahtumat',
                sv: 'kulturevenemang',
                en: 'cultural events',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:52',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:52/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Muut tapahtumat',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:669',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:669/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Muut kulttuuritapahtumat (monitaide)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:616',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:616/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Näkyy TV-sovelluksessa',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p2108',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p2108/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'tapahtumat',
                sv: 'händelser och evenemang',
                en: 'events',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:45',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:45/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Vuotalo',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:55',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:55/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Englanti',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7260',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Keski-Vuosaari',
                  sv: 'Mellersta Nordsjö',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Vuosaari',
                  sv: 'Nordsjö',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Vuosaari',
                  sv: 'Nordsjö',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7260/',
            email: null,
            infoUrl: {
              fi: 'http://www.vuotalo.fi/',
              sv: 'http://www.vuotalo.fi/',
              en: 'http://www.vuotalo.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Vuotalo',
              en: 'Vuosaari House',
              sv: 'Nordhuset',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Mosaiikkitori 2',
              sv: 'Mosaiktorget 2',
              en: 'Mosaiikkitori 2',
              __typename: 'LocalizedObject',
            },
            postalCode: '00980',
            position: {
              coordinates: [25.14392, 60.20868],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 88802',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Taiteiden ilta Vuotalossa',
            fi: 'Taiteiden ilta',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              "<p><b>17.30-18.15 & 18.30-19.15</b></p><p>Solo jazz –workshop for kids in English. Teacher Clyde Wilder is a Vuosaari based American dance teacher active at the Helsinki Traditional Jazz Dance Society</p><p><b>klo 17.30-20.00</b><br>Circus Magenta's nonstop-workshop</p><p>Join Sirkus Magenta's open nonstop circus workshop in Vuotalo. Try acrobatics, juggling and other fun circus tricks. Suitable for all ages. No need to sign up in advance. If needed, circus instructors limit the amount of participants. Teaching in Finnish and English. Welcome!</p><p><b>klo 17-20</b><br>Colour Your World is a collaborative art workshop based on free flow improvisation, where anyone can join in at anytime. The method employed is known as</p><p>Kimppakuvitus. The installation is made up of 1-2 pieces of garden furniture and perhaps some accessories (e.g. ceramic pots). There are no boundaries - only the imagination.</p>",
            fi:
              '<p>Vuotalon Taiteiden ilta tarjoilee runsaan kattauksen työpajoja, ilmastoaiheisen animaatioelokuvan sekä soitinesittelykonsertin.</p><p>Työpajoissa pääsee kokeilemaan mm. soolo jazz –tanssia, akrobatiaa ja jongleerausta sekä paperinmuokkausta ja kimppakuvitusta. Työpajoja pidetään sekä sisällä, että sään salliessa ulkona. Osa pajoista ohjataan englanniksi. Työpajoihin on turvamääräysten takia rajoitettu määrä osanottajia kerrallaan.  <br>Workshops are also in english!<br>  <br><b>Ohjelma ja aikataulu:</b></p><p>Aulatila</p><p><b>klo 17-20</b><br>Helsingin kuvataidekoulun Ihanat ilmestykset -muovailutyöpajassa voit osallistua yhteiseen taideteokseen tekemällä oman hahmon, josta saat valokuvan muistoksi.</p><p><b>klo 17.30</b><br>Aulan Stagella Soitinesittelykonsertti<br>Itä-Helsingin musiikkiopiston oppilaat - esittelyssä: viulu, sello, huilu, fagotti ja käyrätorvi</p><p>Kirjasto</p><p><b>klo 17-19</b><br>Lapsille ja vähän vanhemmillekin järjestetään kirjaston lasten ja nuorten alueella klo 17–19 askartelupaja, jossa hyödynnetään kirjaston poistokirjoja ja muuta kierrätysmateriaalia.</p><p>Nonstop</p><p>Kirjaston Taiteiden illan teemana on luonto ja ilmasto. Kirjaston Stagella näytetään nonstopina vuosaarelaisen taiteilijan Gun ”Gunzi” Holmströmin ilmastoaiheinen hiilianimaatioelokuva Kuusen henkinen elämä. Animaatiosta esitetään vuoron perään suomen- ja englanninkielinen versio.</p><p>Työväenopisto - käsityöluokka 2 krs.</p><p><b>klo 17-20</b><br>Pistele ja taittele paperia Tule kokeilemaan paperin muokkaamista kahdelle hauskalla tavalla! Työpajaan otetaan kerrallaan max 10 osallistujaa. Alle kouluikäinen toimii yhdessä aikuisen kanssa, kouluikäinen voi osallistua myös yksin. Opettajina Maria ja Tupu.</p><p>Musiikkiluokka 2krs.</p><p><b>klo 17.30-18.15 & klo 18.30-19.15</b><br>Soolo-jazztanssi-työpaja lapsille englanniksi</p><p>Opettajana toimii Vuosaaressa asuva amerikkalainen tanssinopettaja Clyde Wilder, Helsinki Traditional Jazz Dance Society ry:stä.</p><p>Etupiha</p><p><b>klo 17.30-20.00</b><br>Sirkus Magentan nonstop-työpaja</p><p>Hauskassa sirkuspajassa kokeillaan eri sirkuslajeja kuten akrobatiaa ja jongleerausta. Sopii kaiken ikäisille. Ei ennakkoilmoittautumista. Sirkusohjaajat rajoittavat osallistujamäärää tarpeen mukaan turvavälit huomioiden. Opetuskielet suomi ja englanti. Tervetuloa temppuilemaan!</p><p>Piha-alue</p><p><b>klo 17-20</b><br>Englanninkielisessä Kimppakuvitustyöpajassa tuunataan yhdessä improvisoiden puutarhakalusteille uusi ilme. Vain mielikuvitus on rajana! Mukaan työpajaan voi tulla missä vaiheessa tahansa.</p><p>Galleria</p><p><b>Vieno Motorsin Troubled Water -näyttely</b> Vuotalon galleriassa 29.8. asti.</p><p>- - -</p><p>Workshops are suitable for finnish & english languages.</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Vuotalon Taiteiden ilta tarjoilee runsaan kattauksen työpajoja, ilmastoaiheisen animaatioelokuvan sekä soitinesittelykonsertin.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: '2020-08-20T17:00:00Z',
          startTime: '2020-08-20T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.vuotalo.fi/en/events/event/E39C1571D058EEE24B73595D038B7F88/Taiteiden_ilta_Vuotalossa',
            fi:
              'http://www.vuotalo.fi/fi/tapahtumat/event/E39C1571D058EEE24B73595D038B7F88/Taiteiden_ilta',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52256',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65611',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675527.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'kulke:348',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:348/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:31',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:31/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Musiikki',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1808',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1808/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'musiikki',
                sv: 'musik',
                en: 'music',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:53',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:53/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:673',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:673/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Suomi (TV)',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:48',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:48/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Espan lava',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7265',
            divisions: [
              {
                type: 'muni',
                name: {
                  fi: 'Helsinki',
                  sv: 'Helsingfors',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'district',
                name: {
                  fi: 'Ullanlinna',
                  sv: 'Ulrikasborg',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'neighborhood',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
              {
                type: 'sub_district',
                name: {
                  fi: 'Kaartinkaupunki',
                  sv: 'Gardesstaden',
                  en: null,
                  __typename: 'LocalizedObject',
                },
                __typename: 'Division',
              },
            ],
            hasUpcomingEvents: null,
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7265/',
            email: null,
            infoUrl: {
              fi: 'http://www.espanlava.fi/',
              sv: 'http://www.espanlava.fi/',
              en: 'http://www.espanlava.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Espan lava',
              en: 'Espa Stage',
              sv: 'Esplanadestraden',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Eteläesplanadi 1',
              sv: 'Södra Esplanaden 1',
              en: 'Eteläesplanadi 1',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.950249, 60.16771],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36566',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: null,
            fi: 'Maja Mannila Trio – Taiteiden ilta',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Maja Mannila on nuori, mutta paljon lupaava jazz/soul-laulaja, pianisti ja säveltäjä.</p><p>Hän esittää englanninkielisiä kappaleita, jotka ovat tyyliltään sekoitus r\'n\'b-tä, soulia, jazzia ja gospel-musiikkia. Maja julkaisi juuri kesäkuussa singlen "Sea and Shore". Muusikkoperheen kasvatilla on varma ote musisointiin samalla kun hän painottaa vapauden ja hauskanpidon olevan tärkeää musiikin luomisessa ja soittamisessa. Maja on noteerattu englantilaisen rumpali Richard Spavenin ja laulaja Anthony Strongin toimesta, jotka ovat pyytäneet Majaa esiintymään kanssaan, ja kansainvälistyminen on muutenkin käynnissä.</p><p>Maja Mannila Triossa Mannilan kanssa musisoivat Mikko Antila (rummut) ja Johannes Granroth (basso)</p><p>Yhteistyökumppanit: Ravintola Kappeli, Musiikin edistämissäätiö</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Maja Mannila on nuori, mutta paljon lupaava jazz/soul-laulaja, pianisti ja säveltäjä.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-20T11:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en: null,
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/0BF285BF633C45291379FE77B63D4990/Maja_Mannila_Trio_',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
      ],
      __typename: 'EventListResponse',
    },
  },
};
export default eventSearchResponse;
