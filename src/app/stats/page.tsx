import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { CATEGORIES } from "@/lib/routines/categories";
import {
  getTodayJST,
  isValidDateString,
  shiftDateString,
} from "@/lib/routines/dateUtils";
import { getStatsCached } from "../_data/routines";
import RangeForm from "./_components/RangeForm";
import StatsChart from "./_components/StatsChart";

export default function StatsPage(props: PageProps<"/stats">) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        完了率の統計
      </h1>
      <Suspense
        fallback={
          <div className="h-80 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
        }
      >
        <StatsContent searchParams={props.searchParams} />
      </Suspense>
      <nav className="mt-10 text-sm">
        <Link
          href="/"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 今日のルーティンに戻る
        </Link>
      </nav>
    </main>
  );
}

async function StatsContent({
  searchParams,
}: Pick<PageProps<"/stats">, "searchParams">) {
  const sp = await searchParams;
  const rawEnd = typeof sp.end === "string" ? sp.end : undefined;

  let end: string;
  if (rawEnd && isValidDateString(rawEnd)) {
    end = rawEnd;
  } else {
    await connection();
    end = getTodayJST();
  }

  const rawStart = typeof sp.start === "string" ? sp.start : undefined;
  let start =
    rawStart && isValidDateString(rawStart)
      ? rawStart
      : shiftDateString(end, -29);
  if (start > end) {
    [start, end] = [end, start];
  }

  const points = await getStatsCached(start, end);

  return (
    <>
      <RangeForm start={start} end={end} />
      <StatsChart points={points} categories={CATEGORIES} />
    </>
  );
}
