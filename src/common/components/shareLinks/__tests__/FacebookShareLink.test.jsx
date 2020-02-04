import { render } from "@testing-library/react";
import React from "react";

import FacebookShareLink from "../FacebookShareLink";

const getWrapper = props => render(<FacebookShareLink {...props} />);

test("should apply aria label", () => {
  const sharedLink = "https://helsinki.fi/some/";
  const { getByLabelText } = getWrapper({ sharedLink });

  expect(getByLabelText("Jaa Facebookissa"));
});

test("<FacebookShareLink /> matches snapshot", () => {
  const sharedLink = "https://helsinki.fi/some/";
  const { container } = getWrapper({ sharedLink });

  expect(container.firstChild).toMatchSnapshot();
});
