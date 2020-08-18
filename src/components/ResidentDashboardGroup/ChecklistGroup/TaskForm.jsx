import React, { Component } from 'react';

export default  class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = { taskText: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clearInput() {
        this.setState({ taskText: '' });
    }

    handleChange(event) {
        this.setState({ taskText: event.target.value });
    }

    handleKeyUp(event) {
        if (event.keyCode === 27) this.clearInput();
    }

    handleSubmit(event) {
        event.preventDefault();
        const taskText = this.state.taskText.trim();
        if (taskText.length) this.props.addTask(taskText);
        this.clearInput();
    }

    render() {
        return (
            <form className='add-task' onSubmit={this.handleSubmit} noValidate>
                <input
                    type='text'
                    autoComplete='off'
                    className='new-task'
                    maxLength='100'
                    value={this.state.taskText}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    placeholder='What needs to be done?' />
            </form>
        );
    }
}

