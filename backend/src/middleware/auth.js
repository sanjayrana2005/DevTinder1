const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const authUser = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("please login");
        }

        const decode = jwt.verify(token,"JWT_PASS@123");
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
        res.status(400).send("ERROR : "+error.message)
    }
}

module.exports = {authUser}