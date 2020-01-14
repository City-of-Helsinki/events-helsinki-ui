import { MockedProvider } from "@apollo/react-testing";
import * as React from "react";
import renderer from "react-test-renderer";

import {
  KeywordListDocument,
  PlaceListDocument
} from "../../../../generated/graphql";
import SearchAutosuggest from "../SearchAutosuggest";

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        pageSize: 5,
        text: "search value"
      }
    },
    result: {
      data: {
        keywordList: {
          result: [{ id: "1", name: { fi: "Test" } }]
        }
      }
    }
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        pageSize: 5,
        text: "search value"
      }
    },
    result: {
      data: {
        keywordList: {
          result: [{ id: "1", name: { fi: "Test" } }]
        }
      }
    }
  }
];

test("SearchAutosuggest matches snapshot", () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks}>
      <SearchAutosuggest
        categories={[{ text: "bar", value: "foo" }]}
        onRemoveCategory={category => {}}
        onChangeSearchValue={value => {}}
        onMenuItemClick={() => {}}
        placeholder="Lorem ipsum"
        searchValue={"search value"}
      />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
