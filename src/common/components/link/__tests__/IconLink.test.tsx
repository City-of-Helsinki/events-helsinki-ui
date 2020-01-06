import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import { ReactComponent as SearchIcon } from "../../../../assets/icons/svg/search.svg";
import IconLink from "../IconLink";

it("Navbar matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <IconLink icon={<SearchIcon />} text="test" to="/test" />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
