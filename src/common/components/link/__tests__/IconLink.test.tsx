import { shallow } from "enzyme";
import { IconSearch } from "hds-react";
import React from "react";
import { MemoryRouter } from "react-router";

import IconLink from "../IconLink";

it("Navbar matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <IconLink icon={<IconSearch />} text="test" to="/test" />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
