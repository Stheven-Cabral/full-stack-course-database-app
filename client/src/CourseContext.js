import React, { useState, useEffect, createContext } from 'react';

export const CourseContext = createContext();

export const CourseProvider = (props) => {

  const [courseObjects, setCourses] = useState([]);

  const fetchCourses = async () => {
    const coursesFetch = await fetch('http://localhost:5000/api/courses');
    const data = await coursesFetch.json();
    return data;
  };
  
  useEffect(async () => {
    const courses = await fetchCourses();
    await setCourses(courses);
  })

  return (
    <CourseContext.Provider value={courseObjects.courses}>
      {props.children}
    </CourseContext.Provider>
  );
}