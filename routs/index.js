const express = require("express")
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const router = express.Router()

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success"); 
    res.render("index", { error, success });
});

router.get("/shop", isLoggedin, async (req, res ) => {
    let products = await productModel.find()
    res.render("shop", {products})
})


module.exports = router;