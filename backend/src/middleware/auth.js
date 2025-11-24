const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const authUser = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({message:"please login"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            throw new Error("Invalid token");
        }
        const {userId} = decode;
        const user = await userModel.findOne({_id:userId});
        if(!user){
            throw new Error("user does not exist")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {authUser}