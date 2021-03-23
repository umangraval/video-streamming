import React, { Component, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
// import { BrowserHistory } from 'react-router'
import Home from "./pages/Home";
import Player from "./pages/mobile/Player";
import Upload from "./pages/Upload";
import Product from "./pages/mobile/Product";
import ProductView from "./pages/ProductView";
import NewProduct from "./pages/NewProduct";
import NewCategory from "./pages/NewCategory";
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

  // document.addEventListener('contextmenu', (event) => {
  //   event.preventDefault();
  // })

  render() {
    const { user } = this.state;
    return (
      <>
          <Router>
          <BrowserView>
          <Navbar 
            user={user}
            updateUser={this.updateUser}
          />
          <Switch>
          <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              {...props}
              user={user}
              updateUser={this.updateUser}
            />
          )}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => (
            <Home
              {...props}
              user={user}
              updateUser={this.updateUser}
            />
          )}
        />

        {/* <Route path="/dashboard" component={Home}></Route> */}
        <Route path="/manage" component={Manage}></Route>
        <Route path="/up" component={MediaUpload}></Route>
        
          
        <Route
          exact
          path="/upload"
          render={(props) => (
            <Upload
              {...props}
              user={user}
              updateUser={this.updateUser}
              setError={this.setError}
            />
          )}
        />
              <Route path="/newproduct" component={NewProduct}></Route>
              <Route path="/newcategory" component={NewCategory}></Route>
              <Route path="/player/:id" component={Player}></Route>
              <Route path="/product/:id" component={ProductView}></Route>
              </Switch>
          </BrowserView>
          <MobileView>
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            <Switch>
              {/* <Route exact path="/" component={Home}></Route> */}
              <Route path="/scanner" component={Scanner}></Route>
              <Route path="/player/:id" component={Player}></Route>
              <Route path="/media/:id" component={Medias}></Route>
              <Route path="/product/:id" component={Product}></Route>
            </Switch>
          </MobileView>
          </Router>
      </>
    );
  }
}
