import React from 'react';
import {useParams} from "react-router-dom";
import project from "./Project";

const TaskItem = ({task}) => {
    return(
        <tr>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.creator.firstName}</td>
            <td>{task.project.projectName}</td>

        </tr>
    )
}


const ProjectTaskList = ({tasks}) => {
    let {id} = useParams();
    console.log(id)
    let filtered_tasks = tasks.filter((task) => task.project.id == id)
    return (
        <table>
            <th>
                Title
            </th>
            <th>
                Description
            </th>
            <th>
                Creator
            </th>
            <th>
                Project
            </th>
            {filtered_tasks.map((task) => <TaskItem task={task} />)}
        </table>
    )
}

export default ProjectTaskList