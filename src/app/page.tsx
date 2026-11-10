import Link from "next/link";
import { Suspense } from "react";
import DaySkeleton from "@/components/DaySkeleton";
import ResolvedDay from "@/components/ResolvedDay";

export default function Home(props: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <nav className="mb-10 text-sm">
        <Link
          href="/stats"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          完了率の統計を見る →
        </Link>
      </nav>
      <Suspense fallback={<DaySkeleton />}>
        <ResolvedDay searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
