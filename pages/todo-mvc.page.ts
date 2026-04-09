import { expect, type Locator, type Page } from "@playwright/test";

import { BasePage } from "./base.page";

export type TodoFilter = "all" | "active" | "completed";

type OpenOptions = {
  filter?: TodoFilter;
};

export class TodoMvcPage extends BasePage {
  readonly app: Locator;
  readonly heading: Locator;
  readonly newTodoInput: Locator;
  readonly mainSection: Locator;
  readonly footer: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.app = page.locator(".todoapp");
    this.heading = this.app.getByRole("heading", { name: "todos" });
    this.newTodoInput = this.app.getByPlaceholder("What needs to be done?");
    this.mainSection = this.app.locator(".main");
    this.footer = this.app.locator(".footer");
    this.todoList = this.app.locator(".todo-list");
    this.todoItems = this.todoList.locator("li");
    this.todoLabels = this.todoItems.locator("label");
    this.toggleAllCheckbox = this.app.getByLabel("Mark all as complete");
    this.clearCompletedButton = this.app.getByRole("button", { name: "Clear completed" });
  }

  async goto(options: OpenOptions = {}): Promise<void> {
    await this.navigate(this.routeFor(options.filter ?? "all"));
    await this.expectVisible(this.heading);
  }

  async addTodo(title: string): Promise<void> {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press("Enter");
  }

  async addTodos(titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.addTodo(title);
    }
  }

  async toggleTodo(title: string): Promise<void> {
    await this.todoCheckbox(title).check();
  }

  async uncheckTodo(title: string): Promise<void> {
    await this.todoCheckbox(title).uncheck();
  }

  async toggleAll(): Promise<void> {
    await this.toggleAllCheckbox.check();
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async showFilter(filter: Exclude<TodoFilter, "all">): Promise<void> {
    await this.filterLink(filter).click();
  }

  async showAll(): Promise<void> {
    await this.filterLink("all").click();
  }

  async enterEditMode(title: string): Promise<void> {
    await this.todoLabel(title).dblclick();
    await expect(this.editInput(title)).toBeVisible();
  }

  async renameTodoWithEnter(currentTitle: string, nextTitle: string): Promise<void> {
    await this.enterEditMode(currentTitle);
    const input = this.editInput(currentTitle);
    await input.fill(nextTitle);
    await input.press("Enter");
  }

  async renameTodoOnBlur(currentTitle: string, nextTitle: string): Promise<void> {
    await this.enterEditMode(currentTitle);
    const input = this.editInput(currentTitle);
    await input.fill(nextTitle);
    await this.heading.click();
  }

  async cancelRename(currentTitle: string, nextTitle: string): Promise<void> {
    await this.enterEditMode(currentTitle);
    const input = this.editInput(currentTitle);
    await input.fill(nextTitle);
    await input.press("Escape");
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async expectVisibleTitles(titles: string[]): Promise<void> {
    await expect(this.todoLabels).toHaveText(titles);
  }

  async expectTodoCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectItemsLeft(count: number): Promise<void> {
    await expect(this.footer.getByText(new RegExp(`^${count} item(?:s)? left$`))).toBeVisible();
  }

  async expectTodoCompleted(title: string): Promise<void> {
    await expect(this.todoCheckbox(title)).toBeChecked();
  }

  async expectTodoActive(title: string): Promise<void> {
    await expect(this.todoCheckbox(title)).not.toBeChecked();
  }

  async expectTodoVisible(title: string): Promise<void> {
    await expect(this.todoLabel(title)).toBeVisible();
  }

  async expectTodoHidden(title: string): Promise<void> {
    await expect(this.todoLabel(title)).toHaveCount(0);
  }

  async expectFilterSelected(filter: TodoFilter): Promise<void> {
    await expect(this.filterLink(filter)).toHaveClass(/selected/);
  }

  async expectInputEmpty(): Promise<void> {
    await expect(this.newTodoInput).toHaveValue("");
  }

  async expectMainSectionHidden(): Promise<void> {
    await expect(this.mainSection).toBeHidden();
    await expect(this.footer).toBeHidden();
  }

  private routeFor(filter: TodoFilter): string {
    switch (filter) {
      case "active":
        return "#/active";
      case "completed":
        return "#/completed";
      default:
        return "";
    }
  }

  private todoItem(title: string): Locator {
    return this.todoItems.filter({ has: this.page.getByText(title, { exact: true }) });
  }

  private todoLabel(title: string): Locator {
    return this.todoItem(title).locator("label");
  }

  private todoCheckbox(title: string): Locator {
    return this.todoItem(title).getByRole("checkbox");
  }

  private editInput(title: string): Locator {
    return this.todoItem(title).locator(".edit");
  }

  private filterLink(filter: TodoFilter): Locator {
    const label = filter === "all" ? "All" : filter === "active" ? "Active" : "Completed";

    return this.footer.getByRole("link", { name: label });
  }
}
