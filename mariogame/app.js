import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Game from "./Game.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./style.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Mario - ReactJS</h1>
          <div className="content">
				<Route exact path="/" component={Game}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
