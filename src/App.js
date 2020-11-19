import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
import store from "./store"
import { Provider } from "react-redux"

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
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


  sortProducts = (event) => {
    //imp
    const sort = event.target.value
    console.log(event.target.value)
    this.setState((state)=> ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) => (
        sort === "lowest"? 
        a.price > b.price? 1:-1:
        sort === "highest" ?
        a.price < b.price? 1:-1:
        a.id > b.id? 1:-1
      ))
    }))
  }
  filterProducts = (event) => {
    //imp
    console.log(event.target.value)
    if(event.target.value === "") {
      this.setState({size:event.target.value, product:data.products});
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value)>=0),
      });
    }
  };
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
              <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} filterProducts={this.filterProducts} sortProducts={this.sortProducts}/>
              <Products products={this.state.products} addToCart={this.addToCart}/>
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
