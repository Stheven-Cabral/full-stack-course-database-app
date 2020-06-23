import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  useEffect(() => {
    fetchCourses();
  });

  const [courseObjects, setCourses] = useState([]);
  
  const fetchCourses = async () => {
    const data = await fetch('localhost:5000/api/courses');
    const courses = await data.json();
    setCourses(courses.courses);
  }; 

  return (
    <div className="App">
    </div>
  );
}

export default App;
