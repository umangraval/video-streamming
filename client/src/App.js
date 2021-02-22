import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
// import { BrowserHistory } from 'react-router'
import Home from './Home';
import Player from './Player';
import Qrcode from './Qrcode';
import Upload from './Upload';
import Product from './Product';
import NewProduct from './NewProduct';
import './App.css';

function App() {
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/qrcode" component={Qrcode}></Route>
        <Route path="/upload" component={Upload}></Route>
        <Route path="/newproduct" component={NewProduct}></Route>
        <Route path="/player/:id" component={Player}></Route>
        <Route path="/product/:id" component={Product}></Route>
      </Switch>
    </Router>
  );
}

export default App;