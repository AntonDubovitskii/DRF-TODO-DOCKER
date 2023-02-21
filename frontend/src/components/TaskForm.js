import React from 'react'

class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', description: '', creator: props.creators[0]?.id, project: props.projects[0]?.id}
        console.log(props.creators[0])
        console.log(props.projects[0])
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
        this.props.createTask(this.state.title, this.state.description, this.state.creator, this.state.project)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="title">Title</label>
                    <input type="text" className="form-control" name="title"
                            value={this.state.title} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                <label for="description">Description</label>
                    <input type="text" className="form-control" name="description"
                           value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                <label for="creator">Task creator</label>
                <select name="creator" className='form-control' onChange={(event)=>
                    this.handleChange(event)}> {this.props.creators.map((creator)=>
                    <option value={creator.id}> {creator.lastName}</option>)}
                </select>
                </div>

                <div className="form-group">
                <label for="project">Project</label>
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

export default TaskForm
