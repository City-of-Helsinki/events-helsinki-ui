import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import App from "../App";
import appRoutes from "../appRoutes";
import BrowserApp from "../BrowserApp";

const wrapperCreator = (route: string) =>
  mount(
    <MemoryRouter initialEntries={[route]}>
      <MockedProvider mocks={[]}>{appRoutes}</MockedProvider>
    </MemoryRouter>
  );

it("renders snapshot correctly", () => {
  const tree = mount(<BrowserApp />);
  expect(tree.html()).toMatchSnapshot();
});

it("redirect user from root to /fi/home by default", () => {
  const wrapper = wrapperCreator("/");

  expect(wrapper.children().props().history.location.pathname).toBe("/fi/home");
});

it("user from root will be redirect to App with guarantee fi locale", () => {
  const wrapper = wrapperCreator("/");
  const app = wrapper.find(App);

  expect(app).toBeDefined();
  expect(app.props().match.params.locale).toEqual("fi");
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
