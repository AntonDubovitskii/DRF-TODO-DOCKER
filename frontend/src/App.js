import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from "./components/Project";
import TaskList from "./components/Task";
import UserList from "./components/User";
import UserForm from "./components/UserForm";
import axios from 'axios';
import Footer from "./components/Footer";
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from "react-router-dom";
import LoginForm from './components/Auth.js'
import Cookies from "universal-cookie";
import ProjectTaskList from "./components/ProjectTask";
import ProjectForm from "./components/ProjectForm";
import TaskForm from "./components/TaskForm";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'tasks': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }
    get_token(username, password) {
        axios.post('http://194.58.92.140:8000/api-token-auth/',
            {username: username, password:password})
            .then(response => {this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
        }
    if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    createUser(first_name, last_name, email){
        const headers = this.get_headers()
        const data = {first_name: first_name, last_name: last_name, email: email}
        axios.post(`http://194.58.92.140:8000/api/users/`, data, {headers})
            .then(response=> {
                let new_user = response.data
                this.setState({users: [...this.state.users, new_user]})
            }).catch((error => console.log(error)))
    }
    deleteUser(id) {
        const headers = this.get_headers()
        axios.delete(`http://194.58.92.140:8000/api/users/${id}/`, {headers})
            .then(response => {
                this.setState({users: this.state.users.filter((user)=>user.id !==id)})
            }).catch(error=>console.log(error))
    }

    deleteProject(id){
        const headers = this.get_headers()
        axios.delete(`http://194.58.92.140:8000/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project)=>project.id !==id)})
            }).catch(error=>console.log(error))
    }

    createProject(project_name, repo_link) {
        const headers = this.get_headers()
        const data = {project_name: project_name, repo_link: repo_link}
        axios.post(`http://194.58.92.140:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch((error => console.log(error)))
    }
    deleteTask(id){
        const headers = this.get_headers()
        axios.delete(`http://194.58.92.140:8000/api/todo/${id}/`, {headers})
            .then(response => {
                this.setState({tasks: this.state.tasks})
                window.location.reload(false)
            }).catch(error=>console.log(error))
    }

    createTask(title, description, creator, project) {
        const headers = this.get_headers()
        const data = {title: title, description: description, creator: creator, project: project}
        console.log(data)
        axios.post(`http://194.58.92.140:8000/api/todo/`, data, {headers})
            .then(response => {
                let new_task = response.data
                this.setState({tasks: [...this.state.tasks, new_task]})
            }).catch((error => console.log(error)))
    }
    load_data() {
        const headers = this.get_headers()
        console.log(headers)
        axios.get('http://194.58.92.140:8000/api/projects/', {headers})
            .then(response => {
            const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://194.58.92.140:8000/api/todo/', {headers})
            .then(response => {
            const tasks = response.data
                this.setState(
                    {
                        'tasks': tasks.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({tasks: []})
        })

        axios.get('http://194.58.92.140:8000/api/users/', {headers})
            .then(response => {
            const users = response.data
                this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })
    }
    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return(
            <div className="App">
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Tasks</Link>
                        </li>
                        <li>
                            <Link to='/users'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
                <Route exact path='/' component={() => <TaskList
                    tasks={this.state.tasks} deleteTask={(id)=>this.deleteTask(id)}/>} />
                <Route exact path='/todo/create' component={() => <TaskForm
                    creators={this.state.users} projects={this.state.projects}
                    createTask={(title, description, creator_id, project_id) =>
                        this.createTask(title, description, creator_id, project_id)} />} />
                <Route exact path='/projects' component={() => <ProjectList
                    projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>} />
                <Route exact path='/projects/create' component={() => <ProjectForm
                    createProject={(project_name, repo_link) => this.createProject(project_name, repo_link)} />} />
                <Route exact path='/project/:id' component={() => <ProjectTaskList tasks={this.state.tasks} />} />
                <Route exact path='/users' component={() => <UserList
                    users={this.state.users} deleteUser={(id)=>this.deleteUser(id)}/>} />
                <Route exact path='/users/create' component={() => <UserForm
                    projects={this.state.projects}
                    createUser={(first_name, last_name, email, project) => this.createUser(first_name, last_name, email, project)} />} />
                <Route exact path='/login' component={() => <LoginForm
                    get_token={(username, password) => this.get_token(username, password)} />} />
                <Redirect from='/todo' to='/' />
                <Route component={NotFound404} />
                </Switch>
            </BrowserRouter>
                <Footer />
            </div>
        )
    }
}

export default App;

