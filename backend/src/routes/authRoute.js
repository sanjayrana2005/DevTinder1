const express = require("express");
const { validateSignupData, validateLoginData } = require("../utils/validation");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // validation of data
        validateSignupData(req);

        
        const user = await userModel.findOne({ email })
        if (user) {
            throw new Error("user already exist")
        }
        
        const hasPAssword = await bcrypt.hash(password, 10);
        
        newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hasPAssword
        });

        await newUser.save();

        res.send("User created sucessfully!!!");

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        validateLoginData(req)

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("Enter a valid email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }


        // create a JWT Token
        const token = jwt.sign({ userId: user._id }, "JWT_PASS@123",{ expiresIn:  "7d"});
        
        // Add token to cookie and send back to user
        res.cookie("token", token,{ expires: new Date(Date.now() + 7 * 24 *60 * 60 *1000), httpOnly: true });
        res.send("Login successfully");

    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
}); 

authRouter.post("/logout",(req,res)=>{
    const {token} = req.cookies;
    res.cookie("token", null ,{ expires:new Date(Date.now())});
    res.send("logout successfully");
});

module.exports = authRouter;