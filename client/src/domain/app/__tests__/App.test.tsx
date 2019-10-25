import { shallow } from "enzyme";
import React from "react";
import { withRouter } from "react-router";

import App from "../App";

const AppWithRouter = withRouter(App);

it("renders without crashing", () => {
  shallow(<AppWithRouter />);
});
