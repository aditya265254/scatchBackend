const express = require('express');
const upload = require('../config/multer-config');
const router = express.Router();
const productModel = require("../models/product-model.js")




router.post('/create', upload.single("image"),async (req, res) => {
  try {
      let { name, price, disscount, bgColor, panelColor, textColor} = req.body
      const product = await productModel.create({
          image: req.file.buffer,
          name, 
          price, 
          disscount,
          bgColor,
          panelColor,
          textColor
      })
      req.flash("success", "Product created Sucessfully")
      res.redirect('/owner/admin')
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router