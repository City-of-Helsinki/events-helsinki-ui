import React from "react";
import { shallow } from "enzyme";
import { withRouter } from "react-router";

import App from "../App";

const AppWithRouter = withRouter(App);

it("renders without crashing", () => {
  shallow(<AppWithRouter />);
});
