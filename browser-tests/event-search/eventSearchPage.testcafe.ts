import { screen } from '@testing-library/testcafe';

import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import { getPageTitle, getPathname } from '../utils/browserUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Event search page')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    await t.click(screen.findAllByRole('link', { name: /etsi tekemistä/i }));
  });

test('is navigable from landing page header', async (t) => {
  await t
    .expect(getPathname())
    .eql(`/fi/events`)
    .expect(getPageTitle())
    .eql('Tapahtumat');
});

test('shows neighbourhoods in filter options', async (t) => {
  await t.click(screen.findByLabelText('Etsi alue'));
  const neighbourhoodOptions = await searchFilterDataSource.getNeighborhoodOptions();
  await t.expect(neighbourhoodOptions.length).gt(0);
  for (const neighbourhood of neighbourhoodOptions) {
    await t
      .expect(
        screen.findByRole('checkbox', { name: neighbourhood.name.fi }).exists
      )
      .ok();
  }
});
/**
 * Note: This is kinda slow test.
 * Perhaps we could check just some of the places instead of all of them
 */
test('shows Helsinki places in filter options', async (t) => {
  await t.click(screen.findByLabelText('Etsi tapahtumapaikka'));
  const placeOptions = await searchFilterDataSource.getHelsinkiPlaceOptions();
  await t.expect(placeOptions.length).gt(0);
  for (const place of placeOptions) {
    await t
      .pressKey('ctrl+a delete') // clears previous input
      .typeText(screen.findByLabelText('Kirjoita hakusana'), place.name.fi)
      .expect(screen.findByRole('checkbox', { name: place.name.fi }).exists)
      .ok();
  }
});
