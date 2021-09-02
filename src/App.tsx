import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import dotenv from "dotenv";
import ExchangeCard from "./components/organisms/ExchangeCard";

dotenv.config();

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/exchange-rates">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return <ExchangeCard />;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
