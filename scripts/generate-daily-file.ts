import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CATEGORIES } from "../src/lib/routines/categories";
import { getTodayJST, isValidDateString } from "../src/lib/routines/dateUtils";
import { generateDayMarkdown } from "../src/lib/routines/generateDay";
import { TEMPLATE } from "../src/lib/routines/template";

function setOutput(name: string, value: string) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    appendFileSync(outputPath, `${name}=${value}\n`);
  }
}

const override = process.env.TARGET_DATE?.trim();
if (override && !isValidDateString(override)) {
  console.error(`invalid TARGET_DATE: "${override}" (expected YYYY-MM-DD)`);
  process.exit(1);
}
const date = override || getTodayJST();

const dir = path.join(process.cwd(), "data", "days");
const filePath = path.join(dir, `${date}.md`);

if (existsSync(filePath)) {
  console.log(`skip: ${filePath} already exists`);
  setOutput("created", "false");
  process.exit(0);
}

mkdirSync(dir, { recursive: true });
writeFileSync(filePath, generateDayMarkdown(TEMPLATE, CATEGORIES));
console.log(`created: ${filePath}`);
setOutput("created", "true");
setOutput("date", date);
