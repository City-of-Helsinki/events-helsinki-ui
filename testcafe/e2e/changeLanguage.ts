import { screen } from '@testing-library/testcafe';

import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { header } from '../selectors/header';
import { getPathname } from '../utils/clientUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Landing page').page(getEnvUrl('/fi/home'));

test('Changing language on landing page', async (t) => {
  await t
    .expect(
      screen.getAllByRole('link', { name: translationsFi.header.searchEvents })
        .count
    )
    .eql(2)
    .expect(
      screen.getAllByRole('link', {
        name: translationsFi.header.searchCollections,
      }).count
    )
    .eql(2);

  await t
    .click(header.languageSelector)
    .click(header.languageSelectorItemSv)
    .expect(getPathname())
    .eql('/sv/home');

  await t
    .expect(
      screen.getAllByRole('link', { name: translationsSv.header.searchEvents })
        .count
    )
    .eql(2)
    .expect(
      screen.getAllByRole('link', {
        name: translationsSv.header.searchCollections,
      }).count
    )
    .eql(2);
});
