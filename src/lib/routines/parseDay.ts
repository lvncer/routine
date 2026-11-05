import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { CATEGORIES } from "./categories";
import type { Category, ParsedCategory, ParsedDay, RoutineItem } from "./types";

const HEADING_RE = /^##\s+(.+?)\s*$/;
const TASK_RE = /^\s*-\s*\[([ xX])\]\s*(.+?)\s*$/;
const DETAIL_SEPARATOR = "—";

export function parseDayMarkdown(
  content: string,
  categories: Category[],
): ParsedCategory[] {
  const order = new Map(categories.map((c, i) => [c.name, i]));
  const metaByName = new Map(categories.map((c) => [c.name, c]));
  const itemsByName = new Map<string, RoutineItem[]>();
  const appearanceOrder: string[] = [];
  let current: string | null = null;

  for (const line of content.split(/\r?\n/)) {
    const heading = HEADING_RE.exec(line);
    if (heading) {
      current = heading[1];
      if (!itemsByName.has(current)) {
        itemsByName.set(current, []);
        appearanceOrder.push(current);
      }
      continue;
    }

    if (current === null) continue;

    const task = TASK_RE.exec(line);
    if (!task) continue;

    const checked = task[1].toLowerCase() === "x";
    const rest = task[2];
    const dashIndex = rest.indexOf(DETAIL_SEPARATOR);
    const title =
      dashIndex === -1 ? rest.trim() : rest.slice(0, dashIndex).trim();
    const detailRaw = dashIndex === -1 ? "" : rest.slice(dashIndex + 1).trim();

    itemsByName.get(current)?.push({
      title,
      detail: detailRaw.length > 0 ? detailRaw : undefined,
      checked,
    });
  }

  const sortedNames = [...appearanceOrder].sort((a, b) => {
    const ai = order.get(a) ?? Number.POSITIVE_INFINITY;
    const bi = order.get(b) ?? Number.POSITIVE_INFINITY;
    return ai - bi;
  });

  return sortedNames.map((name) => {
    const meta = metaByName.get(name);
    return {
      name,
      color: meta?.color,
      icon: meta?.icon,
      items: itemsByName.get(name) ?? [],
    };
  });
}

export function readDayFile(date: string): ParsedDay | null {
  const filePath = path.join(process.cwd(), "data", "days", `${date}.md`);
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8");
  return { date, categories: parseDayMarkdown(content, CATEGORIES) };
}
