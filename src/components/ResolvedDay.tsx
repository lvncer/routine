import { connection } from "next/server";
import { getTodayJST, isValidDateString } from "@/lib/routines/dateUtils";
import { getDayCached } from "@/data/routines";
import CategoryBlock from "./CategoryBlock";
import DateNav from "./DateNav";
import EmptyDay from "./EmptyDay";

type Props = Pick<PageProps<"/">, "searchParams">;

export default async function ResolvedDay({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = typeof sp.date === "string" ? sp.date : undefined;

  let date: string;
  if (raw && isValidDateString(raw)) {
    date = raw;
  } else {
    await connection();
    date = getTodayJST();
  }

  const day = await getDayCached(date);

  return (
    <>
      <DateNav date={date} />
      {day && day.categories.length > 0 ? (
        <div className="space-y-4">
          {day.categories.map((category) => (
            <CategoryBlock key={category.name} category={category} />
          ))}
        </div>
      ) : (
        <EmptyDay date={date} />
      )}
    </>
  );
}
