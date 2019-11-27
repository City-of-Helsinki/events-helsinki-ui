import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import Layout from "../Layout";

it("Layout matched snapshot", () => {
  const layout = shallow(
    <MemoryRouter>
      <Layout>
        <></>
      </Layout>
    </MemoryRouter>
  );
  expect(layout.html()).toMatchSnapshot();
});
