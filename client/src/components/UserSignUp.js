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
            <form>
              <div><input onChange={this.change} id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} /></div>
              <div><input onChange={this.change} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} /></div>
              <div><input onChange={this.change} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} /></div>
              <div><input onChange={this.change} id="password" name="password" type="password" className="" placeholder="Password" value={password} /></div>
              <div><input onChange={this.change} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={confirmPassword} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick={this.change}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  submit = (e) => {}

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }


}