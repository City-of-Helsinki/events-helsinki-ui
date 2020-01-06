import getDateRangeStr from "../getDateRangeStr";

describe("getDateRangeStr function", () => {
  it("should return date range string in Finnish", () => {
    expect(getDateRangeStr("2019-12-03T08:42:36.318755Z", null, "fi")).toBe(
      "Tiistai 3. joulukuuta 2019"
    );
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "fi"
      )
    ).toBe("Tiistai 3. joulukuuta 2019");
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "fi"
      )
    ).toBe("3 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "fi"
      )
    ).toBe("3.11 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2020-12-13T10:42:36.318755Z",
        "fi"
      )
    ).toBe("3.11.2019 – 13.12.2020");
  });

  it("should return date range string in Swedish", () => {
    expect(getDateRangeStr("2019-12-03T08:42:36.318755Z", null, "sv")).toBe(
      "Tisdag 3. december 2019"
    );
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "sv"
      )
    ).toBe("Tisdag 3. december 2019");
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "sv"
      )
    ).toBe("3 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "sv"
      )
    ).toBe("3.11 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2020-12-13T10:42:36.318755Z",
        "sv"
      )
    ).toBe("3.11.2019 – 13.12.2020");
  });

  it("should return date range string in English", () => {
    expect(getDateRangeStr("2019-12-03T08:42:36.318755Z", null, "en")).toBe(
      "Tuesday 3. December 2019"
    );
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-03T10:42:36.318755Z",
        "en"
      )
    ).toBe("Tuesday 3. December 2019");
    expect(
      getDateRangeStr(
        "2019-12-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "en"
      )
    ).toBe("3 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2019-12-13T10:42:36.318755Z",
        "en"
      )
    ).toBe("3.11 – 13.12.2019");
    expect(
      getDateRangeStr(
        "2019-11-03T08:42:36.318755Z",
        "2020-12-13T10:42:36.318755Z",
        "en"
      )
    ).toBe("3.11.2019 – 13.12.2020");
  });
});
