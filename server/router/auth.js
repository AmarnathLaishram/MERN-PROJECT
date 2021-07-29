const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const authenticate = require("../middleware/authenticate");
// we are checking the database to see if the register entity are unique for that we require the database module 
require('../db/conn');
const User = require('../model/userSchema');


router.get('/', (req,res) =>{
    res.send(`Hello world from the server router.js`)
});
// Using Promises 
// router.post('/register', (req,res)=>{
//     // object destructuring 
//     const{name,email,phone,work ,password,cpassword} = req.body;
//     // console.log(name);
//     // console.log(email);
//     // res.json({message: req.body});
//     // here we are validating the info given by the user 
//     if(!name || !email|| !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"plz fill properly"})

//     }
//     // here we are checking it 
//     // findOne is a mongodb method 
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"})
//         } 
//         const user = new User({name,email,phone,work,password,cpassword  })
//         // actually it should be written in this way but according to the new ecma if the key and value are same then we can write only once 
//         // const user = new User({name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword})
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"})    
//         }).catch((err)=> res.status(500).json("Fail to register"));

//     }).catch((err)=>{console.log("error")});
 
//  Using await Async 
router.post('/register', async (req,res)=>{
    // object destructuring 
    const{name,email,phone, work ,password,cpassword} = req.body;
    // console.log(name);
    // console.log(email);
    // res.json({message: req.body});
    // here we are validating the info given by the user 
    if(!name || !email|| !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"please fill properly"})
    }
    try{
        // here we will create a const which will show the result after waiting 
        const userExist = await User.findOne({email:email})
        // if the result is true then  
        if(userExist){
            return res.status(422).json({error:"Email already exist"})
        }else if(password != cpassword){
            return res.status(400).json({error:"Password is not matching"})
        }else{
            const user = new User({name,email,phone,work,password,cpassword  });
            // whenever we are to use "then" we will use await instead 
            // So after collecting all the data into user and before saving it we need to hash the password and cpassword for security purpose

            await user.save();
            res.status(201).json({message:"user registered successfully"}) 

        }
        
    }catch(err){
        console.log("error")};    
     
});
// Login route 
router.post('/signin', async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill the data"});
        }
        // so if email is found inside the user then all the items are added into the userLogin 
        const userLogin = await User.findOne({email:email});
        
        // Here all the item with the given email is displayed in console 
        // console.log(userLogin);
        // if the userLogin has no possible data inside it
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            // the token is to be generated from the data obtain after checking the email  
            const token = await userLogin.generateAuthToken();
            // cookie is a method of res with to parameters and a optional parameter 
            res.cookie("jwtoken",token, {
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true,
            }); 

        if (!isMatch){
            res.status(400).json({error : "Invalid Credentials pass"});
        }else{
            // Here this result is shown in json
            res.json({message:"User SignIn Successfull"});
        }
        }else{
            res.json({error:"Invalid Credentials"});
        }   

    }catch(err){
        console.log(err);

    }
    // console.log(req.body);
    // res.json({message:"awsome"})
});

// about page  
router.get('/about', authenticate,(req,res) =>{
     console.log("Hello My about");
    // res.send("Hello World from about");
    res.send(req.rootUser);

// get userData for contact and user     
router.get('/getdata',authenticate,(req,res)=>{
    console.log("Hello My GetData");
    // getting all the data of rootUser using req.rootUser and sending it back 
    res.send(req.rootUser);
});    
// contact us page 
router.post('/contact',authenticate, async (res,req)=>{
     try{ 
        //  object destructuring taking the name, email,phone,,essage from the req.body sent by the user from contact page
         const {name,email,phone,message} = req.body;
        // checking if data is provided by the user 
         if(!name || !email || !phone || !message){
             console.log("Error in contact form")
             return res.json({error:"Please fill the contact form"})
         }
        //  authentication checking the message provided to the person is present in the database or not 
         const userContact = await User.findOne({_id:req.userID});
        //  and if the ids are equal then  name, email,phone,message from userContact is added 
         if(userContact){
             const userMessage = await userContact.addMessage(name, email, phone, message);
            //  we are the calling the save method of the addMessage here 
             await userContact.save()
             res.status(201).json({message:"user contact successful"})
        }

    }catch(error){
        console.log(error);
    } 
    
})    

});

module.exports = router;
