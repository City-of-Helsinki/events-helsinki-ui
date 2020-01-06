import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import Navbar from "../Navbar";

it("Navbar matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
