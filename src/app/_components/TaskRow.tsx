import { Square, SquareCheck } from "lucide-react";
import type { RoutineItem } from "@/lib/routines/types";

export default function TaskRow({ item }: { item: RoutineItem }) {
  const Icon = item.checked ? SquareCheck : Square;

  return (
    <li className="flex items-start gap-3 py-2">
      <Icon
        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
          item.checked ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"
        }`}
        aria-hidden
      />
      <div>
        <p
          className={`text-sm font-medium ${
            item.checked
              ? "text-zinc-400 line-through dark:text-zinc-600"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {item.title}
        </p>
        {item.detail && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {item.detail}
          </p>
        )}
      </div>
    </li>
  );
}
