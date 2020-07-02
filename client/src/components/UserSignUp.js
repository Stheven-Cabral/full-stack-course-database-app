import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
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
            <form onSubmit={this.submit}>
              <div><input onChange={this.change} id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} /></div>
              <div><input onChange={this.change} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} /></div>
              <div><input onChange={this.change} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} /></div>
              <div><input onChange={this.change} id="password" name="password" type="password" className="" placeholder="Password" value={password} /></div>
              <div><input onChange={this.change} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={confirmPassword} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  }

    /***
   * `change` function links an input's or textarea's element name to a state property and assigns it the value of the input or textarea element.
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return{
        [name]: value
      };
    });
  }

  /***
   * `submit` function prevents default actions when user clicks the Sign Up button.
   * If the `password` and `confirmPassword` do not match, an error is assigned to the `errors` state property indicated the two passwords don't match.
   * Else, the `createUser` method called with the `user` payload as an argument.
   * If `createUser` returns errors, the errors are assigned to the errors state property to be rendered as validation errors.
   * If `createUser` does not return any errors, the `signIn` function is called with the `emailAddress` and `password` state properties and the user is redirected to the `/` endpoint.
   * Any other errors are caught by catch(), logged to the console and the user is redirected to the `/error` endpoint.
   */
  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    }

    if (password !== confirmPassword) {
      this.setState({
        errors: ['Password and Confirm Password do not Match']
      });
    } else {
      context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
          context.actions.signIn(emailAddress, password)
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
    }
  }

  /***
   * `cancel` function prevents default on Cancel button click.
   * The user is redirected to the endpoint `/` which displays the courses list.
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }


}