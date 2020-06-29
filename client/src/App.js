import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './Context';

import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import ErrorPage from './components/ErrorPage';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);

export default () => (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route path="/courses" component={CoursesWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/course-detail" component={CourseDetailWithContext} />
          <Route path="/create-course" component={CreateCourseWithContext} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/notfound" component={NotFound} />
        </Switch>
      </div>
    </Router>
 );
    