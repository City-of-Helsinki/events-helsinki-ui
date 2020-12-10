import { screen, within } from '@testing-library/testcafe';

import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { header } from '../selectors/header';
import { getPathname } from '../utils/clientUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Landing page').page(getEnvUrl('/fi/home'));

const withinHeader = () => within(screen.getByRole('banner'));
const withinFooter = () => within(screen.getByRole('contentinfo'));

const expectToHaveLinks = (t, withinF, translations) =>
  t
    .expect(
      withinF().getByRole('link', {
        name: translations.header.searchEvents,
      }).exists
    )
    .ok()
    .expect(
      withinF().getByRole('link', {
        name: translations.header.searchCollections,
      }).exists
    )
    .ok();

test('expect to have header and footer with links', async (t) => {
  await expectToHaveLinks(t, withinHeader, translationsFi);
  await expectToHaveLinks(t, withinFooter, translationsFi);

  await t
    .click(header.languageSelector)
    .click(header.languageSelectorItemSv)
    .expect(getPathname())
    .eql('/sv/home');

  await expectToHaveLinks(t, withinHeader, translationsSv);
  await expectToHaveLinks(t, withinFooter, translationsSv);
});
