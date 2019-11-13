import { shallow } from "enzyme";
import React from "react";

import { ReactComponent as CultureIcon } from "../../../../assets/icons/svg/culture.svg";
import { Category as CategoryType } from "../../../types";
import CategoryFilters from "../CategoryFilters";

it("CategoryFilters matched snapshot", () => {
  const el = shallow(
    <CategoryFilters
      categories={[
        {
          icon: <CultureIcon />,
          text: "test",
          value: "value"
        }
      ]}
      onClickCategory={(category: CategoryType) => {}}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
