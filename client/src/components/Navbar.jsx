import React, { Component } from "react";
import isEmpty from "../utils/isEmpty";
import API from '../API'; 
import Logo from "../assets/img/logo.png";
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
                <img src={Logo} alt="img" width="110" height="80" />
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {isEmpty(this.props.user) ? (<a className="nav-link" href="/login">
                  <h4>Login</h4>
                </a>) : (<a className="nav-link" href="/login" onClick={() => {this.logout()}}>
                  <h4>Logout</h4>
                </a>)}
                
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
