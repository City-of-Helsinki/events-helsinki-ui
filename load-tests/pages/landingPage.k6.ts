import { CollectionFieldsFragment } from '../../browser-tests/utils/generated/graphql';
import {
  loadLandingPageCollections,
  loadLandingPageData,
} from '../utils/graphql.utils.k6';
import { getRandomElement } from '../utils/random.utils.k6';
import { loadUrlDocument } from '../utils/utils.k6';

type LandingPageLoadedData = {
  collections: CollectionFieldsFragment[];
};

export const loadLandingPageDocument = (): LandingPageLoadedData => {
  loadUrlDocument('HOME');
  loadLandingPageData();
  const { data } = loadLandingPageCollections();
  return {
    collections: data.collectionList.data,
  };
};

export const getRandomCollection = (
  collections: CollectionFieldsFragment[]
): CollectionFieldsFragment =>
  getRandomElement<CollectionFieldsFragment>(collections);
