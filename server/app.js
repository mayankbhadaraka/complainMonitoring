const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path:'./config.env'})
require('./db/conn');
// const User = require('./model/userSchema');

app.use(cookieParser());
app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

// app.get('/about',middleware,(req,res)=>{
//     console.log("Hello");
//     res.send("Hello about world from the server");
// });

// app.get('/contact',(req,res)=>{
//     res.send("Hello contact world from the server");
// });

app.get('/signin',(req,res)=>{
    res.send("Hello login world from the server");
});

app.get('/signup',(req,res)=>{
    res.send("Hello registration world from the server");
});

app.listen(PORT, ()=>{
    console.log(`server is running is at port no ${PORT}`);
})

