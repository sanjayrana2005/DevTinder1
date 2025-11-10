const express = require("express");
const { authUser } = require("../middleware/auth");
const userModel = require("../models/userModel");
const { validateProfileEdit, validateChangePassword } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view",authUser, async (req, res) => {

    try {
        const {_id} = req.user;

        const user = await userModel.findOne(_id);
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
});

profileRouter.patch("/profile/edit",authUser, async (req, res) => {
    const data = req.body;
    const user = req.user;

    try {
        validateProfileEdit(req);
        
        //saving // editing user details
        Object.keys(data).forEach(key=>(user[key] = data[key]));

        await user.save();

        res.send(`${user.firstName}, your profile updated successfully!`);

    } catch (error) {
        res.status(400).send("Error updating user: " + error);
    }
});

profileRouter.patch("/profile/changepaddword",authUser,async (req,res) => {
    const {password} = req.body;
    const user = req.user;
    try {
        validateChangePassword(req);

        const hashNewPassword = await bcrypt.hash(password,10);
        user.password = hashNewPassword;
        await user.save();

        res.send("password changed successfuly");
        
    } catch (error) {
        res.status(400).send("ERROR : " +error.message)
    }
});

module.exports = profileRouter;