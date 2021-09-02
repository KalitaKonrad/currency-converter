import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import dotenv from "dotenv";
import { Converter } from "./views/Converter/Converter";
import { ExchangeRates } from "./views/ExchangeRates/ExchangeRates";

dotenv.config();

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Converter />
          </Route>
          <Route exact path="/exchange-rates">
            <ExchangeRates />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
