import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import dotenv from "dotenv";
import ExchangeCard from "./components/organisms/ExchangeCard";
import { Layout } from "./components/Layout";

dotenv.config();

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/exchange-rates">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <Layout>
      <ExchangeCard />
    </Layout>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return (
    <Layout>
      <ExchangeCard />
    </Layout>
  );
}
