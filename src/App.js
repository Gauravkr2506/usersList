import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./Containers/home";
import Users from "./Containers/users";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/usersList" render={(props) => <Users {...props} />} />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </Router>
  );
}
