import React from 'react';
import {Link} from "react-router-dom";


const UserItem = ({user, deleteUser}) => {
    return(
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.project.id}</td>
            <td><button onClick={()=>deleteUser(user.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const UserList = ({users, deleteUser}) => {
    return (
        <div>
            <table>
            <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last year</th>
                <th>Project</th>
                <th></th>
            </tr>
            {users.map((user) => <UserItem user={user} deleteUser={deleteUser}/>)}
        </table>
        <Link to='/users/create'>Create</Link>
        </div>

    )
}

export default UserList