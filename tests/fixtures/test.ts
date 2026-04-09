import { test as base } from "@playwright/test";

import { TodoMvcPage, type TodoFilter } from "../../pages/todo-mvc.page";
import { seedTodos, type TodoSeed } from "../support/todo-seed";

type OpenTodoPageOptions = {
  filter?: TodoFilter;
  todos?: TodoSeed[];
};

type Fixtures = {
  openTodoPage: (options?: OpenTodoPageOptions) => Promise<void>;
  todoPage: TodoMvcPage;
};

export const test = base.extend<Fixtures>({
  openTodoPage: async ({ page }, use) => {
    const todoPage = new TodoMvcPage(page);

    await use(async (options = {}) => {
      if (options.todos) {
        await seedTodos(page, options.todos);
      }

      await todoPage.goto({ filter: options.filter });
    });
  },
  todoPage: async ({ page }, use) => {
    await use(new TodoMvcPage(page));
  },
});

export { expect } from "@playwright/test";
