import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CATEGORIES } from "../src/lib/routines/categories";
import { getTodayJST, isValidDateString } from "../src/lib/routines/dateUtils";
import { generateDayMarkdown } from "../src/lib/routines/generateDay";
import { TEMPLATE } from "../src/lib/routines/template";

const override = process.env.TARGET_DATE?.trim();
const date = override && isValidDateString(override) ? override : getTodayJST();

const dir = path.join(process.cwd(), "data", "days");
const filePath = path.join(dir, `${date}.md`);

if (existsSync(filePath)) {
  console.log(`skip: ${filePath} already exists`);
  process.exit(0);
}

mkdirSync(dir, { recursive: true });
writeFileSync(filePath, generateDayMarkdown(TEMPLATE, CATEGORIES));
console.log(`created: ${filePath}`);
