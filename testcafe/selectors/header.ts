import { screen } from '@testing-library/testcafe';

import translations from '../../src/common/translation/i18n/fi.json';

export const header = {
  languageSelector: screen.getByRole('button', {
    name: translations.header.changeLanguage,
  }),
  languageSelectorItemEn: screen.getByRole('link', {
    name: translations.header.languages.en,
  }),
  languageSelectorItemFi: screen.getByRole('link', {
    name: translations.header.languages.fi,
  }),
  languageSelectorItemSv: screen.getByRole('link', {
    name: translations.header.languages.sv,
  }),
};
