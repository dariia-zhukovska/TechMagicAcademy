import { get, put } from "./service.js";

class Todos {
  constructor(setState) {
    this.setState = setState;
    this.todosList = [];
  }

  setTodos(todos) {
    this.todosList = todos;
    this.render();
  }

  async getTodos() {
    const todos = await get("/todos?userId=1");
    console.log(todos);
    this.setState(todos);
  }

  async updateTodoItem(id) {
    const tItem = this.todosList.find((item) => item.id === id);
    const todoItem = await put(`/todos/${id}`, {
      ...tItem,
      completed: !tItem.completed,
    });
    console.log(todoItem);
    const updatedList = this.todosList.map((item) => {
      return item.id === todoItem.id ? todoItem : item;
    });
    this.setState(updatedList);
  }

  clickHandler(id) {
    this.updateTodoItem(id);
  }

  render() {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    this.todosList.forEach((todo) => {
      const div = document.createElement("div");
      div.onclick = () => this.clickHandler(todo.id);
      div.innerHTML = `
				<div class="todos-title ${todo.completed ? "strikethrough" : ""}" > ${
        todo.title
      } </div>
			`;
      container.append(div);
    });
  }
}

export default Todos;
