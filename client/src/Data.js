import config from './config';

export default class Data {
  /***
   * `api` method - sets the url for the request, sets the options with request method and headers, and returns `fetch` with the url and options as arguments.
   * @param {String} path - The path the requrst is made to.
   * @param {RequestMethod} method - The method of the request.
   * @param {Object} body - The body of the request with stringifyed data.
   * @param {Boolean} requiresAuth - Boolean that identifies iif authorization is required.
   * @param {Object} credentials - An object with credentials from a signed in user.
   */
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


  /***
   * `getCourses` method - Returns a list of courses (including the user that owns each course).
   * If the response status is 200, the response data is returned.
   * If the response status is 404, the response is logged on the console and null is returned.
   * An new error is thrown when an unexpected error occurs.
   */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      console.log(response);
      return null;
    }
    else {
      throw new Error();
    }
  }


  /***
   * `getCourseDetails` method - Returns a course object with an id that matches the paramater `courseId`.
   * @param {Number} courseId - And id of the course the user wants details of.
   * If the response status is 200, the response data is returned.
   * If the response status is 404, the response is logged on the console and null is returned.
   * A new error is thrown when an unexpected error occurs.
   */
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


  /***
   * `createCourse` method - Creates a new course.
   * @param {Object} course - An object containing the course to be created properties.
   * @param {String} emailAddress - The logged in user's email address.
   * @param {String} password - The logged in user's password.
   * If the response status is 201, an empty array is returned.
   * If the response status is 400, the response data containing errors is returned as json.
   * A new error is thrown when an unexpected error occurs.
   */
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


  /***
   * `updateCourse` method - Updates a specific course with id from parameter `courseId`.
   * @param {Number} courseId - The course to be updated's id.
   * @param {Object} course - An object containing the updated course properties.
   * @param {String} emailAddress - The logged in user's email address.
   * @param {String} password - The logged in user's password.
   * If the response status is 204, an empty array is returned.
   * If the response status is 400, 401, or 403, the response data containing errors is returned as json.
   * A new error is thrown when an unexpected error occurs.
   */
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


  /***
   * `deleteCourse` method - Deletes a course with id from parameter `courseId`.
   * @param {Number} courseId - The id of the course to be deleted.
   * @param {String} emailAddress - The logged in user's email address.
   * @param {String} password - The logged in user's password.
   * If the response status is 200, an empty array is returned.
   * If the response status is 403, the response data errors is returned as json.
   * A new error is thrown when an unexpected error occurs.
   */
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
  

  /***
   * `getUser` method - Retrieves the signed in user's details.
   * @param {String} emailAddress - The email address a user types into the sign in page.
   * @param {String} password - The password a user types into the sign in page.
   * If the response status is 200, the data is assigned a property of `status` with value 200, and the data is returned as json.
   * If the response status is 401, the data is assigned a property of `status` with value 401, and the data is returned as json.
   * A new error is thrown when an unexpected error occurs.
   */
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
  
  /***
   * `createUser` method - Creates a new user.
   * @param {Ojbect} user - An object containing properties assigned to new user details. 
   * If the response status is 201, an empty array is returned.
   * If the response status is 400 or 405, the response data errors are returned.
   * A new error is thrown when an unexpected error occurs.
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400 || response.status === 405) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
