import { describe, expect, test } from "bun:test";
import { computeStats } from "./stats";

describe("computeStats", () => {
  const points = computeStats("2026-10-30", "2026-11-05");
  const byDate = new Map(points.map((p) => [p.date, p]));

  test("missing day files report null instead of 0%", () => {
    expect(byDate.get("2026-11-02")?.overall).toBeNull();
    expect(byDate.get("2026-11-03")?.overall).toBeNull();
  });

  test("computes overall and per-category completion rate", () => {
    const fullyDone = byDate.get("2026-11-04");
    expect(fullyDone?.overall).toBe(100);

    const allUnchecked = byDate.get("2026-10-30");
    expect(allUnchecked?.overall).toBe(0);

    const mixed = byDate.get("2026-11-05");
    expect(mixed?.overall).toBe(50);
    expect(mixed?.categories.学習).toBe(100);
    expect(mixed?.categories.仕事).toBe(0);
  });

  test("includes categories not present in categories.yaml", () => {
    const withUnknownCategory = byDate.get("2026-11-01");
    expect(withUnknownCategory?.categories.買い物).toBe(100);
  });
});
