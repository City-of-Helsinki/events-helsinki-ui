import * as React from "react";
import renderer from "react-test-renderer";

import DateRangePicker from "../DateRangePicker";

test("DateRangePicker matches snapshot", () => {
  const component = renderer.create(
    <DateRangePicker
      endDate={new Date("2019-12-20")}
      locale="fi"
      onChangeEndDate={date => {}}
      onChangeStartDate={date => {}}
      startDate={new Date("2019-11-20")}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
