import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { TemplateItem } from "./types";

const TEMPLATE_PATH = path.join(process.cwd(), "data", "template.yaml");

function loadTemplate(): TemplateItem[] {
  const raw = parse(readFileSync(TEMPLATE_PATH, "utf-8"));
  if (!Array.isArray(raw)) {
    throw new Error("data/template.yaml must be a YAML list");
  }
  return raw.map((entry, i) => {
    if (
      typeof entry?.category !== "string" ||
      typeof entry?.title !== "string"
    ) {
      throw new Error(
        `data/template.yaml[${i}] needs string "category" and "title" fields`,
      );
    }
    return {
      category: entry.category,
      title: entry.title,
      detail: typeof entry.detail === "string" ? entry.detail : undefined,
    };
  });
}

export const TEMPLATE: TemplateItem[] = loadTemplate();
