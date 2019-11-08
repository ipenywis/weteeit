import React, { useState } from "react";
import "./App.css";
import GlobalStyles from "./global-styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ShopPage from "./containers/ShopPage";
import ProductPage from "./containers/ProductPage";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { AppContext } from "./app.context";
import { ICartItem } from "./typings/cart";
import CartPage from "./containers/cartPage";
import OrderPage from "./containers/orderPage";
import { PrivateRoute } from "./components/privateRoute";
import AboutPage from "./containers/aboutPage";

const App: React.FC = () => {
  //Apollo GraphQL Client
  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql"
  });

  const [cart, setCart] = useState<ICartItem[]>([]);
  const [canOrder, setCanOrder] = useState(false);
  const [instructions, setInstructions] = useState<string | null>(null);

  const setCartWithConstraints = (
    callback: (prevValue: ICartItem[]) => ICartItem[]
  ) => {
    setCart(cartItems => {
      const newCartItems = callback(cartItems);
      //Make sure item doesnt already exists
      const filteredCartItems = newCartItems.reduce((prevCartItems, item) => {
        if (cartItems.find(oldItem => oldItem.name === item.name))
          return prevCartItems;
        else return [...prevCartItems, item];
      }, cartItems);
      return filteredCartItems;
    });
  };

  const setCartItem = (callback: (prevValue: ICartItem[]) => ICartItem[]) => {
    setCart(cartItems => {
      const newCartItems = callback(cartItems);
      return [...newCartItems];
    });
  };

  const updateCartItem = (key: string, newItem: ICartItem) => {
    setCart(cartItems => {
      const updatedCartItems = cartItems.map(item => {
        if (item.keyCode === key) return newItem;
        return item;
      });
      return updatedCartItems;
    });
  };

  const removeCartItem = (key: string) => {
    setCart(cartItems => {
      const filteredCartItems = cartItems.filter(item => {
        return item.keyCode !== key;
      });
      return filteredCartItems;
    });
  };

  const AppContextValue = {
    cart,
    setCart: setCartItem,
    updateCartItem,
    removeCartItem,
    setCanOrder,
    setInstructions,
    instructions,
    canOrder
  };

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={AppContextValue}>
        <div className="App">
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/shop" component={ShopPage} />
              <Route exact path="/shop/:name" component={ProductPage} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/about" component={AboutPage} />
              <PrivateRoute
                exact
                allowAccess={canOrder}
                redirectTo="/shop"
                path="/order"
                component={OrderPage}
              />
            </Switch>
          </Router>
        </div>
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default App;
