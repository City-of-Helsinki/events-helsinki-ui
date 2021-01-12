import { GraphQLClient } from 'graphql-request';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import {
  isCollectionExpired,
  isLanguageSupported,
} from '../../src/domain/collection/CollectionUtils';
import { isLanguageSupported as isLanguagePageLanguageSupported } from '../../src/domain/landingPage/utils';
import {
  CollectionFieldsFragment,
  getSdk,
  LandingPageFieldsFragment,
} from '../utils/generated/graphql';

const client = new GraphQLClient('http://localhost:4000/proxy/graphql');
const sdk = getSdk(client);

export const getExpectedLandingPageCmsData = async (
  locale: SUPPORT_LANGUAGES = SUPPORT_LANGUAGES.FI
): Promise<LandingPageFieldsFragment> => {
  const {
    landingPages: { data },
  } = await sdk.LandingPages({ visibleOnFrontpage: true });
  const landingPage = data.find((page) =>
    isLanguagePageLanguageSupported(page, locale)
  );
  return landingPage;
};

export const getExpectedCollectionList = async (
  locale: SUPPORT_LANGUAGES = SUPPORT_LANGUAGES.FI
): Promise<CollectionFieldsFragment[]> => {
  const {
    collectionList: { data },
  } = await sdk.CollectionList({ visibleOnFrontpage: true });
  const collectionList = data.filter(
    (collection) =>
      isLanguageSupported(collection, locale) &&
      !isCollectionExpired(collection)
  );
  return collectionList;
};
