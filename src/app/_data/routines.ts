import { cacheLife, cacheTag } from "next/cache";
import { readDayFile } from "@/lib/routines/parseDay";
import { computeStats } from "@/lib/routines/stats";
import type { ParsedDay, StatsPoint } from "@/lib/routines/types";

export async function getDayCached(date: string): Promise<ParsedDay | null> {
  "use cache";
  cacheLife("max");
  cacheTag(`day:${date}`);
  return readDayFile(date);
}

export async function getStatsCached(
  start: string,
  end: string,
): Promise<StatsPoint[]> {
  "use cache";
  cacheLife("max");
  cacheTag(`stats:${start}:${end}`);
  return computeStats(start, end);
}
