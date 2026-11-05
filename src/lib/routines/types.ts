export type Category = {
  name: string;
  color: string;
  icon?: string;
};

export type TemplateItem = {
  category: string;
  title: string;
  detail?: string;
};

export type RoutineItem = {
  title: string;
  detail?: string;
  checked: boolean;
};

export type ParsedCategory = {
  name: string;
  color?: string;
  icon?: string;
  items: RoutineItem[];
};

export type ParsedDay = {
  date: string;
  categories: ParsedCategory[];
};

export type StatsPoint = {
  date: string;
  overall: number | null;
  categories: Record<string, number | null>;
};
