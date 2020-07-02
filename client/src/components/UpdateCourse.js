import React, {Component} from 'react';

export default class UpdateCourse extends Component {
  state = {
    courseId: '',
    title: '',
    firstName: '',
    lastName: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors:[]
  }

  /***
   * At component mount the `getCourseDetails()` method is called from context with argument `id` from this.props.match.params.
   * state properties are set using the data returned from `getCourseDetails()`.
   * If the state properties `courseByEmailAddress` and `authenticatedUserEmailAddress`, the user is redirected to the `/forbidden` endpoint.
   * Errors are caught and logged using `catch()` and the user is routed to the `/error` endpoint.
   */
  componentDidMount() {
    const{ context } = this.props;
    const{ authenticatedUser } = context;
    const{ id } = this.props.match.params;

    context.data.getCourseDetails(id)
    .then(response => {
      if (response) {
        const user = response.course.User;
        this.setState({
          courseId: id,
          title: response.course.title,
          courseByFirstName: user.firstName,
          courseByLastName: user.lastName,
          courseByEmailAddress: user.emailAddress,
          description: response.course.description,
          estimatedTime: response.course.estimatedTime,
          materialsNeeded: response.course.materialsNeeded,
          authenticatedUserEmailAddress: authenticatedUser.emailAddress
        })
      } else {
        this.props.history.push('/notfound');
      }

      if (this.state.courseByEmailAddress !== this.state.authenticatedUserEmailAddress) {
        this.props.history.push(`/forbidden`);
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }

  render() {
    const{ 
      title,
      courseByFirstName,
      courseByLastName,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
     } = this.state;
    
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {errors.length ? 
            <React.Fragment>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((err, index) =>
                    <li key={index}>{err}</li>
                  )}
                </ul> 
              </div>
            </React.Fragment>
            : 
            <hr />
          }
          <form onSubmit={this.update}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input onChange={this.change} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} />
                </div>
                <p>By {courseByFirstName} {courseByLastName}</p>
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
                      <textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded" className="" placeholder="Please list each material..." value={materialsNeeded}></textarea></div>
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

  /***
   * `change` function links an input's or textarea's element name to a state property and assigns it the value of the input or textarea element.
   * If no value is assigned due to the user being redirected to the `/forbidden` endpoint, the [name] properties will be assigned an empty string to prevent any errors.
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value || ''
      }
    });
  }

  /***
   * `update` function prevents default actions when user clicks the Update Course button.
   * The `updateCourse` from context is called using `courseId`, `updatedCourse`, `emailAddress`, and `password` from state properties as arguments.
   * If errors are returned by `updateCourse`, the errors are assigned to the `errors` state proerty to rendered as validation errors.
   * If not errors are returned from `updateCourse`, the user is redirected to the the course's detail page.
   * Any other errors are caught by catch(), logged to the console and the user is redirected to the `/error` endpoint.
   */
  update = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    const {
      courseId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.updateCourse(courseId, updatedCourse, emailAddress, password)
    .then(errors => {
      if (errors.errors) {
        this.setState({ errors: errors.errors});
      } else {
        const id = this.state.courseId;
        this.props.history.push(`/courses/${id}`);
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }

  /***
   * `cancel` function prevents default on Cancel button click.
   * A variable `id` is assigned to the state property courseId.
   * The user is redirected to the course's detail page.
   */
  cancel = (e) => {
    e.preventDefault();
    const id = this.state.courseId;
    this.props.history.push(`/courses/${id}`);
  }
}