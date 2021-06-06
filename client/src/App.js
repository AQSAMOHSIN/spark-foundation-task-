import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./customers";
import Customer from "./customer";
import Transaction from "./transaction";

import Error from "./Error";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Hero />
        </Route>
        <Route path="/customers">
          <Customers />
        </Route>
        <Route path="/trasactions">
          <Transaction />
        </Route>

        <Route path="/customer/:name" children={<Customer />}></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
