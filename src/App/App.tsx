import React from "react";
import "./App.css";
import GlobalStyles from "./global-styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ProductsPage from "./containers/ShopPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ProductsPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
