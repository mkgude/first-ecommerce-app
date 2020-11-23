import React from "react"
import AddProducts from "../components/AddProducts";
import Products from "../components/Products"

function Admin() {
    return (
        <div>
              <div className="content">
                <div className="main">
                    <AddProducts />
                </div>
                <div className="sidebar">
                    <Products />
                </div>
              </div>
        </div>
    )
}
export default Admin
