import * as React from 'react';

import { collectionListFilterTests } from '../../../util/collections.common.tests';
import CollectionListPage from '../CollectionListPage';

describe('collection list filters', () => {
  collectionListFilterTests({ component: <CollectionListPage /> });
});
