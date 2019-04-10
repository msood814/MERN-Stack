import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import allocateSolar from './components/AllocateSolar'
import getDistributors from './components/GetDistributors'
import Evaluator from './components/evaluator';
import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
      <div>
        { /* DO NOT REMOVE THIS COMPONENT TAG */}
        <Evaluator></Evaluator>

        <nav className="navbar navbar-expand-lg navbar-light  bg-custom">
          <span className="navbar-brand">IBA Retails</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/allocateSolar"> Allocate Solar </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/getDistributors"> View Distributors </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/allocateSolar' component={allocateSolar}></Route>
          <Route path='/getDistributors' component={getDistributors}></Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
