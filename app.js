require('dotenv').config();
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connections');
const ownersRoute = require('./routs/ownerRouter')
const productsRoute = require('./routs/productRouter')
const userRoute = require('./routs/userRouter')


app.use(express.json());
//jab bhi hum postman se ya frontend se data bhejta hai to direct express use padh nhi pata h is liye ye hum middle ware use karte hai middle ware data ko wrap kar ke req.body me dal deta h jisko hum use  kar sakte hai 
app.use(express.urlencoded({ extended: true }));
/**app.use(express.urlencoded({ extended: true }));
Ye tab kaam aata hai jab data HTML form se aata hai (normal <form> submit, JSON nahi). Form data ek alag format me aata hai (name=Ak&age=22 type), isko parse karke bhi req.body me convert karta hai.

extended: true matlab — nested objects/arrays bhi handle ho jayenge form data me. */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use('/owners', ownersRoute)
app.use('/user', userRoute)
app.use('/product', productsRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});