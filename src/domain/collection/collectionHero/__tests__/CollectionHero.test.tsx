import { render, screen } from '@testing-library/react';
import React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import { fakeCollection } from '../../../../util/mockDataUtils';
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

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByText(linkText)).toBeInTheDocument();
});
