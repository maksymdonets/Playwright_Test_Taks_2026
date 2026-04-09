import type { Page } from "@playwright/test";

export type TodoSeed = {
  completed?: boolean;
  id?: string;
  title: string;
};

const STORAGE_KEY = "react-todos";

function buildSeedItem(todo: TodoSeed, index: number) {
  return {
    completed: todo.completed ?? false,
    id: todo.id ?? `seed-${index + 1}`,
    title: todo.title,
  };
}

export async function seedTodos(page: Page, todos: TodoSeed[]): Promise<void> {
  const payload = todos.map(buildSeedItem);

  await page.addInitScript(
    ({ key, seededTodos }) => {
      window.localStorage.setItem(key, JSON.stringify(seededTodos));
    },
    {
      key: STORAGE_KEY,
      seededTodos: payload,
    },
  );
}

export { STORAGE_KEY as TODO_STORAGE_KEY };
