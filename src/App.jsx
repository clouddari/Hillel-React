import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      input: "",
      nextId: 0,
    };
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  addTodo = () => {
    const { input, todos, nextId } = this.state;
    if (input.trim() !== "") {
      this.setState((prevState) => ({
        todos: [...prevState.todos, { id: prevState.nextId, text: input }],
        input: "",
        nextId: prevState.nextId + 1,
      }));
    }
  };

  removeTodo = (idToRemove) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== idToRemove),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTodo();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
        /> 
        <button type="submit">Add Task</button>

        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={todo.id}>
              {todo.text}
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
