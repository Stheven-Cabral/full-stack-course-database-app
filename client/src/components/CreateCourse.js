import React, {Component} from 'react';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors:[]
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
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
          <form onSubmit={this.create}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input onChange={this.change} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} />
                </div>
              </div>

              <div className="course--description">
                <h4 className="course--label">Description</h4>
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
                      <input onChange={this.change} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} />
                    </div>
                  </li>
                  
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded" className="" placeholder="Please list each material..." value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /***
   * `create` function prevents default actions on submit and calls the createCourse() method from context with the course payload, and authenticated user email address and password.
   * If getCourse() returns errors, they are set to the `errors` state property to be rendered as validation errors to the user.
   * If getCourse() returns no errors, the user is directed to the `/` endpoint with the new course added to the courses list.
   */
  create = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    // New course payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    }

    context.data.createCourse(course, emailAddress, password)
    .then(errors => {
      if (errors.errors) {
        this.setState({ errors: errors.errors});
      } else {
        this.props.history.push('/');
      }
    })
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error');
    })
  }

  /***
   * `change` function links an input's or textarea's element name to a state property and assigns it the value of the input or textarea element.
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  /***
   * `cancel` function prevents event default actions on button click.
   * The user is redirected to the `/` endpoint which displays the courses list.
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}