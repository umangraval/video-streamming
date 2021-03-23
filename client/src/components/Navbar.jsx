import React, { Component } from "react";
import isEmpty from "../utils/isEmpty";
import API from '../API'; 

export default class Navbar extends Component {
  async logout() {
    await API.post(`/auth/logout`).then((res) => {
      if (res.status === 200) {
        this.props.updateUser(undefined);
      }
    }).catch((error) => {
      console.log('Logout error', error);
    });
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-light bg-light one-edge-shadow">
          <div className="container-fluid w-75">
            <div className="navbar-header navbar-brand">
                RSDecor
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {isEmpty(this.props.user) ? (<a className="nav-link" href="/login">
                  Login
                </a>) : (<a className="nav-link" href="/login" onClick={() => {this.logout()}}>
                  Logout
                </a>)}
                
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
