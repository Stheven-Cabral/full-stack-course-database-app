import React, {useState} from 'react';
import './styles/global.css';
import Courses from './components/Courses';
import { 
  BrowserRouter as Router
 } from 'react-router-dom';

function App() {

  const [courseObjects, setCourses] = useState([]);


  fetch('http://localhost:5000/api/courses')
  .then(response => response.json())
  .then(data => setCourses(data.courses))


  console.log(courseObjects);

  return (
    <Router>
      <div className="App">
        <Courses courses={courseObjects}/>
      </div>
    </Router>
  );
}

export default App;
