import { render, screen } from '@testing-library/react';
import React from 'react';

import mockCollection from '../../__mocks__/collection';
import CollectionHero from '../CollectionHero';

test('should render collection hero fields', async () => {
  render(<CollectionHero collection={mockCollection} />);

  expect(screen.getByText(mockCollection.title.fi)).toBeInTheDocument();
  expect(screen.getByText(mockCollection.description.fi)).toBeInTheDocument();
  expect(screen.getByText(mockCollection.linkText.fi)).toBeInTheDocument();
});
