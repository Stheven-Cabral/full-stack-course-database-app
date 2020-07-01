import React, {Component} from 'react';
// import { Link } from 'react-router-dom';

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
      // Requires a custom header. View html.
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
                    <div><textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded}></textarea></div>
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
      let errorList = [];
      console.log(errors);
      if (errors.message) {
        errorList.push(errors.message);
      } else {
        errorList.push(errors);
      }

      if (errorList.length) {
        this.setState({ errors: errorList});
      } else {
        this.props.history.push('/');
      }
    })
    .catch( err => { // handle rejected promises
      console.log(err);
      // this.props.history.push('/error'); // push to history stack
    })
  }

  // `change` method - allows value of input or text area to be displayed as user types as well as sets state.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}