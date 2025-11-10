const express = require("express");
const { authUser } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequestModel");
const userModel = require("../models/userModel");
const userRouter = express.Router();

// pending connection requests
userRouter.get("/user/requests/received", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age about gender");

        res.status(200).json({
            message: "connection requests",
            data: connectionRequests.map(field => field.fromUserId)
        });

    } catch (error) {
        res.status(400).json({
            message: `ERROR ${error.message}`
        });

    }
});

userRouter.get("/user/connections", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate(
            "fromUserId",
            "firstName lastName photoUrl age about gender"
        )
            .populate(
                "toUserId",
                "firstName lastName photoUrl age about gender"
            );



        res.json({
            data: connections.map((field) => {
                if (field.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return field.toUserId;
                }
                return field.fromUserId
            })  //mapping on fields for requiredfields
        });
    } catch (error) {
        res.status(400).json({
            message: `ERROR ${error.message}`
        });
    }
});

userRouter.get("/feed", authUser, async (req, res) => {
    try {
        //user should see all other cards except
        //0. his own card 1.his connection, 2. already sent connection request, 3. ignored request

        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit > 50 ? 50 : limit;
        //find all connection requests (sent+recieved)

        const connections = await ConnectionRequestModel.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId");

        const hiddenUserFromFeed = new Set();    // unique collections stores
        connections.forEach(req => {
            hiddenUserFromFeed.add(req.fromUserId.toString());
            hiddenUserFromFeed.add(req.toUserId.toString());
        });

        const users = await userModel.find({
            $and: [
                { _id: { $nin: Array.from(hiddenUserFromFeed) } },
                { _id: { $ne: loggedInUser } }
            ]
        }).select("firstName lastName photoUrl age gender about").skip((page-1)*limit).limit(limit);

        res.json({
            data:users
        })
    } catch (error) {
        res.status(400).json({
            message: `ERROR ${error.message}`
        });
    }
})

module.exports = userRouter;