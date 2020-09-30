import { screen } from '@testing-library/testcafe';

import { header } from '../selectors/header';
import { getPathname } from '../utils/clientUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Landing page').page(getEnvUrl('/fi/home'));

test('Changing language on landing page', async (t) => {
  await t
    .expect(screen.getAllByRole('link', { name: /etsi tekemistä/i }).count)
    .eql(2)
    .expect(screen.getAllByRole('link', { name: /suosittelemme/i }).count)
    .eql(2);

  await t
    .click(header.languageSelector)
    .click(header.languageSelectorItemSv)
    .expect(getPathname())
    .eql('/sv/home');

  await t
    .expect(screen.getAllByRole('link', { name: /sök saker att göra/i }).count)
    .eql(2)
    .expect(screen.getAllByRole('link', { name: /vi rekommenderar/i }).count)
    .eql(2);
});
