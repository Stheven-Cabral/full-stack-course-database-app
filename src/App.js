import React, {useState, useEffect} from 'react';
import '../styles/global.css';

function App() {

  useEffect(() => {
    fetchCourses();
  });

  const [courseObjects, setCourses] = useState([]);
  
  const fetchCourses = async () => {
    const data = await fetch('http://localhost:5000/api/courses');
    const courses = await data.json();
    setCourses(courses.courses);
  }; 

  return (
    <div className="App">
    {courseObjects.map( (course) => (
      <p key={course.id}>{course.title}</p>
    ))}
    </div>
  );
}

export default App;
