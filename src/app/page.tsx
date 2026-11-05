import Link from "next/link";
import { Suspense } from "react";
import DaySkeleton from "./_components/DaySkeleton";
import ResolvedDay from "./_components/ResolvedDay";

export default function Home(props: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        ルーティン
      </h1>
      <Suspense fallback={<DaySkeleton />}>
        <ResolvedDay searchParams={props.searchParams} />
      </Suspense>
      <nav className="mt-10 text-sm">
        <Link
          href="/stats"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          完了率の統計を見る →
        </Link>
      </nav>
    </main>
  );
}
