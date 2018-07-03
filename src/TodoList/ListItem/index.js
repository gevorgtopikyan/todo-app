import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import style from "./style";

class ListItem extends Component {
    static propTypes = {
        onTodoItemCompleteChange: PropTypes.func.isRequired,
        onTodoItemRemove: PropTypes.func.isRequired,
        onTodoItemValueChange: PropTypes.func.isRequired,
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
            isEditing: false,
            value: props.todo.value
        };
    }

    onChange = e => {
        const { todo, onTodoItemCompleteChange } = this.props;
        onTodoItemCompleteChange(e.target.checked, todo);
    };

    onClearClick = () => {
        const { todo, onTodoItemRemove } = this.props;
        onTodoItemRemove(todo);
    };

    onDoubleClick = () => {
        this.setState({ isEditing: true });
    };

    onInputChange = e => {
        this.setState({ value: e.target.value });
    };

    onInputKeyDown = e => {
        if (e.keyCode === 13) {
            const { todo } = this.props;
            const { value } = this.state;
            const trimmed = value.trim();
            if (trimmed !== "") {
                this.setState({ isEditing: false });
                this.props.onTodoItemValueChange(value, todo);
            } else {
                this.props.onTodoItemRemove();
            }
        }
    };

    render() {
        const { classes, todo } = this.props;
        const { isEditing, value } = this.state;
        return (
            <div className={classes.root}>
                <input
                    className={classes.checkbox}
                    type="checkbox"
                    onChange={this.onChange}
                    checked={todo.isComplete}
                />
                {!isEditing ? (
                    <span
                        className={classes.text}
                        onDoubleClick={this.onDoubleClick}
                    >
                        {value}
                    </span>
                ) : (
                    <input
                        value={value}
                        onChange={this.onInputChange}
                        onKeyDown={this.onInputKeyDown}
                    />
                )}

                <button className={classes.remove} onClick={this.onClearClick}>
                    Clear
                </button>
            </div>
        );
    }
}

export default injectSheet(style)(ListItem);
