import type { Category, TemplateItem } from "./types";

export function generateDayMarkdown(
  template: TemplateItem[],
  categories: Category[],
): string {
  const order = new Map(categories.map((c, i) => [c.name, i]));
  const grouped = new Map<string, TemplateItem[]>();

  for (const item of template) {
    const list = grouped.get(item.category);
    if (list) {
      list.push(item);
    } else {
      grouped.set(item.category, [item]);
    }
  }

  const names = [...grouped.keys()].sort((a, b) => {
    const ai = order.get(a) ?? Number.POSITIVE_INFINITY;
    const bi = order.get(b) ?? Number.POSITIVE_INFINITY;
    return ai - bi;
  });

  const sections = names.map((name) => {
    const items = grouped.get(name) ?? [];
    const lines = items.map((item) =>
      item.detail
        ? `- [ ] ${item.title} — ${item.detail}`
        : `- [ ] ${item.title}`,
    );
    return `## ${name}\n${lines.join("\n")}`;
  });

  return `${sections.join("\n\n")}\n`;
}
