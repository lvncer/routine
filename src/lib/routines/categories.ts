import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { Category } from "./types";

const CATEGORIES_PATH = path.join(process.cwd(), "data", "categories.yaml");

function loadCategories(): Category[] {
  const raw = parse(readFileSync(CATEGORIES_PATH, "utf-8"));
  if (!Array.isArray(raw)) {
    throw new Error("data/categories.yaml must be a YAML list");
  }
  return raw.map((entry, i) => {
    if (typeof entry?.name !== "string" || typeof entry?.color !== "string") {
      throw new Error(
        `data/categories.yaml[${i}] needs string "name" and "color" fields`,
      );
    }
    return {
      name: entry.name,
      color: entry.color,
      icon: typeof entry.icon === "string" ? entry.icon : undefined,
    };
  });
}

export const CATEGORIES: Category[] = loadCategories();
