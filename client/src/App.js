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
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/DeleteCourse';
import ProtectedRoute from './ProtectedRoute';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);

export default () => (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <ProtectedRoute path="/courses/create" component={CreateCourseWithContext} />
          <ProtectedRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <ProtectedRoute path="/courses/delete/:id" component={DeleteCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
          <Route path="/error" component={UnhandledError} />
        </Switch>
      </div>
    </Router>
 );
    