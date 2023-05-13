const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const JWT_TOKEN = "thisisprivatekey"

router.post("/createuser",[
    body("email").isEmail(),
    body("name").isLength({min:6}),
    body("password","should be in 6 char").isLength({min: 6})
],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    const secure_password = await bcrypt.hash(req.body.password,salt);

        
    try {
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password: secure_password,
            location:req.body.location
        }).then(res.json({success:true}));
    } catch (error) {
        console.log(error);
        res.json({success: false});



        
    }
    
})
router.post("/login",async(req,res) => {
     
    let email = req.body.email
        
    try {
        let userData = await User.findOne({email});
        if (!userData) {
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }

        const comaprePwd = bcrypt.compare(req.body.password,userData.password);
        if(!comaprePwd) {
            return res.status(400).json({errors:"Try logging with correct credentials"})

        }

        const data ={
            user: {
                id:userData.id,

            }
        }
        const authToken = jwt.sign(data,JWT_TOKEN)
        res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success: false});



        
    }
    
})



module.exports = router;