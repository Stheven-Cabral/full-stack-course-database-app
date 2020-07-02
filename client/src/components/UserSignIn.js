import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,  
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
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
              <div><input onChange={this.change} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} /></div>
              <div><input onChange={this.change} id="password" name="password" type="password" className="" placeholder="Password" value={password} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }

  /***
   * `change` function links an input's or textarea's element name to a state property and assigns it the value of the input or textarea element.
   */
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  /***
   * `submit` function prevents default actions when user clicks the Sign In button.
   * The `signIn` function from context is called using `emailAddress` and `password` from state properties as arguments.
   * If the `signIn` function response has a status of 200, the user is redirected to the previous page or the `/` endpoint and the a success message is logged to the console.
   * If the `signIn` function response has a status of 401, the errors returned by `signIn` is assigned to the errors state property to be rendered as validation errors.
   * Any other errors are caught by catch(), logged to the console and the user is redirected to the `/error` endpoint.
   */
  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }; //this.props.location.state is set in PrivateRoute.js
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user.status === 200) {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        } else if (user.status === 401) {
          this.setState(() => {
          return { errors: user.errors };
          });
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
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