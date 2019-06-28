import React from "react";
import "./App.css";
import GlobalStyles from "./global-styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ShopPage from "./containers/ShopPage";
import ProductPage from "./containers/ProductPage";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const App: React.FC = () => {
  //Apollo GraphQL Client
  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/shop/:name" component={ProductPage} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
