import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project_name: '', repo_link: ''}
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
        this.props.createProject(this.state.project_name, this.state.repo_link)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="first_name">Project name</label>
                    <input type="text" className="form-control" name="project_name"
                            value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                <label for="repo_link">Repo link</label>
                    <input type="text" className="form-control" name="repo_link"
                           value={this.state.repo_link} onChange={(event) => this.handleChange(event)}/>
                </div>


            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
            );
        }
    }
export default ProjectForm