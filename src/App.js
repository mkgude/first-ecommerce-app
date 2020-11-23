import React from "react";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { BrowserRouter, Route, Link } from "react-router-dom";
import store from "./store"
import { Provider } from "react-redux"


class App extends React.Component { 
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">Shopping</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={Admin} />
            </main>
            <footer>
              All rights reserved
            </footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  } 
}

export default App;
