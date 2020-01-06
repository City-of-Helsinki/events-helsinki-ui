import { shallow } from "enzyme";
import React from "react";

import Select from "../Select";

it("Select matches snapshot", () => {
  const container = shallow(
    <Select
      onChange={() => {}}
      options={[
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" }
      ]}
      value="value2"
    />
  );
  expect(container.html()).toMatchSnapshot();
});
