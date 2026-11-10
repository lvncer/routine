import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { shiftDateString } from "@/lib/routines/dateUtils";

export default function DateNav({ date }: { date: string }) {
  const prev = shiftDateString(date, -1);
  const next = shiftDateString(date, 1);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
  );
}
