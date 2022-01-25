import { post } from "./service.js";
import WarningMessage from "./warning.js";

class Header extends WarningMessage {
  constructor(updateState) {
    super();
    this.updateState = updateState;
    this.addBtn = document.querySelector(".add-btn");
    this.postBtn = document.querySelector(".post-btn");
    this.input = document.querySelector(".input-area");
    this.inputBlock = document.querySelector(".input-block");

    this.addBtn.onclick = this.addClickHandler.bind(this);
    this.postBtn.onclick = this.postClickHandler.bind(this);
  }

  async postTodoItem(newItem) {
    const todoItem = await post("/todos", newItem);
    console.log(todoItem);
    this.updateState(todoItem);
  }

  addClickHandler() {
    console.log(this);
    this.inputBlock.classList.toggle("hidden");
  }

  postClickHandler() {
    const value = this.input.value;
    if (value) {
      const newItem = {
        userId: 1,
        title: value,
        completed: false,
      };
      this.postTodoItem(newItem);
      this.input.value = "";
    } else {
      this.displayWarningMsg(
        "Empty input! Please add at least one value.",
        1500
      );
    }
  }
}

export default Header;
