import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import ListItem from "./ListItem";

import style from "./style";

class TodoList extends PureComponent {
    static propTypes = {
        onTodoCompleteChange: PropTypes.func.isRequired,
        onAllClick: PropTypes.func.isRequired,
        onActiveClick: PropTypes.func.isRequired,
        onCompleteClick: PropTypes.func.isRequired,
        classes: PropTypes.shape({
            root: PropTypes.string.isRequired,
            filter: PropTypes.string.isRequired,
            filterButtons: PropTypes.string.isRequired
        }).isRequired,
        todos: PropTypes.array.isRequired,
        completedTodos: PropTypes.array
    };

    render() {
        const {
            todos,
            completedTodos,
            classes,
            onTodoCompleteChange,
            onAllClick,
            onActiveClick,
            onCompleteClick
        } = this.props;

        return (
            <div className={classes.root}>
                <ul>
                    {todos.map((todo, index) => (
                        <ListItem
                            key={index}
                            todo={todo}
                            onTodoCompleteChange={onTodoCompleteChange}
                        >
                            {todo.value}
                        </ListItem>
                    ))}
                </ul>
                <div className={classes.filter}>
                    <span>
                        {completedTodos ? completedTodos.length : 0} Items
                        completed
                    </span>
                    <div className={classes.filterButtons}>
                        <button onClick={onAllClick}>All</button>
                        <button onClick={onActiveClick}>Active</button>
                        <button onClick={onCompleteClick}>Completed</button>
                    </div>
                    <div>Clear Completed</div>
                </div>
            </div>
        );
    }
}

export default injectSheet(style)(TodoList);
