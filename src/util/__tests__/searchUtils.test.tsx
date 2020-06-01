import { getSearchQuery } from "../searchUtils";

describe("getSearchQuery function", () => {
  it("get search query", () => {
    expect(
      getSearchQuery({
        categories: [],
        dateTypes: [],
        divisions: [],
        end: null,
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        start: null,
        text: ""
      })
    ).toBe("");

    expect(
      getSearchQuery({
        categories: ["category1", "category2"],
        dateTypes: ["type1", "type2"],
        divisions: [],
        end: null,
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        start: null,
        text: "test"
      })
    ).toBe("?categories=category1,category2&dateTypes=type1,type2&text=test");

    expect(
      getSearchQuery({
        categories: [],
        dateTypes: ["type1", "type2"],
        divisions: [],
        end: new Date("2019-12-20"),
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        start: new Date("2019-11-20"),
        text: "test"
      })
    ).toBe("?end=2019-12-20&start=2019-11-20&text=test");
  });
});
