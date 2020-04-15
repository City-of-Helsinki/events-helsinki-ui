import getUrlParamAsArray from "../getUrlParamAsArray";

describe("getUrlParamAsArray function", () => {
  it("should return url param as an array", () => {
    expect(
      getUrlParamAsArray(
        new URLSearchParams(
          "?param=value1, value2&param=value3, value4, value1 "
        ),
        "param"
      )
    ).toStrictEqual(["value1", "value2", "value3", "value4"]);
  });
});
