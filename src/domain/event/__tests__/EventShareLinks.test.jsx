import { render } from "@testing-library/react";
import React from "react";

import EventShareLinks from "../EventShareLinks";

const getWrapper = props => render(<EventShareLinks {...props} />);

test("should have discoverable link address copy button as well as Facebook, Twitter and LinkedIn share links", () => {
  const { queryByLabelText } = getWrapper();
  const shareLinkLabelsFI = [
    "Kopioi linkin osoite",
    "Jaa Facebookissa",
    "Jaa Twitterissä",
    "Jaa LinkedInissä"
  ];

  shareLinkLabelsFI.forEach(label => {
    expect(queryByLabelText(label)).not.toEqual(null);
  });
});
