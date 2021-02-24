import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { authService } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51IONJ7LCK8ZAFqBVdRwj4TIy9BA5O1f9Q2pTj34KbDXyHTqyEnFTUNV5YNyx0c0TxYQbT1iHvAiDExH2bsu9XTZl00lBDpeQD5');

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      
      if (user) {
        // the user is logged in
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])
  
  return (
    // BEM
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
              <Header/>
              <Elements stripe={promise}>
                <Payment/>
              </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
