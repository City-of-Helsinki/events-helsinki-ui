import { MockedProvider } from "@apollo/react-testing";
import * as React from "react";
import renderer from "react-test-renderer";

import { OrganizationDetailsDocument } from "../../../generated/graphql";
import { mockEventData } from "../constants";
import EventInfo from "../EventInfo";

const mocks = [
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: "provider:123"
      }
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck" }
      }
    }
  }
];

test("EventInfo matches snapshot", () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks}>
      <EventInfo eventData={mockEventData} />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
