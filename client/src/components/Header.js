import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { context } = this.props;
    const authenticatedUser = context.authenticatedUser;

    return (
      <React.Fragment>
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              {authenticatedUser ?
                <React.Fragment>
                  <span>Welcome, {authenticatedUser.name}!</span>
                  <Link className="signout" to="/signout">Sign Out</Link>
                </React.Fragment>
              :    
                <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </React.Fragment>
              }
            </nav>
          </div>
        </div>
        <hr />
      </React.Fragment>
    )
  }
}
