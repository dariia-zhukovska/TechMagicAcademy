import Todos from '/todos.js';
import Header from './header.js';

class App {
    constructor() {
        this.state = {
            todosList: [],
        }
        this.todos = new Todos(this.setState.bind(this));
        this.header = new Header(this.updateState.bind(this));
    }

    updateState(item) {
        this.state.todosList.push(item);
        this.render();
    }

    setState(data) {
        this.state.todosList = data;
        this.render()
    }

    start() {
        this.render();
        this.todos.getTodos();
    }

    render() {
        this.todos.setTodos(this.state.todosList);
    }
}

export default App;