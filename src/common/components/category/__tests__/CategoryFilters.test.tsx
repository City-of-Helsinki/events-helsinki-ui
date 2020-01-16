import { shallow } from "enzyme";
import { IconWine } from "hds-react";
import React from "react";

import { Category as CategoryType } from "../../../types";
import CategoryFilters from "../CategoryFilters";

it("CategoryFilters matched snapshot", () => {
  const el = shallow(
    <CategoryFilters
      categories={[
        {
          icon: <IconWine />,
          text: "test",
          value: "value"
        }
      ]}
      onClickCategory={(category: CategoryType) => {}}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
