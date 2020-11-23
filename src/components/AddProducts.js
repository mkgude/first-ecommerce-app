import React, { Component } from "react";
import axios from "axios";

const initState = {
    image: "",
    title: "",
    description: "",
    price: "",
    availableSizes: [],
}

class AddProducts extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }
    addNewProduct = async (e) => {
        alert("form save button was selected")
        e.preventDefault();
        const {title, price, description, image, availableSizes} = this.state;
        await axios.post("/api/products", {title, price, description, image, availableSizes}).then(function (res) {
            console.log(res.data)
        })

        // this.props( 
        //     {name, price, description, image, availableSizes}, () => this.setState(initState));

        this.setState(
            { flash: { status: 'is-success', msg: 'Product created successfully' }}
        );
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value, error: ""})
    }
    render() {
        const {title, price, description, image, availableSizes} = this.state;
        return (
            <div>
                <h1 className="add-product-header">Add Products form</h1>
                <form className="add-product-form" onSubmit={this.addNewProduct}>
                    <label> Image Link: 
                        <input type="text" name="image" value= {image} onChange={this.handleInput} required/>
                    </label>
                    <label> Title:
                        <input name="title" type="text" value= {title} onChange={this.handleInput} required/>
                    </label>
                    <label> Price:
                        <input name="price" type="number" value= {price} onChange={this.handleInput} required/>
                    </label>
                    <label> Description: 
                        <input name="description" type="text" value= {description} onChange={this.handleInput} required/>
                    </label>
                    <label> Sizes:
                        <select value={availableSizes} name="availableSizes" multiple={true} onChange={this.handleInput} required>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </label>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default AddProducts
