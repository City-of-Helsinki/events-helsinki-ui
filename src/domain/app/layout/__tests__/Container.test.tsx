import { shallow } from "enzyme";
import React from "react";

import Container from "../Container";

it("Container matches snapshot", () => {
  const container = shallow(<Container />);
  expect(container.html()).toMatchSnapshot();
});
