import mockEvent from "../__mocks__/eventDetails";
import { getEventIdFromUrl, getServiceMapUrl } from "../EventUtils";

describe("getServiceMapUrl function", () => {
  it("get service map url", () => {
    expect(getServiceMapUrl(mockEvent, "fi", false)).toBe(
      "https://palvelukartta.hel.fi/fi/unit/123"
    );
    expect(getServiceMapUrl(mockEvent, "sv", true)).toBe(
      "https://palvelukartta.hel.fi/sv/embed/unit/123"
    );
  });
});

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
