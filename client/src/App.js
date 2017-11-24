import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Experiences from "./pages/Experience";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Experiences} />
        <Route exact path="/search" component={Experiences} />
      </Switch>
    </div>
  </Router>;

export default App;
