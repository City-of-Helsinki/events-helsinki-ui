import * as fs from 'fs';
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

const LANGUAGES = process.env.REACT_APP_SITEMAP_LANGUAGES?.split(',') || [];
const CMS_URL = process.env.REACT_APP_CMS_URL;
const LINKED_EVENTS_URL = process.env.REACT_APP_LINKED_EVENTS_URL;
const HOST = process.env.REACT_APP_HOST_URL;
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
 * Write object to a xml file
 * @param {string} path
 * @param {object} data
 */
const writeXMLFile = (path: string, data: Record<string, unknown>) => {
  const options = { compact: false, ignoreComment: true, spaces: 4 };
  const xml = convert.js2xml(data, options);

  return writeFile(path, xml, 'utf8');
};

/**
 * Get xml element object in non-compact format
 * @param {string} name
 * @param {object[]} elements
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
 * @param {object[]} elements
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
 * Fetch collections from cms
 * @return {object[]}
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
 * Get collection url elements
 * @return {object[]}
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
 * Fetch events from linkedevents
 * @return {object[]}
 */
const getEvents = async (start: Date) => {
  const events: Event[] = [];
  let url =
    `${LINKED_EVENTS_URL}/event` +
    `?start=${start.toISOString()}` +
    `&page_size=${PAGE_SIZE}` +
    '&division=kunta:helsinki' +
    '&super_event_type=umbrella,none';

  // TODO: Optimaze this to fetch events parallel
  // Loop until linkedevents returns null to next page attribute
  while (!!url) {
    const start = new Date();
    const res = await fetch(url);
    const result = await res.json();

    if (res.status !== 200) {
      throw Error(
        `Could not fetch events data from url ${url}: ${res.status} ${res.statusText}`
      );
    }

    const end = new Date();
    // eslint-disable-next-line no-console
    console.log(`GET: ${url} (${end.getTime() - start.getTime()}ms)`);

    const data = result.data;
    events.push(...data);

    url = result.meta.next;
  }

  return events;
};

/**
 * get Event url elements
 * @param {date} time
 * @return {object[]}
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
 * Generate a sitemap index in xml format that lists all sitemaps
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
        type: 'instruction',
        name: 'xml-stylesheet',
        instruction: 'type="text/xsl" href="/sitemap.xsl"',
      },
      {
        type: 'element',
        name: 'sitemapindex',
        attributes: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },

        elements: [
          ...Array(pageAmount)
            .fill(0)
            .map((v, i) =>
              getElement({
                name: 'sitemap',
                elements: [
                  getTextElement('loc', `${HOST}/sitemap_${i + 1}.xml`),
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
        type: 'instruction',
        name: 'xml-stylesheet',
        instruction: 'type="text/xsl" href="/sitemap.xsl"',
      },
      {
        type: 'element',
        name: 'urlset',
        attributes: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        elements,
      },
    ],
  };

  return writeXMLFile(`${PATH_TO_SITEMAPS}/sitemap_${page}.xml`, data);
};

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
  saveSitemapIndexPage(siteMapIndex, time);
};

/**
 * Generate a sitemaps in xml format that lists all the pages
 */
const updateSitemaps = async (): Promise<boolean> => {
  try {
    const time = new Date();
    const [collectionUrlElements, eventUrlElements] = await Promise.all([
      getCollectionUrlElements(),
      getEventUrlElements(time),
    ]);
    const elements = [...collectionUrlElements, ...eventUrlElements];

    await saveSitemapFiles(elements, time);
    return true;
  } catch (err) {
    throw err;
  }
};

export default updateSitemaps;
