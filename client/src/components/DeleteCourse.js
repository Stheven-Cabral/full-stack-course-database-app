import React, {Component} from 'react';

export default class DeleteCourse extends Component {
  state = {
    course: {}
  }

  /***
   * At component mount the getCourseDetails() method is called from context with argument `id` from this.props.match.params.
   * state properties are set using the data returned from getCourseDetails().
   * Errors are caught and logged using catch() and the user is routed to the `/error` endpoint.
   */
  componentDidMount() {
    const { context }= this.props;
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
    .then(response => {
      if (response) {
        this.setState({
          course: response.course,
          emailAddress: context.authenticatedUser.emailAddress,
          password: context.authenticatedUser.password
        })
      } else {
        this.props.history.push('/notfound');
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
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

  /***
   * `confirmDelete` function prevents default actions when user clicks YES to delete a course.
   * The `deleteCourse` from context is called using `course.id`, `emailAddress`, and `password` from state as arguments.
   * If errors are returned, they are logged to the console and the user is redirected to the `/forbidden` endpoint; else, the user is redirected to the `/` endpoint.
   * Any other errors are caught by catch(), logged to the console and the user is redirected to the `/error` endpoint.
   */
  confirmDelete = (e) => {
    e.preventDefault();
    const { context }= this.props;
    const { course, emailAddress, password } = this.state;
    context.data.deleteCourse(course.id, emailAddress, password)
    .then((errors) => {
      if (errors.length) {
        console.log(errors);
        this.props.history.push('/forbidden');
      } else {
        this.props.history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    });
  }

  /***
   * `rejectDelete` function returns the user to the course's detail page.
   */
  rejectDelete = () => {
    const { course } = this.state;
    this.props.history.push(`/courses/${course.id}`);
  }
}
