import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
//     const url = config.apiBaseUrl + path;
  
//     const options = {
//       method,
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
    // };

//     if (body !== null) {
//       // he JSON. stringify() method converts a JavaScript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
//       options.body = JSON.stringify(body);
//     }

//     // User Authorization
//     if (requiresAuth) {    
//       // The btoa() method creates a base-64 encoded ASCII string from a "string" of data. We'll use btoa() to encode the username and password credentials passed to the api() method. The credentials will be passed as an object containing username and password properties.
//       const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
//       options.headers['Authorization'] = `Basic ${encodedCredentials}`;
//     }  

//     return fetch(url, options);
  }

//   async getUser(username, password) {
//     const response = await this.api(`/users`, 'GET', null, true, {username, password});
//     if (response.status === 200) {
//       // THe following data => data returns the json converted data.
//       return response.json().then(data => data);
//     }
//     else if (response.status === 401) {
//       return null;
//     }
//     else {
//       throw new Error();
//     }
//   }
  
//   async createUser(user) {
//     const response = await this.api('/users', 'POST', user);
//     if (response.status === 201) {
//       return [];
//     }
//     else if (response.status === 400) {
//       return response.json().then(data => {
//         return data.errors;
//       });
//     }
//     else {
//       throw new Error();
//     }
//   }
}
