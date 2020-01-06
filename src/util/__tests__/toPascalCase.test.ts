import toPascalCase from "../toPascalCase";

describe("toCamelCase function", () => {
  it("convert snake case string to camel case", () => {
    expect(toPascalCase("STRING_TO_PASCAL_CASE")).toBe("StringToPascalCase");
  });
});
