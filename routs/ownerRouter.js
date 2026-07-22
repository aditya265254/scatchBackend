const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owner-model')
const bcrypt = require('bcrypt')

// if(process.env.NODE_ENV  === "devlopment") {
    router.post('/create', async(req, res) => {
        let owner = await ownerModel.find()
        if (owner.length > 0) {
            return res.status(400).send("you dont have permisson to create a new owner")
        }
        let {fullName, email, password} = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                    else {
                 let createdOwner = await ownerModel.create({
            fullName,
            email,
            password: hash
        })
        res.status(200).send(createdOwner)
                }
            })
        })
       
    })
// }

router.get('/admin', (req, res) => {
    let success = req.flash("success")
    res.render('createproducts', {success});
})


module.exports = router