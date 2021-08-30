const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(() => {
    console.log("connection succesful");
  }).catch((err) =>{
    console.log("connection failed ");
    console.log(err);
  });