import React from 'react';

import { ROUTES } from '../../../../domain/app/routes/constants';
import { CollectionFieldsFragment } from '../../../../generated/graphql';
import { fakeCollection } from '../../../../util/mockDataUtils';
import { render, screen, userEvent } from '../../../../util/testUtils';
import CollectionCard from '../CollectionCard';

const description = 'Lorem ipsum';
const heroImage = 'imageurl.png';
const slug = 'collection-title';
const title = 'Collection title';

const collection = fakeCollection({
  id: slug,
  description: { fi: description },
  slug,
  heroImage: { url: heroImage },
  title: { fi: title },
}) as CollectionFieldsFragment;

test('matches snapshot', () => {
  const { container } = render(
    <CollectionCard collection={collection} size="lg" />
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});

test('should hide desciprion', () => {
  render(<CollectionCard collection={collection} size="md" />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.queryByText(description)).not.toBeInTheDocument();
});

test('should go to collection page by clicking button', () => {
  const { history } = render(
    <CollectionCard collection={collection} size="lg" />
  );

  userEvent.click(screen.getByRole('button', { hidden: true }));
  expect(history.location.pathname).toBe(
    `/fi${ROUTES.COLLECTION.replace(':slug', slug)}`
  );
});

test('should go to collection page by clicking link', () => {
  const { history } = render(
    <CollectionCard collection={collection} size="lg" />
  );

  userEvent.click(screen.getByRole('link'));
  expect(history.location.pathname).toBe(
    `/fi${ROUTES.COLLECTION.replace(':slug', slug)}`
  );
});
