import { format as formatDateStr } from "date-fns";
import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";
import { promisify } from "util";
import * as convert from "xml-js";

// Promises are more fun than callbacks
const writeFile = promisify(fs.writeFile);

const languages = process.env.SITEMAP_LANGUAGES.split(",");
const cmsUrl = process.env.CMS_URL;
const linkedEventsUrl = process.env.LINKED_EVENTS_URL;
const host = process.env.HOST_URL;
const pageSize = 100;
const pathToSitemaps: string = path.join(__dirname, "../public");

const now = new Date();

interface SimpleCollection {
  id: string;
  last_published_at: string;
}

interface SimpleEvent {
  id: string;
  last_modified_time: string;
}

/**
 * Format date to the format that are expected for Google sitemaps
 * @param {string} date
 * @return {string}
 */
export const formatDate = (date: string): string =>
  formatDateStr(new Date(date), "yyyy-MM-dd");

/**
 * Write object to a xml file
 * @param {string} path
 * @param {object} data
 */
const writeXMLFile = (path: string, data: object) => {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const xml = convert.js2xml(data, options);

  return writeFile(path, xml, "utf8");
};

/**
 * Fetch events from linkedevents
 * @param {string} language
 * @return {object[]}
 */
const getEvents = async (language: string) => {
  const events: SimpleEvent[] = [];
  let url =
    `${linkedEventsUrl}/event` +
    `?language=${language}` +
    `&start=${now.toISOString()}` +
    `&page_size=${pageSize}` +
    "&division=kunta:helsinki" +
    "&super_event_type=umbrella,none";

  // Loop until linkedevents returns null to next page attribute
  while (!!url) {
    const start = new Date();
    const res = await fetch(url);
    const result = await res.json();

    if (res.status !== 200) {
      throw Error(
        `Could not fetch ${language} events data from url ${url}: ${res.status} ${res.statusText}`
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
 * Generate sitemap in xml format for events in selected language
 * @param {object[]} events
 * @param {string} language
 */
const generateEventSitemap = (events: SimpleEvent[], language: string) => {
  const data = {
    _declaration: { _attributes: { encoding: "utf-8", version: "1.0" } },
    urlset: {
      _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
      url: [
        ...events.map(event => ({
          lastmod: formatDate(event.last_modified_time),
          loc: `${host}/${language}/event/${event.id}`
        }))
      ]
    }
  };

  return writeXMLFile(`${pathToSitemaps}/sitemap_events_${language}.xml`, data);
};

/**
 * Generate sitemap in xml format for events in all languages
 */
const generateEventSitemaps = async () => {
  return Promise.all(
    languages.map(async lang => {
      const events = await getEvents(lang);
      return generateEventSitemap(events, lang);
    })
  );
};

/**
 * Fetch collections from cms
 * @return {object[]}
 */
const getCollections = async (): Promise<SimpleCollection[]> => {
  const collections: SimpleCollection[] = [];
  const url = `${cmsUrl}/collections`;

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

  collections.push(...result);

  return collections;
};

/**
 * Generate sitemap in xml format for collections in selected language
 * @param {object[]} collections
 * @param {string} language
 */
const generateCollectionSitemap = (
  events: SimpleCollection[],
  language: string
) => {
  const data = {
    _declaration: { _attributes: { encoding: "utf-8", version: "1.0" } },
    urlset: {
      _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
      url: [
        ...events.map(event => ({
          lastmod: formatDate(event.last_published_at),
          loc: `${host}/${language}/event/${event.id}`
        }))
      ]
    }
  };

  return writeXMLFile(
    `${pathToSitemaps}/sitemap_collections_${language}.xml`,
    data
  );
};

/**
 * Generate sitemaps in xml format for collections in all languages
 */
const generateCollectionSitemaps = async () => {
  const collections = await getCollections();
  return Promise.all(
    languages.map(lang => generateCollectionSitemap(collections, lang))
  );
};

/**
 * Generate a sitemap index in xml format that lists all sitemaps
 */
const generateSitemapIndex = () => {
  const data = {
    _declaration: { _attributes: { encoding: "utf-8", version: "1.0" } },
    sitemapindex: {
      _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
      sitemap: [
        ...languages.map(language => ({
          loc: `${host}/sitemap_events_${language}.xml`
        })),
        ...languages.map(language => ({
          loc: `${host}/sitemap_collections_${language}.xml`
        }))
      ]
    }
  };

  return writeXMLFile(`${pathToSitemaps}/sitemap.xml`, data);
};

/**
 * Generate a sitemaps in xml format that lists all the pages
 */
const generateSitemaps = async () => {
  try {
    await Promise.all([
      generateEventSitemaps(),
      generateCollectionSitemaps(),
      generateSitemapIndex()
    ]);
    console.log("Sitemaps generated!"); // eslint-disable-line
  } catch (err) {
    console.error(err.message); // eslint-disable-line
    process.exit(1);
  }
};

generateSitemaps();
