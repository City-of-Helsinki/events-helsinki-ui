import { render, screen } from '@testing-library/react';
import React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import { fakeCollection } from '../../../../test/mockDataUtils';
import CollectionHero from '../CollectionHero';

const title = 'Collection title';
const description = 'Collection description';
const linkText = 'Collection link text';
const collection = fakeCollection({
  description: { fi: description },
  linkText: { fi: linkText },
  title: { fi: title },
}) as CollectionFieldsFragment;

test('should render collection hero fields', async () => {
  render(<CollectionHero collection={collection} />);

  expect(screen.queryByText(title)).toBeInTheDocument();
  expect(screen.queryByText(description)).toBeInTheDocument();
  expect(screen.queryByText(linkText)).toBeInTheDocument();
});
