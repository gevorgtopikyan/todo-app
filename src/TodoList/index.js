import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import memoize from "memoize-one";

import ListItem from "./ListItem";

import style from "./style";

class TodoList extends PureComponent {
    static propTypes = {
        onTodoItemCompleteChange: PropTypes.func.isRequired,
        onTodoItemValueChange: PropTypes.func.isRequired,
        onTodoItemRemove: PropTypes.func.isRequired,
        onFilterStateChange: PropTypes.func.isRequired,
        clearCompleteTodos: PropTypes.func.isRequired,
        classes: PropTypes.shape({
            root: PropTypes.string.isRequired,
            filter: PropTypes.string.isRequired,
            filterButtons: PropTypes.string.isRequired
        }).isRequired,
        todos: PropTypes.array.isRequired,
        selectedFilter: PropTypes.string.isRequired
    };

    filterActive = memoize(todos => todos.filter(todo => !todo.isComplete));

    onAllClick = () => {
        const { onFilterStateChange } = this.props;
        onFilterStateChange("all");
    };

    onActiveClick = () => {
        const { onFilterStateChange } = this.props;
        onFilterStateChange("active");
    };

    onCompleteClick = () => {
        const { onFilterStateChange } = this.props;
        onFilterStateChange("complete");
    };

    render() {
        const {
            todos,
            classes,
            onTodoItemCompleteChange,
            onTodoItemRemove,
            onTodoItemValueChange,
            clearCompleteTodos
        } = this.props;

        const activeTodos = this.filterActive(todos);

        return (
            <div className={classes.root}>
                <ul>
                    {todos.map((todo, index) => (
                        <ListItem
                            key={index}
                            todo={todo}
                            onTodoItemValueChange={onTodoItemValueChange}
                            onTodoItemRemove={onTodoItemRemove}
                            onTodoItemCompleteChange={onTodoItemCompleteChange}
                        />
                    ))}
                </ul>
                <div className={classes.filter}>
                    <span>{activeTodos.length} Items left</span>
                    <div className={classes.filterButtons}>
                        <button onClick={this.onAllClick}>All</button>
                        <button onClick={this.onActiveClick}>Active</button>
                        <button onClick={this.onCompleteClick}>
                            Completed
                        </button>
                    </div>
                    <div>
                        <button onClick={clearCompleteTodos}>
                            Clear Completed
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(style)(TodoList);
