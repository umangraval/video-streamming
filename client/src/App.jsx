import React, { Component, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Home from "./pages/Home";
import Player from "./pages/mobile/Player";
import Product from "./pages/mobile/Product";
import ProductView from "./pages/ProductView";
import Scanner from "./pages/mobile/Scanner";
import Login from "./pages/Login";
import Medias from "./pages/mobile/Medias";
import Navbar from "./components/Navbar";
import MediaUpload from "./pages/MediaUpload";
import Manage from "./pages/Manage";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      error: undefined
    };
    this.setError = this.setError.bind(this);
    this.clearError = this.clearError.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  setError(error) {
    this.setState({ error });
  }

  clearError() {
    this.setState({ error: null });
  }

  updateUser(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Router>
          <BrowserView>
            <Navbar user={user} updateUser={this.updateUser} />
            <Switch>
              <Route exact path="/">
                {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
              </Route>
              <Route
                exact
                path="/login"
                render={props => (
                  <Login {...props} user={user} updateUser={this.updateUser} />
                )}
              />
              <Route
                exact
                path="/dashboard"
                render={props => (
                  <Home {...props} user={user} updateUser={this.updateUser} />
                )}
              />
              <Route
                exact
                path="/up"
                render={props => (
                  <MediaUpload
                    {...props}
                    user={user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                exact
                path="/manage"
                render={props => (
                  <Manage {...props} user={user} updateUser={this.updateUser} />
                )}
              />
              <Route
                exact
                path="/product/:id"
                render={props => (
                  <ProductView
                    {...props}
                    user={user}
                    updateUser={this.updateUser}
                  />
                )}
              />
            </Switch>
          </BrowserView>
          <MobileView>
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            <Switch>
              {/* <Redirect from="/*" to="/scanner" /> */}
              <Route exact path="/scanner" component={Scanner}></Route>
              <Route exact path="/player/:id" component={Player}></Route>
              <Route exact path="/media/:id" component={Medias}></Route>
              <Route exact path="/product/:id" component={Product}></Route>
            </Switch>
          </MobileView>
        </Router>
      </>
    );
  }
}
