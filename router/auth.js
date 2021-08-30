// const { Router } = require('express');
const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();

require('../db/conn');
// const user = require('../model/userSchema')

router.get('/cookie', (req,res) => {
    res.cookie('cookie_added','this is demo cookie',{
        expires: new Date(Date.now() + 5000),
        httpOnly:true
    })
res.send('This is home from router'+new Date(Date.now() + 50000))
});


/// part 1 Where async await method is used

///register
router.post('/register', async (req,res) => {

    const { name, email,phone,work,password,cpassword} = req.body;
if(!name ||  !email || !phone || !work || !password || !cpassword){
    return res.status(422).json({error:"Plz fill the field properly"})
}
try{

///check already exist or not
 const userExist = await User.findOne({email:email})///first email comes from db column and second 
 
    if(userExist){
        return res.status(422).json({error:"Email Already Exist"});
    }


    //  const user =  new User({name:name, email:email,phone:phone,work:work,password:password,cpassword:cpassword})
    // if key and value is same then you don't have to write like above
    const user = new User({name, email,phone,work,password,cpassword});

///use pre method as a middleware is used in userSchema page to hashing a password before save
   

const userRegister = await user.save(); //save data in database collection

   res.status(200).json({message : "Data Inserted Successfully"});

}
catch(error){
console.log(error);
}

//     console.log(name);
//     console.log(email);
// //   res.send("This is run");
//       res.json({phone})
})


///login route
router.post('/signin',async(req,res) => {
//     console.log(req.body);
// res.json({message:"THis is signup"});
let token;
try{
const {email,password} = req.body;
if(!email || !password){

    return res.status(400).json({error:"please fill data"})
}

const userLogin = await User.findOne({email:email});
// console.log(userLogin);



if(!userLogin){
    res.status(400).json({message:"No user"})
}
else{

    const isMatch = await bcrypt.compare(password,userLogin.password);

     token = await userLogin.generateAuthToken();
    console.log(token);

    res.cookie('jwtoken',token,{
        expires: new Date(Date.now() + 25892000000), //expire after 30days
        httpOnly:true
    })
    
    if(!isMatch){
        res.status(400).json({error:"wrong credentials"});
    }
    else{
        res.json({ message:"Login Succesfully"});
    }
}


}
catch(err){
console.log(err);
}
});
module.exports = router;




// // part 2 where promise method used
// router.post('/register', (req,res) => {

//     const { name, email,phone,work,password,cpassword} = req.body;
// if(!name ||  !email || !phone || !work || !password || !cpassword){
//     return res.status(422).json({error:"Plz fill the field properly"})
// }

// ///check already exist or not
// User.findOne({email:email})///first email comes from db column and second 
// .then( (userExist) => {
//     if(userExist){
//         return res.status(422).json({error:"Email Already Exist"});
//     }
// //  const user =  new User({name:name, email:email,phone:phone,work:work,password:password,cpassword:cpassword})
// // if key and value is same then you don't have to write like above
//     const user = new User({name, email,phone,work,password,cpassword});

//     user.save() //save data in database collection
//     .then( () => {
//         res.status(200).json({message : "Data Inserted Successfully"});
//     })
//    .catch( (err) => res.status(500).json({ error:"Failed Registration"}));

    
// } )
// .catch((err) => { console.log(err)

// })
// //     console.log(name);
// //     console.log(email);
// // //   res.send("This is run");
// //       res.json({phone})
// })
// module.exports = router;