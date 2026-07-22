const userSchema = require("../models/user-model")
const bcrypt = require("bcrypt")
const {gnerateToken, generateToken} = require("../utils/generateToken.js")

module.exports.registerUser = async (req, res) => {
     try {
       let {email, fullName, password} =  req.body
       let user = await userSchema.findOne({email: email});
       if(user) return res.send("User alredy registered || plz logIn")
       bcrypt.genSalt(10,  (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send(err.message)
                else{
            let user = await userSchema.create({
                 email,
                 fullName, 
                 password: hash
                })
                let token = generateToken(user);
                res.cookie("token", token)
                res.send(user)
            }
            })
        })
     
 } catch (error) {
    res.send(error.message )
 }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body
    let user = await userSchema.findOne({email: email});
    if(!user) return res.send("email or pasword incorrect ")
        bcrypt.compare(password, user.password, (err, result) => {
         if(result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.send("You are loggedin") 
         } else {
            return res.send("email or pasword incorrect ")
         }
        })
}

module.exports.logout = (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}