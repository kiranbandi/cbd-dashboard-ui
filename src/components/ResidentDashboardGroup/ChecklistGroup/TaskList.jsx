import React from 'react';
import TaskEntry from './TaskEntry';

export default (props) => {
    const { taskList = [], taskFilter = 'all' } = props;

    let notaskMessage = 'Add a task to your list to get started.';

    if (taskFilter == 'completed') {
        notaskMessage = 'No completed tasks on your list.'
    }
    if (taskFilter == 'current') {
        notaskMessage = 'Looks like you are all caught up. No active tasks on your list.'
    }

    return <div className='tasklist-container'>
        {taskList.length > 0 ?
            _.map(taskList, (task, i) => (<TaskEntry
                key={'task-' + task.taskID + '-' + i}
                taskIndex={task.taskID}
                completed={task.completed}
                label={task.label}
                editTask={props.editTask}
                toggleCompleteTask={props.toggleCompleteTask}
                deleteTask={props.deleteTask} />)) :
            <h4 className='text-info'>{notaskMessage}</h4>}
    </div>
}
