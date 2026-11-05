import { describe, expect, test } from "bun:test";
import {
  enumerateDates,
  getTodayJST,
  isValidDateString,
  shiftDateString,
} from "./dateUtils";

describe("isValidDateString", () => {
  test("accepts well-formed calendar dates", () => {
    expect(isValidDateString("2026-11-05")).toBe(true);
    expect(isValidDateString("2024-02-29")).toBe(true); // leap day
  });

  test("rejects malformed or impossible dates", () => {
    expect(isValidDateString("2026/11/05")).toBe(false);
    expect(isValidDateString("2026-13-01")).toBe(false);
    expect(isValidDateString("2023-02-29")).toBe(false); // not a leap year
    expect(isValidDateString("not-a-date")).toBe(false);
  });
});

describe("shiftDateString", () => {
  test("shifts across a month boundary", () => {
    expect(shiftDateString("2026-11-30", 1)).toBe("2026-12-01");
    expect(shiftDateString("2026-12-01", -1)).toBe("2026-11-30");
  });

  test("shifts across a year boundary", () => {
    expect(shiftDateString("2026-12-31", 1)).toBe("2027-01-01");
    expect(shiftDateString("2027-01-01", -1)).toBe("2026-12-31");
  });
});

describe("enumerateDates", () => {
  test("includes both endpoints", () => {
    expect(enumerateDates("2026-01-30", "2026-02-02")).toEqual([
      "2026-01-30",
      "2026-01-31",
      "2026-02-01",
      "2026-02-02",
    ]);
  });
});

describe("getTodayJST", () => {
  test("rolls over to the next day ahead of UTC midnight", () => {
    expect(getTodayJST(new Date("2026-01-01T15:30:00Z"))).toBe("2026-01-02");
    expect(getTodayJST(new Date("2026-01-01T14:59:00Z"))).toBe("2026-01-01");
  });
});
