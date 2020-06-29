import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom';
 import withContext from './Context';

 import Courses from './components/Courses';

 const CoursesWithContext = withContext(Courses);

export default () => (
    <Router>
      <div>
        <Switch>
          <Route path="/courses" component={CoursesWithContext} />
        </Switch>
      </div>
    </Router>
 );
    