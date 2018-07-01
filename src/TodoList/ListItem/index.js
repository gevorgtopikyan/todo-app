import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import style from "./style";

class ListItem extends Component {
    static propTypes = {
        onTodoCompleteChange: PropTypes.func.isRequired,
        classes: PropTypes.shape({
            root: PropTypes.string.isRequired,
            checkbox: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            remove: PropTypes.string.isRequired
        }).isRequired,
        todo: PropTypes.shape({
            value: PropTypes.string.isRequired,
            isComplete: PropTypes.bool.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            todos: props.todos
        };
    }

    onChange = e => {
        const { todo, onTodoCompleteChange } = this.props;
        onTodoCompleteChange(e.target.checked, todo);
    };

    render() {
        const { classes, todo } = this.props;
        return (
            <div className={classes.root}>
                <input
                    className={classes.checkbox}
                    type="checkbox"
                    onChange={this.onChange}
                    value={todo.isComplete}
                />
                <span className={classes.text}>{todo.value}</span>
                <button className={classes.remove}>Clear</button>
            </div>
        );
    }
}

export default injectSheet(style)(ListItem);
