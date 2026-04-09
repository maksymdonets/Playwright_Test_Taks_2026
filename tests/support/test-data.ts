import type { TodoSeed } from "./todo-seed";

export const todoTitles = {
  edited: "Buy oat milk",
  first: "Buy milk",
  second: "Pay rent",
  third: "Walk dog",
  trimmed: "Trimmed todo",
} as const;

export function buildTodoSeeds(): TodoSeed[] {
  return [
    { title: todoTitles.first },
    { title: todoTitles.second, completed: true },
    { title: todoTitles.third },
  ];
}

