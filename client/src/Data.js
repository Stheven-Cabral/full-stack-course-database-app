import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // User Authorization
    if (requiresAuth) {    
      // The btoa() method creates a base-64 encoded ASCII string from a "string" of data. btoa() encodes the username and password credentials passed to the api() method. The credentials will be passed as an object containing emailAddress and password properties.
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }  

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      // json is missing a parenthesis
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      console.log(response);
      // console.log(response.statusText);
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourseDetails(courseId) {
    const response = await this.api(`/courses/${courseId}`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      console.log(response.status);
      console.log(response.statusText);
      return null;
    }
    else {
      throw new Error ()
    }
  }

  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error ()
    }
  }

  async updateCourse(courseId, course, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error ()
    }
  }


  async deleteCourse(courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 200) {
      return []
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error ()
    }
  }
  

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => { 
        data.status = 200;
        return data; 
      });
    }
    else if (response.status === 401) {
      return response.json().then(data => {
        data.status = 401;
        console.log(data)
        return data;
      });
    }
    else {
      throw new Error();
    }
  }
  

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400 || response.status === 405) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
