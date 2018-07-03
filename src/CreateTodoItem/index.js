import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import style from "./style";

class CreateTodoItem extends Component {
    static propTypes = {
        onTodoItemCreate: PropTypes.func.isRequired,
        classes: PropTypes.shape({
            root: PropTypes.string.isRequired,
            input: PropTypes.string.isRequired
        }).isRequired,
        hasTodo: PropTypes.bool
    };

    static defaultProps = {
        hasTodo: false
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    onChange = e => {
        this.setState({ value: e.target.value });
    };

    onKeyDown = e => {
        if (e.keyCode === 13) {
            this.onClick();
        }
    };

    onClick = () => {
        const { value } = this.state;
        const trimmed = value.trim();
        if (trimmed !== "") {
            this.setState({ value: "" });
            this.props.onTodoItemCreate(trimmed);
        }
    };

    render() {
        const { classes, hasTodo } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                {hasTodo && (
                    <IconButton
                        disabled={value.trim() === ""}
                        onClick={this.onClick}
                        aria-label="Delete"
                    >
                        <ArrowDownwardIcon />
                    </IconButton>
                )}
                <input
                    className={classes.input}
                    placeholder="What needs to be done?"
                    value={value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <button disabled={value.trim() === ""} onClick={this.onClick}>
                    Add Todo
                </button>
            </div>
        );
    }
}

export default injectSheet(style)(CreateTodoItem);
