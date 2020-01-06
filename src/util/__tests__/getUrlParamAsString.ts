import getUrlParamAsString from "../getUrlParamAsString";

describe("getUrlParamAsString function", () => {
  it("should return url param as an array", () => {
    expect(
      getUrlParamAsString(
        new URLSearchParams(
          "?param=value1, value2&param=value3, value4, value1 "
        ),
        "param"
      )
    ).toStrictEqual(["value1", "value2", "value3", "value4"]);
  });
});
