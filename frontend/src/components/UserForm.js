import React from 'react'

class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {first_name: '', last_name: '', email: '', project: props.projects[0]?.id}
    }
    handleChange(event)
    {
        this.setState(
            {
                    [event.target.name]: event.target.value
                }
            );
    }
    handleSubmit(event) {
        this.props.createUser(this.state.first_name, this.state.last_name, this.state.email, this.state.project)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="first_name">First name</label>
                    <input type="text" className="form-control" name="first_name"
                            value={this.state.first_name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                <label for="last_name">Last name</label>
                    <input type="text" className="form-control" name="last_name"
                           value={this.state.last_name} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="text" className="form-control" name="email"
                               value={this.state.email} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                <label for="project">User</label>
                <select name="project" className='form-control' onChange={(event)=>
                    this.handleChange(event)}> {this.props.projects.map((project)=>
                    <option value={project.id}> {project.projectName}</option>)}
                </select>
                </div>

            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
            );
        }
    }
export default UserForm
