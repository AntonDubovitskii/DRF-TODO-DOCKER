import React from 'react';
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            <td>
                <Link to={`project/${project.id}/`}>{project.projectName}</Link>
            </td>
            <td>{project.repoLink}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
        <table>
            <tr>
                <th>Project name</th>
                <th>Repository Link</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList