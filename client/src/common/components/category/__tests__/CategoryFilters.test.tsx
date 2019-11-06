import { shallow } from "enzyme";
import React from "react";

import { ReactComponent as CultureIcon } from "../../../../assets/icons/svg/culture.svg";
import CategoryFilters from "../CategoryFilters";

it("CategoryFilters matched snapshot", () => {
  const el = shallow(
    <CategoryFilters
      categories={[
        {
          icon: <CultureIcon />,
          onClick: (value: string) => {
            // eslint-disable-next-line no-console
            console.log(value);
          },
          text: "test",
          value: "value"
        }
      ]}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
