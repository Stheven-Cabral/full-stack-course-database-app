import React from 'react';
import Courses from './components/Courses';
import { 
  BrowserRouter as Router
 } from 'react-router-dom';

export default () => (
    <Router>
      <div>
        <Courses />
      </div>
    </Router>
 );
    