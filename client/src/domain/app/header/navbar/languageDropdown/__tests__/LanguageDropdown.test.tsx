import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import LanguageDropdown from "../LanguageDropdown";

it("LanguageDropdown matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <LanguageDropdown />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
