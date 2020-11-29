import React from '../react';
import ReactDOM from '../react-dom';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Write here..."
                    value={this.state.value}
                    onChange={event => {
                        this.setState({value: event.target.value})
                    }}
                />
                <button
                    onClick={() => {
                        if (this.state.value) {
                            this.props.addTodo(this.state.value);
                            this.setState({ value: '' });
                        }
                    }}
                >
                    Submit
                </button>
            </div>
        );
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    render() {
        const { todos } = this.state;

        return (
            <div>
                <TodoForm
                    addTodo={todo => {
                        this.setState({ todos: [...todos, todo] });
                    }}
                />
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li>
                            <p>{todo}</p>
                            <button
                                onClick={() => {
                                    const nextTodos = [...todos];
                                    nextTodos.splice(index, 1);

                                    this.setState({
                                        todos: nextTodos
                                    });
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
