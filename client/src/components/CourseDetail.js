import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
  state = {
    courseDetails: {},
    user: {},
    materials: []
  };

  componentDidMount() {
    const { context } = this.props;
    const { courseId } = this.props.match.params;
    
    context.data.getCourseDetails(courseId)
    .then(response => {
      const materials = response.course.materialsNeeded.split('\n');

      this.setState({
        courseDetails: response.course,
        user: response.course.User,
        materials: materials
      });
    });
  }
  
  render() {
    const {
      courseDetails,
      user,
      materials
    } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to="/update-course">Update Course</Link>
                <Link className="button" to="#">Delete Course</Link>
              </span>
              <Link className="button button-secondary" to="index.html">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3>
              <p> By {user.firstName} {user.lastName}</p>
            </div>
            <div className="course--description">
              <p>{courseDetails.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetails.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {materials.map(material => 
                      <li key={material}>{material}</li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}