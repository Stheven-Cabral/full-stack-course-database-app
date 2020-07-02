import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    // The `authenticatedUser` state property is assigned null or to the cookie named authenticatedUser.
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser }= this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return(
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  /***
   * `signIn` method - takes the parameter emailAddress and password.
   * `getUser` function from state is called on the emailAddress and password parameters.
   * If `getUser` returns a response status of 200, the `user` from response is assigned to the authenticatedUser state property and the authenticatedUser cookie.
   * `signIn` returns the `user` from response.
   */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user.status === 200) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  /***
   * `signOut` method - sets the `authenticatedUser` state proeprty to null.
   * The `authenticatedUser` cookie is removed.
   */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}