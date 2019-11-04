import { shallow } from "enzyme";
import React from "react";

import { ReactComponent as CultureIcon } from "../../../../assets/icons/svg/culture.svg";
import CategoryFilter from "../CategoryFilter";

it("CategoryFilter matched snapshot", () => {
  const el = shallow(
    <CategoryFilter
      icon={<CultureIcon />}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log("test");
      }}
      text={"test"}
      value={"value"}
    />
  );
  expect(el.html()).toMatchSnapshot();
});
