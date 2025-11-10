const express = require("express");
const { authUser } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequestModel");
const { validateConnectionRequest, validateConnectionReviewRequest } = require("../utils/validation");
const userModel = require("../models/userModel");
const requestRouter = express.Router();
const mongoose = require("mongoose");



//sender side of connection request
requestRouter.post("/request/send/:status/:toUserId", authUser, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        validateConnectionRequest(req);

        const toUserExist = await userModel.findOne({ _id: toUserId });
        if (!toUserExist) {
            throw new Error("user does not exist")
        }


        //a user can't send request to itself below but another way to do in schema

        // if(fromUserId.equals(toUserId)){
        //     throw new Error("you can send request to your self")
        // }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            throw new Error("request already exist")
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const connectionRequestData = await connectionRequest.save();

        res.send(`you ${status === "ignored" ? " ignored " : " sent a connection request to "}  ` + toUserExist.firstName);
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});


//review connection request / accepting connection request
requestRouter.post("/request/review/:status/:requestId",authUser,async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {requestId,status} = req.params;

        validateConnectionReviewRequest(req);
        if(!mongoose.Types.ObjectId.isValid(requestId)){
            throw new Error("Invalid requestId");
        }

        //searching / finding request
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });

        if(!connectionRequest){
            throw new Error("connection request not found");
        }

         connectionRequest.status = status;
         await connectionRequest.save();

         res.send("connection request "+status);

    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
})

module.exports = requestRouter;