import "../assets/css/App.css";
import HomeContainer from "./HomeContainer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogosContainer from "./LogosContainer";
import CartContainer from "./CartContainer";
import Checkout from "./Checkout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route path="/market">
            <LogosContainer />
          </Route>
          <Route path="/cart">
            <CartContainer />
          </Route>
          <Router path="/checkout">
            <Checkout />
          </Router>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
