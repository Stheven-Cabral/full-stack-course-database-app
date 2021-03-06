import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {

  state = {
    courses: []
  };

   /***
   * At component mount the getCourses() method is called from context.
   * state properties `courses` are set using the data returned from getCourses().
   * Errors are caught and logged using catch() and the user is routed to the `/error` endpoint.
   */
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses()
    .then(response => {
      this.setState({courses: response.courses});
    })
    .catch(error => {
      console.log(error);
      this.props.history.push('/error')
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="bounds">
          {this.state.courses.map(course => 
            <div className="grid-33" key={course.id}>
              <Link className="course--module course--link" to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          )}

          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}