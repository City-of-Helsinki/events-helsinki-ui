/* eslint-disable max-len */
/* eslint-disable sort-keys */
const eventSearchLoadMoreResponse = {
  data: {
    eventList: {
      meta: {
        count: 72,
        next:
          'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=3&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
        previous:
          'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
        __typename: 'Meta',
      },
      data: [
        {
          id: 'kulke:52258',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65619',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675528.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
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
            en: 'Duo Milla Viljamaa & Johanna Juhola – Taiteiden ilta',
            fi: 'Duo Milla Viljamaa & Johanna Juhola – Taiteiden ilta',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              '<p>Milla Viljamaa and Johanna Juhola are experienced authorities in the art of tango. Their work as a duo has astounded audiences with their jaw-dropping virtuosity, sensitivity and laid-back approach.</p><p>Over the last fifteen years, the duo has produced three albums and travelled the globe on multiple tours.</p><p>Johanna has been hailed as an undisciplined innovator in the tango genre, a world music icon and a major reformist in the field of accordion music - she has even been called a musical superhero! Johanna shakes up tango traditions wherever she goes. If she is not playing as part of the duo, she is enchanting tango aficionados around the world with her two colourful fantasy tango ensembles, Johanna Juhola Reaktori and the Johanna Juhola Trio. Johanna is well remembered as the composer of the opening ceremony music for the 2007 Eurovision Song Contest in Helsinki, towering ten meters over the festivities as the accordion-playing ice queen.</p><p>Milla was awarded the esteemed Teosto Prize in 2012 in recognition of her ‘Minne’ solo album compositions. Her first ballet score ‘Sankariveljekset’ is scheduled to be presented by the Tapiola Sinfonietta in early October. Milla also plays with the group Las Chicas del Tango that includes Johanna, as well as with the Scandinavian folk group Hereä. Early in their career, Viljamaa and Juhola travelled to Italy and won the international Ástor Piazzolla Competition in 2002. Through their instrumental music, both members of the duo are able to vividly transmit the stories, feelings and glimpses of life summoned by their songs.</p><p>The duo has released three albums; Piazzolla Passage (2003), Mi Retorno (2006) and Tango Diary (2013).</p>',
            fi:
              '<p>Johanna Juholan ja Milla Viljamaan musiikki on helsinkiläisversio tango nuevosta. Tämä uusi tango muokkautuu tekijöidensä näköiseksi säilyttäen silti tangon syvimmän olemuksen.</p><p>Argentiinalaisen tangoperinteen draama ja voimakas rytmiikka sulautuu suomalaismelankoliaan. Juholan ja Viljamaan tango on välillä ilmavaa ja leikkisää, toisinaan ylitsevuotavan pakahduttavaa. Improvisaatio sekä häivähdykset taidemusiikista, jazzista ja kansanmusiikista värittävät duon tulkintoja, jotka ovat hitsautuneet yhteen yli kymmenen vuoden yhteistyön tuloksena.</p><p>Juholan ja Viljamaan duo syntyi vuonna 2001 Sibelius-Akatemian kansanmusiikin osastolla, mistä molemmat myöhemmin valmistuivat musiikin maistereiksi. Kaksikko on työskennellyt yhdessä omien konserttiensa lisäksi useissa näyttämöteoksissa. Näistä mainittakoon duon säveltämät Tango Roto -show Savoy-teatterissa Helsingissä 2009, MedAndraOrd -nykysirkusryhmän Reverie Aleksanterin teatterissa 2007,  Kadonnut Kuu -tanssiteos Kuopio tanssii ja soi -festivaalilla 2008, Astor Piazzollan säveltämä Maria de Buenos Aires -tango-operita vuonna 2008, Valveunia -näyttämökonsertti Ateneumsalissa 2010 sekä Seitsemän Miestä -tangoteatteriteos Espoon Kaupunginteatterissa 2013.</p><p>Duon yhteistyökumppaneita ovat olleet mm. argentiinalaisen tangon Suomen huippunimet Nina ja Johna Krook, kilpatanssijat Jussi Väänänen ja Katja Koukkula sekä Sirpa Suutari ja Jukka Haapalainen, koreografi Jorma Uotinen, ohjaajat Minna Vainikainen, Tiina Puumalainen, Elina Lajunen ja Ville Saukkonen sekä vierailevat muusikot viulisti Pekka Kuusisto, basisti Sara Puljula, oopperalaulaja Jorma Hynninen ja musikaalimoniosaaja Mikko Vihma.</p><p>Duo sai työstään merkittävän tunnustuksen voittamalla lokakuussa 2002 kansainvälisen Astor Piazzolla -kilpailun (International "Citta di Castelfidardo" Award, Astor Piazzolla music section) Italiassa. Vuodesta 2002 Johanna ja Milla ovat tehneet yhteistyötä tangoprinsessa Kukka-Maaria Ahosen kanssa triona nimeltä "Las Chicas del Tango". Duon debyyttialbumi "Piazzolla Passage" (Warner/Finlandia Records) ilmestyi syksyllä 2003. Toinen levy "Mi Retorno" (Texicalli Records 2007) oli vuoden 2008 Etno-Emma ehdokkaana. Kolmas levy "Tango Diary" julkaistiin 2013.</p><p>Duo on esiintynyt Skandinavian lisäksi useissa Euroopan maissa sekä Japanissa ja Argentiinassa.</p><p>Yhteistyökumppanit: Ravintola Kappeli, Musiikin edistämissäätiö</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              'Milla Viljamaa and Johanna Juhola are experienced authorities in the art of tango. Their work as a duo has astounded audiences with their jaw-dropping virtuosity, sensitivity and laid-back approach.',
            fi:
              'Johanna Juholan ja Milla Viljamaan musiikki on helsinkiläisversio tango nuevosta. Tämä uusi tango muokkautuu tekijöidensä näköiseksi säilyttäen silti tangon syvimmän olemuksen.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-20T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/D3048080076217E2D1DA507E58B62F70/Duo_Milla_Viljamaa_Johanna_Juhola',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/D3048080076217E2D1DA507E58B62F70/Duo_Milla_Viljamaa_Johanna_Juhola',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52261',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65614',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675536.jpg',
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
            en: 'Big Band Marathon: Roast Burn Big Band – Open Stage',
            fi: 'Big Band Marathon: Roast Burn Big Band – Open Stage',
            sv: 'Big Band Marathon: Roast Burn Big Band – Open Stage',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Roast Burn Big Band on pasunisti Aarni Häkkisen yhteen kokoama joukkio nuoren sukupolven jazzmuusikoita.</p><p>Useat orkesterin jäsenet ovat jo niittäneet mainetta omien yhtyeidensä kanssa, ja jotkut ovat myös luoneet kansainvälistä uraa. Espan lavalla Roast Burn Big Band saa solistivieraakseen pianisti Markus Niittysen, jonka sävellyksistä RBBB:n taiteellinen johtaja Häkkinen on luonut big bandille sopivan kokonaisuuden. Karanteeniajan jälkeen big band -musisoinnin hallitsevat Suomen mestarit palavat halusta päästä yleisön eteen, joten tätä konserttia ei kannata jättää väliin!</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Roast Burn Big Band on pasunisti Aarni Häkkisen yhteen kokoama joukkio nuoren sukupolven jazzmuusikoita.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-23T14:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/073EFA0E7EC84354233724278AF2BF57/Big_Band_Marathon_Roast_Burn_Big_Band',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/073EFA0E7EC84354233724278AF2BF57/Big_Band_Marathon_Roast_Burn_Big_Band',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/073EFA0E7EC84354233724278AF2BF57/Big_Band_Marathon_Roast_Burn_Big_Band',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52255',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65615',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675545.jpg',
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
            fi: 'UMO Helsinki Jazz Orchestra – Big Band Classics',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Kapellimestarina Ed Partyka.</p><p>UMO Helsinki Jazz Orchestra on jazzin ja uuden rytmimusiikin alalla toimiva kulttuuriorganisaatio, joka järjestää vuosittain noin 100 konserttia ja tapahtumaa.</p><p>UMO Helsingin tapahtumien sisällön tuottaa 16-henkinen kuukausipalkkainen big band -orkesteri ja järjestää nelihenkinen hallinto.</p><p>UMO Helsinki on toiminut vuodesta 1975 ja ollut Helsingin kaupungin tytärsäätiö vuodesta vuodesta 2008.</p><p>UMO Helsinki Jazz Orchestra saa rahoituksensa Helsingin kaupungilta (vuonna 2019: 46 %) sekä Opetus- ja kulttuuriministeriöltä (vuonna 2019: 28 %). UMO-säätiön omarahoitusosuus oli viime vuonna 26 %.</p><p>UMO Helsinki on yksi orkesterikentän tehokkaimmista toimijoista (Talouselämä 44/2015).</p><p>Menneiden neljän vuosikymmenen aikana UMO Helsinki on konsertoinut jazzmaailman huippujen kanssa. Orkesterin solisteina ovat vierailleet lukuisat jazzlegendat Dizzy Gillespiestä Natalie Coleen, Manhattan Transferiin ja Gregory Porteriin. Orkesterin nettihistoriikki löytyy osoitteesta www.umo.fi/40<br>Orkesteri on julkaissut jo 60 albumia ja sen ohjelmistoon kuuluu yli 3000 sävellystä.</p><p>Monipuolinen orkesteri on palkittu mm. Emma-palkinnolla sekä valtion säveltaidepalkinnolla.</p><p>UMO Helsinki Jazz Orchestra on valtakunnallisesti merkittävä ja ainutlaatuinen kokoonpano, sekä yksi tärkeimmistä toimijoista kotimaisella jazzkentällä. UMO Helsinki toimii aktiivisesti sekä kotimaisissa että kansainvälisissä verkostoissa, joita ovat mm. European Music Circle, European Jazz Network, Suomen Sinfoniaorkesterit ry ja Suomen Jazzliitto.</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi: 'Kapellimestarina Ed Partyka.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-28T11:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en: null,
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/07D30305E4E8F756E8C620057EC1B8B6/UMO_Helsinki_Jazz_Orchestra',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52257',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65616',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675546.jpg',
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
            en: 'UMO Helsinki Jazz Orchestra - Big Band Classics – Open Stage',
            fi: 'UMO Helsinki Jazz Orchestra - Big Band Classics – Open Stage',
            sv: 'UMO Helsinki Jazz Orchestra - Big Band Classics – Open Stage',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Kapellimestarina Ed Partyka.</p><p>UMO Helsinki Jazz Orchestra on jazzin ja uuden rytmimusiikin alalla toimiva kulttuuriorganisaatio, joka järjestää vuosittain noin 100 konserttia ja tapahtumaa.</p><p>UMO Helsingin tapahtumien sisällön tuottaa 16-henkinen kuukausipalkkainen big band -orkesteri ja järjestää nelihenkinen hallinto.</p><p>UMO Helsinki on toiminut vuodesta 1975 ja ollut Helsingin kaupungin tytärsäätiö vuodesta vuodesta 2008.</p><p>UMO Helsinki Jazz Orchestra saa rahoituksensa Helsingin kaupungilta (vuonna 2019: 46 %) sekä Opetus- ja kulttuuriministeriöltä (vuonna 2019: 28 %). UMO-säätiön omarahoitusosuus oli viime vuonna 26 %.</p><p>UMO Helsinki on yksi orkesterikentän tehokkaimmista toimijoista (Talouselämä 44/2015).</p><p>Menneiden neljän vuosikymmenen aikana UMO Helsinki on konsertoinut jazzmaailman huippujen kanssa. Orkesterin solisteina ovat vierailleet lukuisat jazzlegendat Dizzy Gillespiestä Natalie Coleen, Manhattan Transferiin ja Gregory Porteriin. Orkesterin nettihistoriikki löytyy osoitteesta www.umo.fi/40<br>Orkesteri on julkaissut jo 60 albumia ja sen ohjelmistoon kuuluu yli 3000 sävellystä.</p><p>Monipuolinen orkesteri on palkittu mm. Emma-palkinnolla sekä valtion säveltaidepalkinnolla.</p><p>UMO Helsinki Jazz Orchestra on valtakunnallisesti merkittävä ja ainutlaatuinen kokoonpano, sekä yksi tärkeimmistä toimijoista kotimaisella jazzkentällä. UMO Helsinki toimii aktiivisesti sekä kotimaisissa että kansainvälisissä verkostoissa, joita ovat mm. European Music Circle, European Jazz Network, Suomen Sinfoniaorkesterit ry ja Suomen Jazzliitto.</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi: 'Kapellimestarina Ed Partyka.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-28T13:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/556B6E3E00CCF8138D0CE10CA0AF3600/UMO_Helsinki_Jazz_Orchestra_-_Big_Band_Classics',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/556B6E3E00CCF8138D0CE10CA0AF3600/UMO_Helsinki_Jazz_Orchestra_-_Big_Band_Classics',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/556B6E3E00CCF8138D0CE10CA0AF3600/UMO_Helsinki_Jazz_Orchestra_-_Big_Band_Classics',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'helsinki:afzvyllnwq',
          eventStatus: 'EventScheduled',
          externalLinks: [],
          images: [
            {
              id: '65558',
              name: 'Kesäkonsertti',
              url:
                'https://api.hel.fi/linkedevents/media/images/kesakahvila_6.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
            {
              id: 'yso:p25977',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p25977/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'pop up -ilmiöt',
                sv: 'pop up-fenomen',
                en: 'pop up phenomena',
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
              isFree: true,
              price: null,
              description: null,
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          name: {
            en: 'Summer concerts at Musiikkitalo',
            fi: 'Kesäkonsertit Musiikkitalossa',
            sv: 'Pop-up-konserter i Musikhuset',
            __typename: 'LocalizedObject',
          },
          description: {
            en:
              "<p>Sibelius Academy students play pop up -concerts during the summertime at Musiikkitalo terrace. </p><p>Music  will range from classical and folk music to jazz and pop. Most of the concerts are held at the brand new terrace, so there it's possible to  enjoy a fresh drink or hot coffee while enjoying the music.</p><p>Musiikkitalo, terrace<br>13.7.-30.8. daily at 14.00</p><p>Free entry, duration 45 min</p>",
            fi:
              '<p>Musiikkitalossa kuullaan ilmaiskonsertti joka kesäiltapäivä Taideyliopiston Sibelius-Akatemian lahjakkailta muusikoilta kesä-heinäkuussa.</p><p>Ohjelmassa ei ole punaista lankaa tyylilajien tai sisällön osalta – yhdistävänä tekijänä on vain takuuvarma laatu. Luvassa on ainakin klassista, kansanmusiikkia, jazzia ja poppia. </p><p>Konsertit järjestetään pääsääntöisesti Musiikkitalon upouudella terassilla, jossa voi nauttia musiikin lisäksi esimerkiksi kahvista tai virvokkeista. </p><p>Musiikkitalo, terassi<br>13.7.–30.8. päivittäin klo 14</p><p>Vapaa pääsy, kesto 45 min</p>',
            sv:
              '<p>Man får njuta av levande musik i Musikhuset under  sommareftermiddagar,  när studeranden vid Sibelius Akademin uppträder på pop-up-konserter.</p><p>I konserterna spelas många slags musik t.ex. klassisk och , folkmusik, jazz och popmusik. Konserterna framförs huvudsakligen på Musikhusets terass, så där får man också njuta av smaklig mat och favoritdryck. </p><p><br>Musikhuset, terass<br>13.7.-30.8. dagligen kl 14</p><p>Fritt inträde, längd 45 min</p>',
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en:
              'Sibelius Academy students play pop up -concerts during the summertime at Musiikkitalo terrace. ',
            fi:
              'Musiikkitalossa kuullaan ilmaiskonsertti joka kesäiltapäivä Taideyliopiston Sibelius-Akatemian lahjakkailta muusikoilta kesä-heinäkuussa.',
            sv:
              'Man får njuta av levande musik i Musikhuset under  sommareftermiddagar,  när studeranden vid Sibelius Akademin uppträder på pop-up-konserter.',
            __typename: 'LocalizedObject',
          },
          endTime: '2020-08-30T11:45:00Z',
          startTime: '2020-07-13T11:00:00Z',
          publisher: 'ytj:0586977-6',
          provider: {
            en: 'Sibelius Academy',
            fi: 'Sibelius-Akatemia',
            sv: 'Sibelius-Akademin',
            __typename: 'LocalizedObject',
          },
          infoUrl: {
            en: 'https://www.musiikkitalo.fi/fi/events/calendar',
            fi: 'https://www.musiikkitalo.fi/fi/events/calendar',
            sv: 'https://www.musiikkitalo.fi/sv/evenemangskalender',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52246',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65605',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675549.jpg',
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
            en: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            fi: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            sv: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Maamme arvostetuimpiin esiintyjiin lukeutuva Aili Ikonen on monipuolinen laulaja ja lauluntekijä, jota on viime vuosina kuultu useissa suosituissa tuotannoissa ja kokoonpanoissa.</p><p>Ikonen on valloittanut myös kansainvälisiä areenoita erityisesti lauluyhtye Rajattoman jäsenenä. Valovoimaisen artistin ura sisältää oman musiikkinsa lisäksi lukuisia albumeita, big band- produktioita, Ella Fitzgerald -tulkintoja ja jazziskelmiäkin. Suomen tämän hetken ykkösjazzlaulajaksi tituleerattu Ikonen esiintyy Espan lavalla yhdessä pianisti Antti Kujanpään kanssa. Ohjelmistoon mahtuu tällä kerralla myös paljon lastenmusiikkia!</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Maamme arvostetuimpiin esiintyjiin lukeutuva Aili Ikonen on monipuolinen laulaja ja lauluntekijä, jota on viime vuosina kuultu useissa suosituissa tuotannoissa ja kokoonpanoissa.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-30T09:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/46224B333534A65BE107EE1F7BD0C8E1/Aili_Ikonen_Antti_Kujanpaa',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/46224B333534A65BE107EE1F7BD0C8E1/Aili_Ikonen_Antti_Kujanpaa',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/46224B333534A65BE107EE1F7BD0C8E1/Aili_Ikonen_Antti_Kujanpaa',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:52248',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65606',
              name: '',
              url:
                'http://www.espanlava.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_675550.jpg',
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
            en: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            fi: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            sv: 'Aili Ikonen & Antti Kujanpää – Music for Kids',
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Maamme arvostetuimpiin esiintyjiin lukeutuva Aili Ikonen on monipuolinen laulaja ja lauluntekijä, jota on viime vuosina kuultu useissa suosituissa tuotannoissa ja kokoonpanoissa.</p><p>Ikonen on valloittanut myös kansainvälisiä areenoita erityisesti lauluyhtye Rajattoman jäsenenä. Valovoimaisen artistin ura sisältää oman musiikkinsa lisäksi lukuisia albumeita, big band- produktioita, Ella Fitzgerald -tulkintoja ja jazziskelmiäkin. Suomen tämän hetken ykkösjazzlaulajaksi tituleerattu Ikonen esiintyy Espan lavalla yhdessä pianisti Antti Kujanpään kanssa. Ohjelmistoon mahtuu tällä kerralla myös paljon lastenmusiikkia!</p><p>Yhteistyökumppani: Ravintola Kappeli</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: {
            en: null,
            fi:
              'Maamme arvostetuimpiin esiintyjiin lukeutuva Aili Ikonen on monipuolinen laulaja ja lauluntekijä, jota on viime vuosina kuultu useissa suosituissa tuotannoissa ja kokoonpanoissa.',
            sv: null,
            __typename: 'LocalizedObject',
          },
          endTime: null,
          startTime: '2020-08-30T11:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en:
              'http://www.espanlava.fi/en/events/event/F355A84A04ECC72260D1FB67F0FBEC1D/Aili_Ikonen_Antti_Kujanpaa',
            fi:
              'http://www.espanlava.fi/fi/tapahtumat/event/F355A84A04ECC72260D1FB67F0FBEC1D/Aili_Ikonen_Antti_Kujanpaa',
            sv:
              'http://www.espanlava.fi/sv/evenemangen/event/F355A84A04ECC72260D1FB67F0FBEC1D/Aili_Ikonen_Antti_Kujanpaa',
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'kulke:51234',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [
            {
              id: '65173',
              name: '',
              url:
                'http://www.savoyteatteri.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_669091.jpg',
              __typename: 'Image',
            },
          ],
          superEvent: null,
          inLanguage: [],
          keywords: [
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
              id: 'kulke:49',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:49/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Savoy-teatteri',
                sv: null,
                en: null,
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
              id: 'yso:p1278',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1278/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'tanssi',
                sv: 'dans',
                en: 'dance (performing arts)',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:29',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:29/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Elokuvat',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p14004',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p14004/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'keskustelu',
                sv: 'samtal',
                en: 'conversation',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:32',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:32/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Tanssi',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:733',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:733/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Luennot ja keskustelut',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p4354',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p4354/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'lapset (ikäryhmät)',
                sv: 'barn (åldersgrupper)',
                en: 'children (age groups)',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p5007',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p5007/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'sirkustaide',
                sv: 'cirkus (konstarter)',
                en: 'circus (performing arts)',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:104',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:104/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Kirjallisuus ja sanataide',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p2625',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p2625/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'teatteritaide',
                sv: 'teaterkonst',
                en: 'theatre',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:51',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:51/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Sirkus',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p8113',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p8113/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'kirjallisuus',
                sv: 'litteratur',
                en: 'literature',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p15875',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p15875/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'luennot',
                sv: 'föreläsningar',
                en: 'lectures',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p1235',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p1235/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'elokuvat',
                sv: 'filmer',
                en: 'films',
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
              id: 'kulke:33',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:33/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Teatteri',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:734',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:734/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Nuorille',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p11617',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p11617/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'nuoret',
                sv: 'ungdomar',
                en: 'young people',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'yso:p7969',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/yso:p7969/',
              dataSource: 'yso',
              hasUpcomingEvents: null,
              name: {
                fi: 'sanataide',
                sv: 'ordkonst',
                en: 'literary art',
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
            {
              id: 'kulke:105',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:105/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Lastentapahtumat',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7258',
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
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7258/',
            email: null,
            infoUrl: {
              fi: 'http://www.savoyteatteri.fi/',
              sv: 'http://www.savoyteatteri.fi/',
              en: 'http://www.savoyteatteri.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Savoy-teatteri',
              en: 'Savoy Theatre',
              sv: 'Savoy-teatern',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Kasarmikatu 46-48',
              sv: 'Kaserngatan 46-48',
              en: 'Kasarmikatu 46-48',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.947376, 60.16664],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36563',
              sv: null,
              en: null,
              __typename: 'LocalizedObject',
            },
            __typename: 'Place',
          },
          offers: [
            {
              isFree: false,
              price: null,
              description: null,
              infoUrl: {
                en: null,
                fi: 'https://web.lippu.fi/palautus/',
                sv: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Offer',
            },
          ],
          name: {
            en: null,
            fi:
              'Tietoa siirtyneistä esityksistä – Lue korvaavista esityspäivistä, peruuntuneista esityksistä ja lippukäytänteistä täältä',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi:
              '<p>Päivitetyn koronavirustilanteen vuoksi Savoy-teatterin kaikki tapahtumat siirretään pidettäviksi myöhempinä ajankohtina, mikäli sopiva ajankohta löydetään.</p><p>Savoy-teatterin liput myydään toistaiseksi ainoastaan verkkokaupasta osoitteessa www.lippu.fi<br>Vastaamme Savoyn lippuihin liittyvissä kysymyksissä sähköpostitse: raisa.ailio@hel.fi.</p><p>Tässä lista keväällä siirtyneistä tapahtumista, joille on jo määritelty uusi tapahtuma-aika.</p><p>Pe 13.3. Rajaton kevät -konsertti siirtyy su 23.8.2020<br>La 14.3. Jarmon saarella -konsertti siirtyy 1.3.2021<br>Su 15.3. Anna Puun konsertti siirtyy ke 18.11.2020. <br>Pe ja la 20.-21.3. Barbara Hendricksin konsertti siirtyy 18.10.2020. Ohjeet lippujen vaihdosta raisa.ailio@hel.fi<br>Su 22.3. Comedy Helsinki siirtyy su 25.10.2020<br>Ma 23.3. American Drama Groupin Othello-esitys siirtyy ma 21.9.2020<br>To 26.3. NITS siirtyy ti 13.10.2020<br>Pe 27.3. Great Voices: China Moses feat. UMO Helsinki Jazz Orchestra siirtyy to 5.11.2020<br>La 28.3. The Philip Glass Ensemble siirtyy ke 21.10.2020<br>To 2.4. Juice Originals feat. Riku Nieminen siirtyy ke 16.9.2020<br>Pe 3.4. La Dame Blanche siirtyy ke 26.8.2020<br>La 4.4./29.8. Kreivitär Mariza siirtyy toisen kerran su 17.1.2021 klo 14<br>Ti 7.4. Maaret Kallio – Voimana Toivo siirtyy 18.8.2020.<br>Ke 8.4. Samuli Edelmann & Orkestra Suora Lähetys siirtyy to 27.8.2020.<br>To 9.4. Alexander A. & Habana De Primera siirtyy la 31.10.2020. HUOM! uusi tapahtumapaikka, tapahtumakeskus Telakka<br>La 11.4./su 30.8. The Elvis Concert 2020 siirtyy toisen kerran la 3.4.2021 klo 19<br>Ti 14.4. Uusi Kipparikvartetti siirtyy su 20.9.2020 klo 15<br>Su 29.4. Karjalan Nuoret: Kansantanssikonsertti Kevätriemua siirtyy su 8.11.2020<br>To 23.4. Great Voices: Ola Onabulé feat. UMO Helsinki Jazz Orchestra siirtyy la 12.12.2020<br>Pe 24.4. Tuure Kilpeläinen ja Kaihon karavaani siirtyy to 15.4.2021<br>La 25.4. Tuure Kilpeläinen ja Kaihon karavaani siirtyy pe 16.4.2021<br>To 30.4. Savoyn Vappu: Reuben Kaye siirtyy to 19.11.2020<br>Pe 1.5. Savoyn Vappu: Reuben Kaye siirtyy pe 20.11.2020<br>La 2.5. Savoyn Vappu: Reuben Kaye siirtyy la 21.11.2020<br>Ma 4.5./14.9. Resonaari soi siirtyy toisen kerran ma 17.5.2021<br>Ti 5.5./su 13.9. Resonaari soi siirtyy toisen kerran ti 18.5.2021<br>La 16.5. Mänskligheten - Fredrik Lindström siirtyy pe 15.1.2021<br>To 21.5. Welcome to Night Vale siirtyy la 15.8.2020<br>La 23.5. Los Lobos siirtyy su 23.5.2021<br>Ma 25.5. Maaret Kallio - Voimana Toivo siirtyy ma 2.11.2020<br>Ti 26.5. Van der Graaf Generator siirtyy pe 6.11.2020<br>Ke 27.5. Van der Graaf Generator siirtyy la 7.11.2020<br>To 28.5. Timo Lassy & Ricky-Tick Big Band Brass siirtyy ma 16.11.<br>Pe 29.5. Ranky Tanky siirtyy to 27.5.2021 HUOM! Lippujen palautusaika 30.6.2020 saakka.</p><p>Tarkista tapahtumakohtaisesti, käykö ostettu lippu korvaavaan konserttiin sellaisenaan.</p><p>Useimmissa tapahtumissa lippujen palautuksen takaraja on ollut 14.4.2020. Tarkista sähköpostitse osoitteesta raisa.ailio@hel.fi onko sinun vielä mahdollista palauttaa ostamasi liput.</p><p>Peruuntuvat esitykset:<br>19.3. We Jazz: Kenny Barron & Dave Holland Trio featuring Johnathan Blake (1265)<br>29.3. ja 30.3. Lorna Byrne - Rakkauden voima<br>31.3. Lounaskonsertti: UMO Helsinki Jazz Orchestra plays Frank Zappa<br>5.4. TubeTour<br>16.4. Kroke<br>17.4. Gospel Power</p><p>Lippurahojen palautukset hoidetaan verkkolinkin kautta:<br>https://web.lippu.fi/palautus/</p><p>Liput voi myös palauttaa postitse.<br>Asiakkaat saavat peruutetun esityksen lipun hinnan takaisin palauttamalla lipun yhteystietoineen ja tilinumeroineen postitse Lippupisteelle osoitteeseen:</p><p>Lippupiste Oy / ”Tapahtuman nimi” palautus<br>Kalevantie 2 (B-talo)<br>33100 Tampere</p><p>Ostetuista lipuista hyvitetään lipun hinta (ei palvelu- tai toimitusmaksuja).</p><p>Palautusten maksamisessa voi olla suuren määrän vuoksi viiveitä.</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: null,
          endTime: '2020-08-31',
          startTime: '2020-06-25',
          publisher: 'ahjo:u4804001050',
          provider: null,
          infoUrl: {
            en: null,
            fi:
              'http://www.savoyteatteri.fi/fi/tapahtumat/event/7644BC383697B02F16F1B8983F34CF4E/Tietoa_siirtyneista_esityksista',
            sv: null,
            __typename: 'LocalizedObject',
          },
          __typename: 'EventDetails',
        },
        {
          id: 'helsinki:afz3r4y7fu',
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
          startTime: '2020-09-02T16:00:00Z',
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
          id: 'kulke:51857',
          eventStatus: 'EventRescheduled',
          externalLinks: [],
          images: [],
          superEvent: null,
          inLanguage: [],
          keywords: [
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
              id: 'kulke:49',
              internalId:
                'https://api.hel.fi/linkedevents/v1/keyword/kulke:49/',
              dataSource: 'kulke',
              hasUpcomingEvents: null,
              name: {
                fi: 'Savoy-teatteri',
                sv: null,
                en: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Keyword',
            },
          ],
          location: {
            id: 'tprek:7258',
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
            internalId: 'https://api.hel.fi/linkedevents/v1/place/tprek:7258/',
            email: null,
            infoUrl: {
              fi: 'http://www.savoyteatteri.fi/',
              sv: 'http://www.savoyteatteri.fi/',
              en: 'http://www.savoyteatteri.fi/',
              __typename: 'LocalizedObject',
            },
            name: {
              fi: 'Savoy-teatteri',
              en: 'Savoy Theatre',
              sv: 'Savoy-teatern',
              __typename: 'LocalizedObject',
            },
            addressLocality: {
              fi: 'Helsinki',
              sv: 'Helsingfors',
              en: 'Helsinki',
              __typename: 'LocalizedObject',
            },
            streetAddress: {
              fi: 'Kasarmikatu 46-48',
              sv: 'Kaserngatan 46-48',
              en: 'Kasarmikatu 46-48',
              __typename: 'LocalizedObject',
            },
            postalCode: '00130',
            position: {
              coordinates: [24.947376, 60.16664],
              __typename: 'PlacePosition',
            },
            telephone: {
              fi: '+358 9 310 36563',
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
                en: null,
                fi: '35 €',
                sv: null,
                __typename: 'LocalizedObject',
              },
              description: null,
              infoUrl: {
                en: null,
                fi: 'https://www.lippu.fi/eventseries/2782363',
                sv: null,
                __typename: 'LocalizedObject',
              },
              __typename: 'Offer',
            },
          ],
          name: {
            en: null,
            fi: 'Sami Saari & Jazzpojat ja Riku Niemi Orchestra',
            sv: null,
            __typename: 'LocalizedObject',
          },
          description: {
            en: null,
            fi: '<p>Kesto n. 2 h, sisältää väliajan</p><p>Ikäraja: S</p>',
            sv: null,
            __typename: 'LocalizedObject',
          },
          shortDescription: null,
          endTime: null,
          startTime: '2020-09-02T16:00:00Z',
          publisher: 'ahjo:u4804001050',
          provider: {
            en: null,
            fi: 'Elorytmi Oy',
            sv: null,
            __typename: 'LocalizedObject',
          },
          infoUrl: {
            en: null,
            fi:
              'http://www.savoyteatteri.fi/fi/tapahtumat/event/25DBA60389C4201D3EC14802CB6BC74D/Sami_Saari_Jazzpojat_ja_Riku_Niemi_Orchestra',
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
export default eventSearchLoadMoreResponse;
