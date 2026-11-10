export default function DaySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-24 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
      ))}
    </div>
  );
}
