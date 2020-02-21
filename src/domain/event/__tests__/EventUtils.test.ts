import { getEventIdFromUrl } from "../EventUtils";

describe("getEventIdFromUrl function", () => {
  it("get event id", () => {
    expect(
      getEventIdFromUrl("http://localhost:3000/fi/event/helsinki:afxh3naida")
    ).toBe("helsinki:afxh3naida");
    expect(
      getEventIdFromUrl(
        "http://localhost:3000/fi/event/helsinki:afxh3naida?id=123"
      )
    ).toBe("helsinki:afxh3naida");
    expect(
      getEventIdFromUrl(
        "http://localhost:3000/fi/collection/helsinki:afxh3naida"
      )
    ).toBe(null);
  });
});
