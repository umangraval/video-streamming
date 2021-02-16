import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import Qrcode from './Qrcode';
import Upload from './Upload';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/qrcode" component={Qrcode}></Route>
        <Route path="/upload" component={Upload}></Route>
        <Route path="/player/:id" component={Player}></Route>
      </Switch>
    </Router>
  );
}

export default App;