import React from 'react';
import { Link } from 'react-router-dom';

export default ({context}) => {

  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <Link className="header--logo" to='/'>Courses</Link>
          <nav>
            {/* If the the authenticatedUser from context is not null, the Header is changed to welcome the user and display the sign out button.
            If the authenticatedUser is null, the sign up and sign in buttons are rendered. */}
            {context.authenticatedUser ?
              <React.Fragment>
                <span>Welcome, {context.authenticatedUser.firstName}!</span>
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
