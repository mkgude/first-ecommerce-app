const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const { Mongoose } = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/first-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err, res) => {
    if (err) throw err;
});

const Product = mongoose.model("products", new mongoose.Schema({
    id: {type: String, defaul: shortid.generate},
    title: String,
    description: String,
    price: Number,
    availableSizes: [String],
    image: String
}))

app.get("/api/products", async (req, res)=> {
const products = await Product.find({});
res.send(products);
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct)
})

app.delete("/api/products/:id", async(req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("serve at http://localhost:3000"))

