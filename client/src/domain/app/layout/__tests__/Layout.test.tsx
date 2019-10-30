import { shallow } from "enzyme";
import React from "react";

import Layout from "../Layout";

it("Layout matched snapshot", () => {
  const layout = shallow(
    <Layout>
      <></>
    </Layout>
  );
  expect(layout.html()).toMatchSnapshot();
});
