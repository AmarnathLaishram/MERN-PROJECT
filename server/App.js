const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Connecting our data with the mongodb 
// create a variable and paste the file you get while connecting it contains  account name and password 
// const DB = 'mongodb+srv://Amarnath:Thoi2000@cluster0.mfjqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// to secure our password we need another dependency called dotenv
// setting the path to the config.env 
dotenv.config({path:'./config.env'});
require('./db/conn');
// const User = require('./model/userSchema'); 

// since we are the calling the same home page and js works in top to bottom manner those which are callng first will be  
// we have to convert the express file into json before going to postman app 
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;
// we link our router file to make our route easy 
// Middleware => during going to  another component certain function are performed 
// If u dont put next it will keep on loading and it will not show the component 

//  const middleware = (req,res,next) =>{
//      console.log("Hello My Middleware");
//     next();
// }

// app.get('/', (req,res) =>{
//     res.send("Hello World from the server.js")

// })

// app.get('/About',middleware, (req,res) =>{
//     console.log("Hello My about");
//     res.send("Hello World from about");

//  })
// app.get('/Contact', (req,res) =>{
//     res.send("Hello World from contact")

// })
app.get('/signin', (req,res) =>{
    res.send("Hello Login World from the server")

})
app.get('/signup', (req,res) =>{
    res.send("Hello Registration World from the server")

})

app.listen(PORT,()=>{
    console.log(`The app is running at port ${PORT}`)
})
