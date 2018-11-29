import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

const App = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/events/:event" component={Home} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
