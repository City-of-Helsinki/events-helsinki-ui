import { screen } from '@testing-library/testcafe';

export const header = {
  languageSelector: screen.getByRole('button', {
    name: /suomi - kielivalikko/i,
  }),
  languageSelectorItemEn: screen.getByRole('menuitem', { name: /in english/i }),
  languageSelectorItemFi: screen.getByRole('menuitem', { name: /suomeksi/i }),
  languageSelectorItemSv: screen.getByRole('menuitem', { name: /på svenska/i }),
};
