import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import i18n from "i18next";
import pretty from "pretty";
import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import {
  CollectionListDocument,
  LandingPageDocument
} from "../../../generated/graphql";
import { mockCollection } from "../../collection/constants";
import { mockLandingPage } from "../../landingPage/constants";
import App from "../App";
import AppRoutes from "../AppRoutes";
import BrowserApp from "../BrowserApp";

const mocks = [
  {
    request: {
      query: CollectionListDocument
    },
    result: {
      data: {
        collectionList: {
          data: [mockCollection.collectionDetails]
        }
      }
    }
  },
  {
    request: {
      query: LandingPageDocument
    },
    result: { data: mockLandingPage }
  }
];

const wrapperCreator = (route: string) =>
  mount(
    <MemoryRouter initialEntries={[route]}>
      <MockedProvider mocks={mocks}>
        <AppRoutes />
      </MockedProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  act(() => {
    i18n.changeLanguage("fi");
  });
});

it("renders snapshot correctly", async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <BrowserApp />
        </MemoryRouter>
      </MockedProvider>,
      container
    );
    await wait(1000); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});

it("user from supported locale will be redirect to App with that locale", () => {
  const wrapper = wrapperCreator("/en/");
  const app = wrapper.find(App);

  expect(app).toBeDefined();
  expect(app.props().match.params.locale).toEqual("en");
});

it("user from unsupported locale prefix will be redirect to route with support prefix", () => {
  const wrapper = wrapperCreator("/vi/");
  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/vi/");
});

it("user without locale prefix will be redirect to route with support prefix", () => {
  const wrapper = wrapperCreator("/foo-url");
  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/foo-url");
});

it("user with route with unsupport locale will be redirect to App anyway, with supported locale", () => {
  const wrapper = wrapperCreator("/dk/foo");
  const app = wrapper.find(App);

  expect(app.props().match.params.locale).toEqual("fi");
  expect(app.props().location.pathname).toContain("/fi/dk/foo");
});
