import { GraphQLClient } from 'graphql-request';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import { isCollectionVisible } from '../../src/domain/collection/CollectionUtils';
import { isLanguageSupported as isLanguagePageLanguageSupported } from '../../src/domain/landingPage/utils';
import {
  CollectionFieldsFragment,
  getSdk,
  LandingPageFieldsFragment,
} from '../utils/generated/graphql';
import { getGraphQLUrl } from '../utils/settings';

const client = new GraphQLClient(getGraphQLUrl());
const sdk = getSdk(client);

const getLandingPageCmsData = async (
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

const getCollectionList = async (
  locale: SUPPORT_LANGUAGES = SUPPORT_LANGUAGES.FI
): Promise<CollectionFieldsFragment[]> => {
  const {
    collectionList: { data },
  } = await sdk.CollectionList({ visibleOnFrontpage: true });
  const collectionList = data.filter((collection) =>
    isCollectionVisible(collection, locale)
  );
  return collectionList;
};

export const landingPageDataSource = {
  getLandingPageCmsData,
  getCollectionList,
};
