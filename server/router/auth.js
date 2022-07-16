const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer=require('nodemailer');
const jwt = require('jsonwebtoken');
const authenticate=require("../middleware/authenticate");
require('../db/conn');
const User = require('../model/userSchema');
const Otp = require('../model/otp');
const AllComplain = require('../model/AllCompains');
const ComplainSolved = require('../model/SolvedComplain');
const Complain = require('../model/complainSchema');
const Manager = require('../model/managerSchema');
const HardwareVendors = require('../model/HardwareVendor');
const Solved = require('../model/SolvedComplain');
router.get('/',(req,res)=>{
    res.send("Hello world from the server auth.js");
});
// Async-Await
router.post('/register', async (req,res)=> {
    const {name,email,phone,work,password,cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Pz filled the field properly"});
    }
    try{
     const userExist = await User.findOne({email:email});
     if(userExist){
        return res.status(422).json({error:"Email already Exist"});
    }else if(password != cpassword){
        return res.status(422).json({error:"Passworsd are not matching"});
    }
    else{
        const user = new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"user registered successfully"});
    }
    const user = new User({name,email,phone,work,password,cpassword});
    await user.save();
    res.status(201).json({message:"user registered successfully"});
    console.log(user);
    } catch(err){
        console.log(err);
    }
});
// login route
router.post('/signin',async (req,res)=>{
    // console.log(req.body);
    // res.json({message: "awesome"});
    try{
        const {email,password} = req.body;
        let token;

        if(!email || !password){
            return res.status(400).json({error:"Pz filled the field properly"});
        }
        const userLogin = await User.findOne({ email:email });
        // console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if(!isMatch){
                res.status(400).json({error: "Invalid Credientials"});
            }
            else{
                res.json({message: "user signin successfully"});
            }
        }
       else{
            res.status(400).json({error: "Invalid Credientials"});
       }
    }
    catch(err){
        console.log(err);
    }
});
// complain
router.post('/complain',authenticate,async(req,res)=>{
    try{
        var Status="Panding"
           const{name,email,phone,device,message,provider,ReferanceNumber}= req.body;
           if(!name||!email||!phone||!device||!message||!provider||!ReferanceNumber){
            console.log("error in contact form");
            return res.json({error:"Plz fill form properly"});
        }
        const complain = new Complain({name,email,phone,device,message,provider,ReferanceNumber});
        await complain.save();
        const all=new AllComplain({name,email,phone,device,message,Status,ReferanceNumber});
        await all.save();
        res.status(201).json({message:"Complain Sent successfully"});
           }
    catch(err){
        console.log(err);
    }
}
);
router.get('/getcomplain',authenticate,(req,res)=>{
    let x= req.rootUser
            Complain.find({provider:x.name}).then((result)=>{
            res.send(result);
        }).catch((err)=>{
            console.log(err);
        });
});
router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});
router.post('/forwardtomanager',authenticate,async(req,res)=>{
    try{
       
           const{name,email,phone,device,message,serviceManager,ReferanceNumber}= req.body;
           if(!name||!email||!phone||!device||!message||!serviceManager||!ReferanceNumber){
            console.log("error in form");
            return res.json({error:"Plz fill form properly"});
        }
        const complain = new Manager({name,email,phone,device,message,serviceManager,ReferanceNumber});
        await complain.save();
        update=await AllComplain.updateOne({ReferanceNumber},{
            $set:{
                Status:"Forward to Manager"
            }
        });
        await Complain.deleteOne({ReferanceNumber});
        res.status(201).json({message:"forward to manager"});
           }
    catch(err){
        console.log(err);
    }
}
);
router.get('/getmanager',authenticate,(req,res)=>{
    Manager.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/forwardtoHardware',authenticate,async(req,res)=>{
    try{
           const{name,email,phone,device,message,HardwareVendor,ReferanceNumber}= req.body;
           if(!name||!email||!phone||!device||!message||!HardwareVendor||!ReferanceNumber){
            console.log("error in contact form");
            return res.json({error:"Plz fill form properly"});
        }
        const Vendor = new HardwareVendors({name,email,phone,device,message,HardwareVendor,ReferanceNumber});
        await Vendor.save();
        update=await AllComplain.updateOne({ReferanceNumber},{
            $set:{
                Status:"Forward to HardwareVendor"
            }
        });
        await Manager.deleteOne({ReferanceNumber});
        res.status(201).json({message:"Complain Sent successfully"});
           }
    catch(err){
        console.log(err);
    }
});
router.get('/getVendor',authenticate,(req,res)=>{
    HardwareVendors.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/status',authenticate,(req,res)=>{
let x= req.rootUser
    AllComplain.find({name:x.name}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/SolveComplain',authenticate,async(req,res)=>{
    try{
           const{name,email,phone,device,message,responce,ReferanceNumber}= req.body;
           if(!name||!email||!phone||!device||!message||!responce||!ReferanceNumber){
            console.log("error in contact form");
            return res.json({error:"Plz fill form properly"});
        }
        const SolvedComplain = new ComplainSolved({name,email,phone,device,message,responce,ReferanceNumber});
        await SolvedComplain.save();
        update=await AllComplain.updateOne({ReferanceNumber},{
            $set:{
                Status:"Solved"
            }
        });
        await HardwareVendors.deleteOne({ReferanceNumber});
        res.status(201).json({message:"Complain Sent successfully"});
           }
    catch(err){
        console.log(err);
    }
});
router.get('/solved',authenticate,(req,res)=>{
    let x= req.rootUser
    Solved.find({name:x.name}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});


///forget password

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'emailsender881@gmail.com',
        pass: 'vjzriivrouldvxkr'
    }
});

let Email;

router.post('/reset1',async (req,res)=>{
// console.log(req.body);
    // res.json({message: "awesome"});
    try{
        const {email} = req.body;
        Email = email;
        if(!email){
            return res.status(400).json({error:"Plz filled the field properly"});
        }
        const userLogin = await User.findOne({ email:email });
// console.log(userLogin);
        if(!userLogin){
            res.status(400).json({error: "Invalid Email"});
            }
        else{
                let optcode = Math.floor((Math.random()*10000)+1);
                let otpData = new Otp({
                    email:email,
                    code:optcode,
                    expireIn: new Date().getTime() + 300*1000
                })
                let otpResponse = await otpData.save();
                const mailOptions = {
                    from: 'emailsender881@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text: 'Your OTP is '+ optcode
                };

                transporter.sendMail(mailOptions, function(error,info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: '+info.response)
                        res.json({message: "Email verified and OTP has been sent"});
                    }
                })
            }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/OtpVerify',async (req,res)=>{
 
    try{
        const {code} = req.body;
        const email = Email;
        let data = await Otp.find({email:email,code:code});
        if(data){
            let currentTime = new Date().getTime();
            let diff = data.expireIn - currentTime;
            if(diff<0){
                res.json({message: "OTP verified"});
            }
            else{
                res.status(400).json({error: "Invalid OTP"});
            }
        }
        else{
            res.status(400).json({error: "Invalid OTP"});
        }
   

    }
    catch(err){
        console.log(err);
    }
});

router.post('/ResetPass',async (req,res)=>{
 
    try{
        const {password} = req.body;
        const email = Email;
        let newPassword = password;
        newPassword = await bcrypt.hash(newPassword,12);
        const result = await User.updateOne({email:email},{
            $set: {
                password: newPassword
            }
       
        });
        res.status(201).json({message:"Reset password successfully"});

    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;

