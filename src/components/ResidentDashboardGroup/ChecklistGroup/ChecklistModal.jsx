/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleChecklistVisbility } from '../../../redux/actions/actions';
import Loading from 'react-loading';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import shortid from 'shortid';
import { getTaskList, setTaskList } from '../../../utils/requestServer';

class ChecklistModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            taskFilter: 'all',
            taskList: []
        }
    }

    filterClick = (event) => {
        const taskFilter = event.target.id.split("-")[1];
        this.setState({ taskFilter });
    }

    syncTaskList = (taskList) => {
        const { residentFilter } = this.props, { username = '' } = residentFilter;
        setTaskList(username, taskList);
    }

    addTask = (label) => {
        let { taskList } = this.state;
        taskList.push({ 'taskID': shortid(), 'completed': false, label });
        this.setState({ taskList });
        // weird fix to ensure item is scrolled into view after element is rendered by react
        setTimeout(() => {
            $('.tasklist-container').scrollTop(+$('.tasklist-container')[0].scrollHeight + 100);
        }, 250)
        // sync list to server
        this.syncTaskList(taskList);
    }

    deleteTask = (taskIndex) => {
        let { taskList } = this.state;
        taskList = _.filter(taskList, (d) => d.taskID != taskIndex);
        this.setState({ taskList });
        // sync list to server
        this.syncTaskList(taskList);
    }

    toggleCompleteTask = (taskIndex) => {
        let { taskList } = this.state;
        taskList = _.map(taskList, (d) => {
            if (d.taskID == taskIndex) {
                d.completed = !d.completed;
                return d;
            }
            return d;
        })
        this.setState({ taskList });
        // sync list to server
        this.syncTaskList(taskList);
    }

    editTask = (taskText, taskIndex) => {
        let { taskList } = this.state;
        taskList = _.map(taskList, (d) => {
            if (d.taskID == taskIndex) {
                d.label = taskText;
                return d;
            }
            return d;
        })
        this.setState({ taskList });
        // sync list to server
        this.syncTaskList(taskList);
    }


    componentDidMount() {
        const { residentFilter } = this.props, { username = '' } = residentFilter;
        // Get the checklist for the selected resident
        if (username) {
            // turn on loader
            this.setState({ isLoading: true });
            // Get the checklist data for the selected resident
            getTaskList(username)
                .then((taskList) => this.setState({ taskList }))
                .catch((err) => console.log(err))
                .finally(() => this.setState({ isLoading: false }))
        }
    }

    render() {

        const { isLoading, taskList = [], taskFilter = 'all' } = this.state;

        let filteredList = _.filter(taskList, (d) => {
            if (taskFilter == 'all') { return true }
            else if (taskFilter == 'completed') { return d.completed; }
            return !d.completed;
        })

        return (
            <div className='checklist-modal-root'>
                <div className='modal-main'>
                    <button type="button" className="close" onClick={this.props.actions.toggleChecklistVisbility}>
                        <span>×</span>
                    </button>
                    <h3 className='text-center'>Resident Checklist</h3>
                    <div className='checklist-container text-center'>
                        {isLoading ?
                            <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                            <div>
                                <h4 className='minify'>This space can be used to keep track of your goals and milestones. Use the buttons below to filter for active and completed tasks. </h4>
                                <h4 className='minify'>To enter a <b>new task</b>, use the entry box at the bottom and <b>press enter</b> when you are done. To mark a task as <b>completed</b> click on the checkmark icon.</h4>
                                <h4 className='minify'>To <b>edit</b> a task, click on the pencil icon and edit the text and then <b>press enter</b>. Finally to delete a task, click on the trashcan icon.</h4>
                                <div className="hr-divider">
                                    <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                        <li className={taskFilter == 'all' ? 'active' : ''}>
                                            <a id='taskFilter-all' onClick={this.filterClick} >View All</a>
                                        </li>
                                        <li className={taskFilter == 'current' ? 'active' : ''}>
                                            <a id='taskFilter-current' onClick={this.filterClick} >Active</a>
                                        </li>
                                        <li className={taskFilter == 'completed' ? 'active' : ''}>
                                            <a id='taskFilter-completed' onClick={this.filterClick}>Completed</a>
                                        </li>
                                    </ul>
                                </div>
                                <TaskList
                                    taskList={filteredList}
                                    taskFilter={taskFilter}
                                    deleteTask={this.deleteTask}
                                    toggleCompleteTask={this.toggleCompleteTask}
                                    editTask={this.editTask} />
                                <TaskForm addTask={this.addTask} />
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleChecklistVisbility }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistModal);






