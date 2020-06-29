import { shallow } from "enzyme";
import { IconHome } from "hds-react";
import React from "react";

import CategoryFilter from "../CategoryFilter";

it("CategoryFilter matched snapshot", () => {
  const el = shallow(
    <CategoryFilter
      icon={<IconHome />}
      onClick={() => {}}
      text={"test"}
      value={"value"}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
