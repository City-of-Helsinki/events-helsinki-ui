import { getSearchQuery } from "../searchUtils";

describe("getSearchQuery function", () => {
  it("get search query", () => {
    expect(
      getSearchQuery({
        categories: [],
        dateTypes: [],
        districts: [],
        endDate: null,
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        search: "",
        startDate: null
      })
    ).toBe("");

    expect(
      getSearchQuery({
        categories: ["category1", "category2"],
        dateTypes: ["type1", "type2"],
        districts: [],
        endDate: null,
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        search: "test",
        startDate: null
      })
    ).toBe("?categories=category1,category2&dateTypes=type1,type2&search=test");

    expect(
      getSearchQuery({
        categories: [],
        dateTypes: ["type1", "type2"],
        districts: [],
        endDate: new Date("2019-12-20"),
        keywordNot: [],
        keywords: [],
        places: [],
        publisher: null,
        search: "test",
        startDate: new Date("2019-11-20")
      })
    ).toBe("?endDate=2019-12-20&search=test&startDate=2019-11-20");
  });
});
