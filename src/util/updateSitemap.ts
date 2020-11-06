import * as fs from 'fs';
import range from 'lodash/range';
import { promisify } from 'util';
import * as convert from 'xml-js';

export type Language = 'en' | 'fi' | 'sv';
export type TitleKey = 'title_en' | 'title_fi' | 'title_sv';

export type Collection = {
  expired: boolean;
  last_published_at: string;
  slug: string;
  title_en?: string;
  title_fi?: string;
  title_sv?: string;
};

export type Event = {
  id: string;
  last_modified_time: string;
  name?: {
    en?: string;
    fi?: string;
    sv?: string;
  };
};

export type Element = {
  type: string;
  attributes?: Record<string, unknown>;
  name: string;
  elements: Record<string, unknown>[];
};

// Promises are more fun than callbacks
const writeFile = promisify(fs.writeFile);

const LANGUAGES = ['en', 'fi', 'sv'];
const STATIC_URLS = ['home'];
const CMS_URL = process.env.REACT_APP_CMS_URL;
const LINKED_EVENTS_URL = process.env.REACT_APP_LINKED_EVENTS_URL;
const HOST = process.env.PUBLIC_URL;
const PAGE_SIZE = 100;
const URLS_PER_FILE = 1000;
const PATH_TO_SITEMAPS: string = __dirname;

const isCollectionExpired = (collection: Collection) => collection.expired;

const isCollectionLanguageSupported = (
  collection: Collection,
  lang: Language
) => Boolean(collection[`title_${lang}` as TitleKey]);

const isEventLanguageSupported = (event: Event, lang: Language) =>
  Boolean(event.name?.[lang]);

/**
 * Format date to the format that are expected for Google sitemaps
 * @param {string} date
 * @return {string}
 */
export const formatDate = (date: Date | string): string =>
  new Date(date).toISOString();

/**
 * Write Object to a xml file
 * @param {string} path
 * @param {Object} data
 */
const writeXMLFile = (path: string, data: Record<string, unknown>) => {
  const options = { compact: false, ignoreComment: true, spaces: 4 };
  const xml = convert.js2xml(data, options);

  return writeFile(path, xml, 'utf8');
};

/**
 * Get xml element Object in non-compact format
 * @param {string} name
 * @param {Object[]} elements
 */
const getElement = ({
  attributes,
  elements,
  name,
}: {
  attributes?: Record<string, unknown>;
  elements: Record<string, unknown>[];
  name: string;
}) => ({
  type: 'element',
  attributes,
  name,
  elements,
});

/**
 * Get xml text element in non-compact format
 * @param {string} name
 * @param {Object[]} elements
 */
const getTextElement = (name: string, text: string) => ({
  type: 'element',
  name,
  elements: [
    {
      type: 'text',
      text,
    },
  ],
});

/**
 * Fetch collections from CMS
 * @return {Object[]}
 */
const getCollections = async (): Promise<Collection[]> => {
  const collections: Collection[] = [];
  const url = `${CMS_URL}/collections`;

  const start = new Date();
  const res = await fetch(url);
  const result = await res.json();

  if (res.status !== 200) {
    throw Error(
      `Could not fetch collections data from url ${url}: ${res.status} ${res.statusText}`
    );
  }

  const end = new Date();
  // eslint-disable-next-line no-console
  console.log(`GET: ${url} (${end.getTime() - start.getTime()}ms)`);

  collections.push(
    ...result.filter(
      (collection: Collection) => !isCollectionExpired(collection)
    )
  );

  return collections;
};

/**
 * Get static url elements
 * @param {string} date
 * @return {Object[]}
 */
const getStaticUrlElements = (time: Date): Element[] => {
  const elements: Element[] = [];

  STATIC_URLS.forEach((url) => {
    LANGUAGES.forEach((language) => {
      const element = getElement({
        name: 'url',
        elements: [
          getTextElement('loc', `${HOST}/${language}/${url}`),
          ...LANGUAGES.filter((l) => l !== language).map((hreflang) =>
            getElement({
              name: 'xhtml:link',
              attributes: {
                rel: 'alternate',
                hreflang,
                href: `${HOST}/${hreflang}/${url}`,
              },
              elements: [],
            })
          ),
          getTextElement('lastmod', formatDate(time)),
        ],
      });
      elements.push(element);
    });
  });

  return elements;
};

/**
 * Get collection url elements
 * @return {Object[]}
 */
const getCollectionUrlElements = async (): Promise<Element[]> => {
  const collections = await getCollections();

  const elements: Element[] = [];
  collections.forEach((collection) => {
    LANGUAGES.filter(
      (language) =>
        isCollectionLanguageSupported(collection, language as Language) &&
        !isCollectionExpired(collection)
    ).forEach((language) => {
      const element = getElement({
        name: 'url',
        elements: [
          getTextElement(
            'loc',
            `${HOST}/${language}/collection/${collection.slug}`
          ),
          ...LANGUAGES.filter(
            (l) =>
              l !== language &&
              isCollectionLanguageSupported(collection, l as Language)
          ).map((hreflang) =>
            getElement({
              name: 'xhtml:link',
              attributes: {
                rel: 'alternate',
                hreflang,
                href: `${HOST}/${hreflang}/collection/${collection.slug}`,
              },
              elements: [],
            })
          ),
          getTextElement('lastmod', formatDate(collection.last_published_at)),
        ],
      });
      if (element) {
        elements.push(element);
      }
    });
  });

  return elements;
};

/**
 * Fetch single events page from LinkedEvents
 * @param {string} start
 * @param {number} page
 * @return {Object[]}
 */
const getEventsPage = async (start: Date, page: number) => {
  const url =
    `${LINKED_EVENTS_URL}/event` +
    `?start=${start.toISOString()}` +
    `&page_size=${PAGE_SIZE}` +
    `&page=${page}` +
    '&division=kunta:helsinki' +
    '&super_event_type=umbrella,none';

  const startTime = new Date();
  const res = await fetch(url);
  const result = await res.json();

  if (res.status !== 200) {
    throw Error(
      `Could not fetch events data from url ${url}: ${res.status} ${res.statusText}`
    );
  }

  const endTime = new Date();
  // eslint-disable-next-line no-console
  console.log(`GET: ${url} (${endTime.getTime() - startTime.getTime()}ms)`);

  return result;
};

/**
 * Fetch events from LinkedEvents
 * @param {string} start
 * @return {Object[]}
 */
const getEvents = async (start: Date) => {
  const events: Event[] = [];

  const result = await getEventsPage(start, 1);
  events.push(...result.data);

  const count = result.meta.count;
  const pageAmount = Math.ceil(count / PAGE_SIZE);

  if (pageAmount > 1) {
    const pages = range(2, pageAmount + 1);
    const results = await Promise.all(
      pages.map((page) => getEventsPage(start, page))
    );
    results.forEach((result) => events.push(...result.data));
  }
  return events;
};

/**
 * Get event url elements
 * @param {string} time
 * @return {Object[]}
 */
const getEventUrlElements = async (time: Date): Promise<Element[]> => {
  const events = await getEvents(time);

  const elements: Element[] = [];
  events.forEach((event) => {
    LANGUAGES.filter((language) =>
      isEventLanguageSupported(event, language as Language)
    ).forEach((language) => {
      const element = getElement({
        name: 'url',
        elements: [
          getTextElement('loc', `${HOST}/${language}/event/${event.id}`),
          ...LANGUAGES.filter(
            (l) =>
              l !== language && isEventLanguageSupported(event, l as Language)
          ).map((hreflang) =>
            getElement({
              name: 'xhtml:link',
              attributes: {
                rel: 'alternate',
                hreflang,
                href: `${HOST}/${hreflang}/event/${event.id}`,
              },
              elements: [],
            })
          ),
          getTextElement('lastmod', formatDate(event.last_modified_time)),
        ],
      });
      elements.push(element);
    });
  });

  return elements;
};

/**
 * Save sitemap index page
 * @param {number} pageAmount
 * @param {string} time
 */
const saveSitemapIndexPage = (pageAmount: number, time: Date) => {
  const data = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'sitemapindex',
        attributes: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },

        elements: [
          ...range(1, pageAmount + 1).map((page) =>
            getElement({
              name: 'sitemap',
              elements: [
                getTextElement('loc', `${HOST}/sitemap_${page}.xml`),
                getTextElement('lastmod', formatDate(time)),
              ],
            })
          ),
        ],
      },
    ],
  };

  return writeXMLFile(`${PATH_TO_SITEMAPS}/sitemap.xml`, data);
};

/**
 * Save single sitemap page
 * @param {Object[]} elements
 * @param {number} page
 */
const saveSitemapPage = (elements: Element[], page: number) => {
  const data = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'urlset',
        attributes: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
        },
        elements,
      },
    ],
  };

  return writeXMLFile(`${PATH_TO_SITEMAPS}/sitemap_${page}.xml`, data);
};

/**
 * Save sitemap files
 * @param {Object[]} elements
 * @param {string} time
 */
const saveSitemapFiles = async (elements: Element[], time: Date) => {
  let items = elements.slice(0, URLS_PER_FILE);
  let siteMapIndex = 1;

  while (items.length) {
    await saveSitemapPage(items, siteMapIndex);

    items = elements.slice(
      siteMapIndex * URLS_PER_FILE,
      (siteMapIndex + 1) * URLS_PER_FILE
    );

    if (items.length) {
      siteMapIndex = siteMapIndex + 1;
    }
  }
  await saveSitemapIndexPage(siteMapIndex, time);
};

/**
 * Update all sitemaps
 */
const updateSitemaps = async (): Promise<boolean> => {
  try {
    const time = new Date();
    const staticUrlElements = getStaticUrlElements(time);
    const [collectionUrlElements, eventUrlElements] = await Promise.all([
      getCollectionUrlElements(),
      getEventUrlElements(time),
    ]);
    const elements = [
      ...staticUrlElements,
      ...collectionUrlElements,
      ...eventUrlElements,
    ];

    await saveSitemapFiles(elements, time);
    return true;
  } catch (err) {
    throw err;
  }
};

export default updateSitemaps;
