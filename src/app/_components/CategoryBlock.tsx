import { resolveIcon } from "@/lib/routines/icons";
import type { ParsedCategory } from "@/lib/routines/types";
import TaskRow from "./TaskRow";

export default function CategoryBlock({
  category,
}: {
  category: ParsedCategory;
}) {
  const Icon = resolveIcon(category.icon);
  const color = category.color ?? "#71717a";
  const total = category.items.length;
  const checked = category.items.filter((item) => item.checked).length;

  return (
    <section
      className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
      style={{ borderLeftColor: color, borderLeftWidth: 4 }}
    >
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color }} aria-hidden />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {category.name}
          </h2>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {checked}/{total}
        </span>
      </header>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {category.items.map((item, i) => (
          <TaskRow key={`${item.title}-${i}`} item={item} />
        ))}
      </ul>
    </section>
  );
}
