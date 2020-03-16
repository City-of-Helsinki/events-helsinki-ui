import { shallow } from "enzyme";
import React from "react";

import PageWrapper from "../PageWrapper";

it("PageWrapper matched snapshot", () => {
  const pageWrapper = shallow(<PageWrapper />);
  expect(pageWrapper.html()).toMatchSnapshot();
});
