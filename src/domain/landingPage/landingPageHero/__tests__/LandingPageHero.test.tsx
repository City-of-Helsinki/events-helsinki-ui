import { mount } from "enzyme";
import * as React from "react";

import { mockLandingPage } from "../../constants";
import LandingPageHero from "../LandingPageHero";

test("LandingPageHero matches snapshot", () => {
  const tree = mount(<LandingPageHero landingPage={mockLandingPage} />);
  expect(tree.html()).toMatchSnapshot();
});

export {};
