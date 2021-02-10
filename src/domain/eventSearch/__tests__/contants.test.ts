import { MAPPED_PLACES, MARKETING_COLLECTION_SLUGS } from '../constants';

it('mapped places and marketing collections should not have same slugs', () => {
  const intersection = Object.keys(MAPPED_PLACES).filter((value) =>
    MARKETING_COLLECTION_SLUGS.includes(value)
  );
  expect(intersection).toHaveLength(0);
});
