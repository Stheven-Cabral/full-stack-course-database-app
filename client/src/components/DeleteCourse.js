import React, {Component} from 'react';

export default class DeleteCourse extends Component {
  state = {
    course: {}
  }

  componentDidMount() {
    const { context }= this.props;
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
    .then(response => {
      this.setState({
        course: response.course
      })
    });
  }

  render() {
    const { course } = this.state;

    return (
      <React.Fragment>
        <h2>&nbsp;&nbsp;&nbsp;Are you sure you want to delete the course: {course.title}?
          &nbsp;&nbsp;&nbsp;<span className='button' onClick={this.confirmDelete}>Yes</span>
          <span className='button' onClick={this.rejectDelete}>No</span>
        </h2>
      </React.Fragment>
    )
  }

  confirmDelete = () => {
    const { context }= this.props;
    const { course } = this.state;
    context.data.deleteCourse(course.id);
    this.props.history.push('/');
  }

  rejectDelete = () => {
    const { course } = this.state;
    this.props.history.push(`/courses/${course.id}`);
  }
}
