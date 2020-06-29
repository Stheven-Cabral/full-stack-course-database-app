import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './Context';

import Header from './components/Header';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);

export default () => (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route path="/courses" component={CoursesWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
        </Switch>
      </div>
    </Router>
 );
    