import { shallow } from "enzyme";
import { IconWine } from "hds-react";
import React from "react";

import CategoryFilter from "../CategoryFilter";

it("CategoryFilter matched snapshot", () => {
  const el = shallow(
    <CategoryFilter
      icon={<IconWine />}
      onClick={() => {}}
      text={"test"}
      value={"value"}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
