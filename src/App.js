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
