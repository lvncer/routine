import { enumerateDates } from "./dateUtils";
import { readDayFile } from "./parseDay";
import type { StatsPoint } from "./types";

export function computeStats(start: string, end: string): StatsPoint[] {
  return enumerateDates(start, end).map((date) => {
    const day = readDayFile(date);
    if (!day) return { date, overall: null, categories: {} };

    let totalChecked = 0;
    let totalItems = 0;
    const categories: Record<string, number | null> = {};

    for (const category of day.categories) {
      const checked = category.items.filter((item) => item.checked).length;
      const total = category.items.length;
      categories[category.name] =
        total > 0 ? Math.round((checked / total) * 100) : null;
      totalChecked += checked;
      totalItems += total;
    }

    return {
      date,
      overall:
        totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : null,
      categories,
    };
  });
}
