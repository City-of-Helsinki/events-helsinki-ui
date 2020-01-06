import { shallow } from "enzyme";
import React from "react";
import { I18nextProvider } from "react-i18next";

import i18 from "../../../../../common/translation/i18n/i18nInit";
import MobileNavigationMenu from "../MobileNavigationMenu";

it("MobileNavigationMenu matches snapshot", () => {
  const container = shallow(
    <I18nextProvider i18n={i18}>
      <MobileNavigationMenu isMenuOpen={true} onMenuClose={() => {}} />
    </I18nextProvider>
  );
  expect(container.html()).toMatchSnapshot();
});
