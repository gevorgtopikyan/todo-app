import React, { Component } from "react";
import injectSheet from "react-jss";

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
            todos: [],
            visibleTodos: [],
            completedTodos: []
        };
    }

    onTodoItemCreate = value => {
        const { todos } = this.state;
        const newTodos = [{ value, isComplete: false }, ...todos];
        this.setState({
            todos: newTodos,
            visibleTodos: this.getVisibleTodos(newTodos)
        });
    };

    onTodoCompleteChange = (isComplete, todo) => {
        const { todos } = this.state;
        const index = todos.indexOf(todo);

        const newTodos = [
            ...todos.slice(0, index),
            { ...todo, isComplete },
            ...todos.slice(index + 1)
        ];

        this.setState({
            todos: newTodos,
            completedTodos: Main.filterCompleted(newTodos),
            visibleTodos: this.getVisibleTodos(newTodos)
        });
    };

    getVisibleTodos(todos, selectedFilter) {
        if (!selectedFilter) {
            selectedFilter = this.state.selectedFilter;
        }
        if (selectedFilter === "all") {
            return todos;
        } else if (selectedFilter === "active") {
            return Main.filterActive(todos);
        } else if (selectedFilter === "complete") {
            return Main.filterCompleted(todos);
        }
    }

    onAllClick = () => {
        const { todos } = this.state;
        const selectedFilter = "all";
        this.setState({
            selectedFilter,
            visibleTodos: this.getVisibleTodos(todos, selectedFilter),
            completedTodos: Main.filterCompleted(todos)
        });
    };

    onActiveClick = () => {
        const { todos } = this.state;
        const selectedFilter = "active";
        this.setState({
            selectedFilter,
            visibleTodos: this.getVisibleTodos(todos, selectedFilter),
            completedTodos: Main.filterCompleted(todos)
        });
    };

    onCompleteClick = () => {
        const { todos } = this.state;
        const selectedFilter = "complete";
        const completedTodos = Main.filterCompleted(todos);
        this.setState({
            selectedFilter,
            visibleTodos: this.getVisibleTodos(todos, selectedFilter),
            completedTodos
        });
    };

    render() {
        const { classes } = this.props;
        const { visibleTodos, completedTodos } = this.state;
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>todos</h1>
                <CreateTodoItem
                    hasTodo={visibleTodos.length > 0}
                    onTodoItemCreate={this.onTodoItemCreate}
                />
                <TodoList
                    todos={visibleTodos}
                    completedTodos={completedTodos}
                    onTodoCompleteChange={this.onTodoCompleteChange}
                    onAllClick={this.onAllClick}
                    onActiveClick={this.onActiveClick}
                    onCompleteClick={this.onCompleteClick}
                />
            </div>
        );
    }
}

export default injectSheet(style)(Main);
