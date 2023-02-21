import React from 'react';
import {Link} from "react-router-dom";


const TaskItem = ({task, deleteTask}) => {
    return(
        <tr>
            <td>{task.project.projectName}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.creator.firstName}</td>
            <td>{task.creator.lastName}</td>
            <td>{task.active ? 'Open': 'Closed'}</td>
            <td><button onClick={()=>deleteTask(task.id)} type='button'>Close</button></td>

        </tr>
    )
}


const TaskList = ({tasks, deleteTask}) => {
    return (
        <div>
        <table>
            <tr>
                <th>Project</th>
                <th>Title</th>
                <th>Description</th>
                <th>Creator first name</th>
                <th>Creator last name</th>
                <th>Status</th>
                <th></th>
            </tr>

            {tasks.map((task) => <TaskItem task={task} deleteTask={deleteTask}/>)}
        </table>
        <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default TaskList