import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from "./store"
import { Provider } from "react-redux"

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }
  createOrder = (order) => {
    alert("need to save order for" + order.name)
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x=>x.id !== product.id)
    });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  }


  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item.id === product.id){
        item.count++;
        alreadyInCart = true;
      } 
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }


  
  
  render() {
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>
          All rights reserved
        </footer>
      </div>
      </Provider>
    );
  } 
}

export default App;
