import React, { Component } from "react";

export default class Navbar extends Component {
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
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
