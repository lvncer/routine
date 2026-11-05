import {
  BookOpen,
  Briefcase,
  Heart,
  ListTodo,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  heart: Heart,
  briefcase: Briefcase,
  "book-open": BookOpen,
};

export function resolveIcon(name?: string): LucideIcon {
  return (name && ICONS[name]) || ListTodo;
}
