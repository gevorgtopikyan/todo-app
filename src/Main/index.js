import React, { Component } from "react";
import injectSheet from "react-jss";
import memoize from "memoize-one";

import CreateTodoItem from "../CreateTodoItem";
import TodoList from "../TodoList";

import style from "./style";

class Main extends Component {
    static filterCompleted(todos) {
        return todos.filter(todo => todo.isComplete);
    }

    static filterActive(todos) {
        return todos.filter(todo => !todo.isComplete);
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: "all",
            todos: []
        };
    }

    onTodoItemCreate = value => {
        const { todos } = this.state;
        this.setState({
            todos: [{ value, isComplete: false }, ...todos]
        });
    };

    onTodoItemCompleteChange = (isComplete, todo) => {
        const { todos } = this.state;
        const index = todos.indexOf(todo);

        const newTodos = [
            ...todos.slice(0, index),
            { ...todo, isComplete },
            ...todos.slice(index + 1)
        ];

        this.setState({
            todos: newTodos
        });
    };

    onTodoItemRemove = todo => {
        const { todos } = this.state;
        const index = todos.indexOf(todo);
        const newTodos = [...todos];
        newTodos.splice(index, 1);

        this.setState({
            todos: newTodos
        });
    };

    onTodoItemValueChange = (value, todo) => {
        const { todos } = this.state;
        const index = todos.indexOf(todo);

        const newTodos = [
            ...todos.slice(0, index),
            { ...todo, value },
            ...todos.slice(index + 1)
        ];

        this.setState({
            todos: newTodos
        });
    };

    clearCompleteTodos = () => {
        const { todos } = this.state;
        this.setState({
            todos: Main.filterActive(todos)
        });
    };

    getVisibleTodos = memoize((todos, selectedFilter) => {
        if (selectedFilter === "all") {
            return todos;
        } else if (selectedFilter === "active") {
            return Main.filterActive(todos);
        } else if (selectedFilter === "complete") {
            return Main.filterCompleted(todos);
        }
    });

    onFilterStateChange = selectedFilter => {
        this.setState({
            selectedFilter
        });
    };

    render() {
        const { classes } = this.props;
        const { todos, selectedFilter } = this.state;

        const visibleTodos = this.getVisibleTodos(todos, selectedFilter);
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>todos</h1>
                <CreateTodoItem
                    hasTodo={visibleTodos.length > 0}
                    onTodoItemCreate={this.onTodoItemCreate}
                />
                <TodoList
                    todos={visibleTodos}
                    selectedFilter={selectedFilter}
                    onTodoItemCompleteChange={this.onTodoItemCompleteChange}
                    onTodoItemValueChange={this.onTodoItemValueChange}
                    onTodoItemRemove={this.onTodoItemRemove}
                    onFilterStateChange={this.onFilterStateChange}
                    clearCompleteTodos={this.clearCompleteTodos}
                />
            </div>
        );
    }
}

export default injectSheet(style)(Main);
