import React, {Component} from 'react';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    firstName: '',
    lastName: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors:[]
  }

  componentDidMount() {
    const{ context } = this.props;
    const{ id } = this.props.match.params;
    context.data.getCourseDetails(id)
    .then(response => {
      console.log(response);
      const user = response.course.User;
      this.setState({
        title: response.course.title,
        firstName: user.firstName,
        lastName: user.lastName,
        description: response.course.description,
        estimatedTime: response.course.estimatedTime,
        materialsNeeded: response.course.materialsNeeded,
      })
    })
  }

  render() {
    const{ 
      title,
      firstName,
      lastName,
      description,
      estimatedTime,
      materialsNeeded,
      // errors
     } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input onChange={this.change} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} />
                </div>
                <p>By {firstName} {lastName}</p>
              </div>

              <div className="course--description">
                <div>
                  <textarea onChange={this.change} id="description" name="description" className="" placeholder="Course description..." value={description}></textarea>
                </div>
              </div>
            </div>

            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input onChange={this.change}  id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List each material starting with a * symbol..." value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    });
  }

  update = (e) => {
    e.preventDefault();
  }

  cancel = (e) => {
    e.preventDefault();
    const{ id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  }
}