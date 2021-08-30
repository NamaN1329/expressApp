const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: './config.env' })
require('../db/conn');


app.use(express.json());
const User = require('../model/userSchema');

//we link router files to make our router easy
app.use(require('../router/auth'))

const PORT = process.env.PORT;



//middleware
const middleware = (req,res,next) => {
  res.cookie('jwtoken','this is cookie data',{
    expires: new Date(Date.now() + 25892000000), //expire after 30days
    httpOnly:true
  })
console.log("Hello its middle ware");
next()
};



app.get('/', middleware, (req,res) => {
  res.send('Hello This is main page');
})

app.get('/about',middleware, (req,res) => {
  res.send('Thios is about page');
  console.log('this is about')
})

app.get('/contact', (req,res) => {
  res.send("This is contact us page")
})

app.listen(PORT, () => {
console.log(`Server is running on port no ${PORT}`);
});
