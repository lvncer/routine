import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { shiftDateString } from "@/lib/routines/dateUtils";

export default function DateNav({ date }: { date: string }) {
  const prev = shiftDateString(date, -1);
  const next = shiftDateString(date, 1);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <Link
          href={`/?date=${prev}`}
          prefetch
          className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="前の日"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="min-w-36 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {date}
        </span>
        <Link
          href={`/?date=${next}`}
          prefetch
          className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="次の日"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <form action="/" method="get" className="flex items-center gap-2">
          <input
            type="date"
            name="date"
            defaultValue={date}
            aria-label="表示する日付"
            className="rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
          />
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            移動
          </button>
        </form>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          今日
        </Link>
      </div>
    </div>
  );
}
