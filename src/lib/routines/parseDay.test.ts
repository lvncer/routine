import { describe, expect, test } from "bun:test";
import { parseDayMarkdown } from "./parseDay";
import type { Category } from "./types";

const categories: Category[] = [
  { name: "健康", color: "#22c55e" },
  { name: "仕事", color: "#3b82f6" },
];

describe("parseDayMarkdown", () => {
  test("parses headings and checkbox state", () => {
    const content = [
      "## 健康",
      "- [x] 朝ランニング — 30分",
      "- [ ] 水を飲む",
      "",
      "## 仕事",
      "- [ ] メール確認 — 重要なものに返信",
    ].join("\n");

    const result = parseDayMarkdown(content, categories);

    expect(result).toEqual([
      {
        name: "健康",
        color: "#22c55e",
        icon: undefined,
        items: [
          { title: "朝ランニング", detail: "30分", checked: true },
          { title: "水を飲む", detail: undefined, checked: false },
        ],
      },
      {
        name: "仕事",
        color: "#3b82f6",
        icon: undefined,
        items: [
          { title: "メール確認", detail: "重要なものに返信", checked: false },
        ],
      },
    ]);
  });

  test("splits on the first em dash only", () => {
    const content = ["## 健康", "- [ ] 読書 — メモ — 続き"].join("\n");
    const [category] = parseDayMarkdown(content, categories);
    expect(category.items[0]).toEqual({
      title: "読書",
      detail: "メモ — 続き",
      checked: false,
    });
  });

  test("falls back unknown categories to the end, without color/icon", () => {
    const content = [
      "## 買い物",
      "- [x] 牛乳を買う",
      "## 健康",
      "- [ ] 朝ランニング",
    ].join("\n");

    const result = parseDayMarkdown(content, categories);
    expect(result.map((c) => c.name)).toEqual(["健康", "買い物"]);
    expect(result.find((c) => c.name === "買い物")?.color).toBeUndefined();
  });

  test("ignores blank lines, unrecognized lines, and orphan tasks before any heading", () => {
    const content = [
      "- [ ] orphan task before heading",
      "",
      "random text",
      "## 健康",
      "- [ ] 朝ランニング",
    ].join("\n");

    const result = parseDayMarkdown(content, categories);
    expect(result).toHaveLength(1);
    expect(result[0].items).toHaveLength(1);
  });
});
