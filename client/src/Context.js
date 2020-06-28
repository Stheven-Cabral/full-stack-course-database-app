import React, { createContext, Component } from 'react';

export const CourseContext = createContext();

export class CourseProvider extends Component {
  state = {
    data: []
  }

  fetchCourses = async () => {
    const coursesFetch = await fetch('http://localhost:5000/api/courses');
    const data = await coursesFetch.json();
    this.setState({
      data: data
    })
    console.log(this.state.data);
  };

  componentDidMount(){
    this.fetchCourses();
  }

  render() {
    return (
      <CourseContext.Provider value={this.state.data}>
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

  
  

  