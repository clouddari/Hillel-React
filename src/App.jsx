import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      input: "",
      nextId: 0,
      inputPriority: "medium",
    };
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem("todos");
    const storedNextId = localStorage.getItem("nextId");

    if (storedTodos) {
      this.setState({
        todos: JSON.parse(storedTodos),
        nextId: parseInt(storedNextId) || 0,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
      localStorage.setItem("nextId", this.state.nextId.toString());
    }
  }

  handlePriorityChange = (event) => {
    this.setState({ inputPriority: event.target.value });
  };

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  addTodo = () => {
    const { input, todos, nextId, inputPriority } = this.state;
    if (input.trim() !== "") {
      this.setState((prevState) => ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.nextId,
            text: input,
            priority: inputPriority,
            status: "in progress",
          },
        ],
        input: "",
        inputPriority: "medium",
        nextId: prevState.nextId + 1,
      }));
    }
  };

  removeTodo = (idToRemove) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== idToRemove),
    }));
  };

  toggleStatus = (idtoToggle) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === idtoToggle
          ? {
              ...todo,
              status: todo.status === "done" ? "in progress" : "done",
            }
          : todo
      ),
    }));
  };

  updatePriority = (idToUpdate, newPriority) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === idToUpdate ? { ...todo, priority: newPriority } : todo
      ),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTodo();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form">
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Enter task"
          />

          <button type="submit">Add Task</button>
        </div>

        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              <select
                value={todo.priority}
                onChange={(event) =>
                  this.updatePriority(todo.id, event.target.value)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <span
                style={{
                  textDecoration:
                    todo.status === "done" ? "line-through" : "none",
                  color: todo.status === "done" ? "grey" : "white",
                }}
              >
                {" "}
                {todo.text}
              </span>{" "}
              <em>{todo.status}</em>
              <button type="button" onClick={() => this.toggleStatus(todo.id)}>
                {todo.status === "done" ? "undo status" : "mark as done"}
              </button>
              <button type="button" onClick={() => this.removeTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default App;
