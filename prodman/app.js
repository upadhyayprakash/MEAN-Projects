import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ProductList from "./Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./style.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Product Management</h1>
          <ul className="header">
            <li><NavLink to="/">PRODUCTS</NavLink></li>
          </ul>
          <div className="content">
				<Route exact path="/" component={ProductList}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
