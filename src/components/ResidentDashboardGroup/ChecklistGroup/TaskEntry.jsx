import React, { Component } from 'react';

export default class TaskEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskText: '',
            editModeON: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clearInput() {
        this.setState({ taskText: '', editModeON: false });
    }

    handleChange(event) {
        this.setState({ taskText: event.target.value });
    }

    handleKeyUp(event) {
        if (event.keyCode === 27) this.clearInput();
    }

    handleSubmit(event) {
        const { taskIndex, editTask } = this.props;
        event.preventDefault();
        const taskText = this.state.taskText.trim();
        if (taskText.length) editTask(taskText, taskIndex);
        this.clearInput();
    }

    render() {

        const { taskIndex = '', completed = false, label = '' } = this.props,
            { editModeON = false, taskText = '' } = this.state;

        return (
            <div className='task-wrapper' >
                <button onClick={(event) => {
                    // prevent bubbling
                    event.preventDefault();
                    // lose focus after element is clicked
                    event.currentTarget.blur();
                    this.props.toggleCompleteTask(taskIndex);
                }} className={'task-item checkbtn btn btn-primary-outline ' + (completed ? 'complete' : '')}>
                    <span className="icon icon-check"></span>
                </button>
                {editModeON ?
                    <form className='add-task task-item task-label' onSubmit={this.handleSubmit} noValidate>
                        <input
                            type='text'
                            autoComplete='off'
                            className='new-task-editable'
                            maxLength='100'
                            value={taskText}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            placeholder='What need to be done?' />
                    </form> :
                    <span className={'task-item task-label ' + (completed ? 'complete' : '')}>{label}</span>}
                {!editModeON && <button
                    onClick={(event) => { this.setState({ 'taskText': label, 'editModeON': true }) }}
                    className='task-item btn btn-primary-outline edit'>
                    <span className="icon icon-pencil"></span>
                </button>}
                <button onClick={() => { this.props.deleteTask(taskIndex) }}
                    className='task-item btn btn-primary-outline'>
                    <span className="icon icon-trash"></span>
                </button>
            </div >
        );
    }
}
