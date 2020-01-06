import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import i18 from "../../../../common/translation/i18n/i18nInit";
import Footer from "../Footer";

test("Footer matches snapshot", () => {
  const component = renderer.create(
    <I18nextProvider i18n={i18}>
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    </I18nextProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
