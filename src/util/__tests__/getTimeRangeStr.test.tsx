import getTimeRangeStr from "../getTimeRangeStr";

describe("getDateRangeStr function", () => {
  it("should return time range string in Finnish", () => {
    expect(getTimeRangeStr("2019-12-03T08:42:36.318755Z", null, "fi")).toBe(
      "10.42"
    );
    expect(
      getTimeRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "fi"
      )
    ).toBe("10.42 – 12.42");
  });

  it("should return time range string in Swedish", () => {
    expect(getTimeRangeStr("2019-12-03T08:42:36.318755Z", null, "sv")).toBe(
      "10:42"
    );
    expect(
      getTimeRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "sv"
      )
    ).toBe("10:42 – 12:42");
  });

  it("should return time range string in English", () => {
    expect(getTimeRangeStr("2019-12-03T08:42:36.318755Z", null, "en")).toBe(
      "10:42 AM"
    );
    expect(
      getTimeRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "en"
      )
    ).toBe("10:42 AM – 12:42 PM");
  });
});
