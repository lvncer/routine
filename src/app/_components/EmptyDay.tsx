export default function EmptyDay({ date }: { date: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
      {date} のデータはまだありません。
    </div>
  );
}
