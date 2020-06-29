import { MockedProvider } from "@apollo/react-testing";
import { act } from "@testing-library/react";
import { mount } from "enzyme";
import i18n from "i18next";
import React from "react";
import { MemoryRouter } from "react-router";
import wait from "waait";

import {
  CollectionListDocument,
  LandingPagesDocument
} from "../../../generated/graphql";
import mockCollection from "../../collection/__mocks__/collection";
import mockLandingPage from "../../landingPage/__mocks__/landingPage";
import App from "../App";
import AppRoutes from "../AppRoutes";

const mocks = [
  {
    request: {
      query: LandingPagesDocument,
      variables: { visibleOnFrontpage: true }
    },
    result: {
      data: {
        landingPages: {
          __typename: "LandingPageResponse",
          data: [mockLandingPage]
        }
      }
    }
  },
  {
    request: {
      query: CollectionListDocument,
      variables: { visibleOnFrontpage: true }
    },
    result: {
      data: {
        collectionList: {
          __typename: "CollectionListResponse",
          data: [mockCollection]
        }
      }
    }
  }
];

export async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

const wrapperCreator = (route: string) =>
  mount(
    <MockedProvider mocks={mocks} addTypename={true}>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </MockedProvider>
  );

beforeEach(() => {
  act(() => {
    i18n.changeLanguage("fi");
  });
});

it("user from supported locale will be redirect to App with that locale", async () => {
  const wrapper = wrapperCreator("/en/");
  await actWait();
  const app = wrapper.find(App);

  expect(app).toBeDefined();
  expect(app.props().match.params.locale).toEqual("en");
});

it("user from unsupported locale prefix will be redirect to route with support prefix", async () => {
  const wrapper = wrapperCreator("/vi/");
  await actWait();

  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/vi/");
});

it("user without locale prefix will be redirect to route with support prefix", async () => {
  const wrapper = wrapperCreator("/foo-url");
  await actWait();

  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/foo-url");
});

it("user with route with unsupport locale will be redirect to App anyway, with supported locale", async () => {
  const wrapper = wrapperCreator("/dk/foo");
  await actWait();

  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/dk/foo");
});
