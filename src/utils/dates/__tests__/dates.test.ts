import { getValidDateObject, stripTimezoneFromISODateString } from "../dates";

describe("getValidDateObject", () => {
  const funcToTest = getValidDateObject;

  test("getValidDateObject(NaN) returns undefined", () => {
    expect(funcToTest(NaN)).toBeUndefined();
  });

  test("getValidDateObject(undefined) returns undefined", () => {
    expect(funcToTest(undefined)).toBeUndefined();
  });

  test("getValidDateObject(null) returns undefined", () => {
    expect(funcToTest(null)).toBeUndefined();
  });

  test('getValidDateObject("") returns undefined', () => {
    expect(funcToTest("")).toBeUndefined();
  });

  test('getValidDateObject("invalid string") returns undefined', () => {
    expect(funcToTest("invalid string")).toBeUndefined();
  });

  test("getValidDateObject(new Date()) returns valid Date", () => {
    expect(funcToTest(new Date())).toBeInstanceOf(Date);
  });

  test("getValidDateObject(0) returns valid Date", () => {
    expect(funcToTest(0)?.getTime()).toBe(new Date(0).getTime());
  });

  const ms = 1667469499643;
  test(`getValidDateObject(${ms}).getTime() returns ${ms}`, () => {
    expect(funcToTest(ms)?.getTime()).toBe(new Date(ms).getTime());
  });
});

describe("stripTimezoneFromISODateString", () => {
  test("strips Z (Zulu/UTC)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00Z")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips extended offset with colon (+HH:MM)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00+03:00")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips extended negative offset with colon (-HH:MM)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00-05:00")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips basic offset without colon (+HHMM)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00+0300")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips basic negative offset without colon (-HHMM)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00-0500")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips hour-only offset (+HH)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00+03")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips hour-only negative offset (-HH)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00-05")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("strips offset when milliseconds are present", () => {
    expect(
      stripTimezoneFromISODateString("2026-08-03T14:30:00.123+03:00"),
    ).toBe("2026-08-03T14:30:00.123");
  });

  test("strips Z when milliseconds are present", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00.123Z")).toBe(
      "2026-08-03T14:30:00.123",
    );
  });

  test("leaves already-naive strings unchanged (no-op)", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("leaves date-only strings unchanged", () => {
    expect(stripTimezoneFromISODateString("2026-08-03")).toBe("2026-08-03");
  });

  test("handles UTC offset of zero written as +00:00", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00+00:00")).toBe(
      "2026-08-03T14:30:00",
    );
  });

  test("handles UTC offset of zero written as -00:00", () => {
    expect(stripTimezoneFromISODateString("2026-08-03T14:30:00-00:00")).toBe(
      "2026-08-03T14:30:00",
    );
  });
});
