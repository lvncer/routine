export default function RangeForm({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  return (
    <form
      action="/stats"
      method="get"
      className="mb-6 flex flex-wrap items-end gap-3"
    >
      <label className="flex flex-col text-xs text-zinc-500 dark:text-zinc-400">
        開始日
        <input
          type="date"
          name="start"
          defaultValue={start}
          className="mt-1 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
        />
      </label>
      <label className="flex flex-col text-xs text-zinc-500 dark:text-zinc-400">
        終了日
        <input
          type="date"
          name="end"
          defaultValue={end}
          className="mt-1 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
        />
      </label>
      <button
        type="submit"
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        表示
      </button>
    </form>
  );
}
