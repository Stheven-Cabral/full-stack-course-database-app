import React from 'react';
import './styles/global.css';
import Courses from './components/Courses';
import { 
  BrowserRouter as Router
 } from 'react-router-dom';
import { CourseProvider } from './CourseContext';

function App() {

  return (
    <CourseProvider>
      <Router>
        <div className="App">
          <Courses />
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;
