const userSchema = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
    try {
        let { email, fullName, password } = req.body;

        if (!email || !fullName || !password) {
            req.flash("error", "All fields are required");
            return res.redirect("/");
        }

        let user = await userSchema.findOne({ email: email });
        if (user) {
            req.flash("error", "User already registered, please login");
            return res.redirect("/");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await userSchema.create({
            email,
            fullName,
            password: hash
        });

        req.flash("success", "User registered successfully, please login");
        return res.redirect("/");

    } catch (error) {
        console.log("Registration Error:", error.message);
        req.flash("error", error.message);
        return res.redirect("/");
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            req.flash("error", "Please fill all fields");
            return res.redirect("/");
        }

        let user = await userSchema.findOne({ email: email });
        if (!user) {
            req.flash("error", "Email or password incorrect");
            return res.redirect("/");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/shop");
        } else {
            req.flash("error", "Email or password incorrect");
            return res.redirect("/");
        }

    } catch (error) {
        console.log("Login Error:", error.message);
        req.flash("error", error.message);
        return res.redirect("/");
    }
};

const logout = (req, res) => {
    res.cookie("token", "");
    req.flash("success", "Logged out successfully");
    return res.redirect("/");
};

// FIX: Explicitly export as an object
module.exports = {
    registerUser,
    loginUser,
    logout
};